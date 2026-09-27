/** Browser-only guided scrolling. AUTO arms idle playback; Off stops all motion. */
export type ScrollSpeed = 0 | 0.5 | 1 | 2;
export type ScrollPhase = 'waiting' | 'running' | 'repeat-wait' | 'paused' | 'off';
export interface ScrollState {
  speed: ScrollSpeed;
  idleEnabled: boolean;
  repeatEnabled: boolean;
  repeatRemaining: number;
  phase: ScrollPhase;
  notice: string;
}
export const IDLE_DELAY_MS = 30_000;
export const REPEAT_DELAY_MS = 5_000;
export const IDLE_SPEED: ScrollSpeed = 0.5;
export const INITIAL_SCROLL_STATE: ScrollState = {
  speed: 0, idleEnabled: true, repeatEnabled: true, repeatRemaining: 0, phase: 'waiting',
  notice: '30초간 조작이 없으면 0.5배속으로 스크롤합니다. 반복은 기본 켜짐입니다. Off를 누르면 모든 자동 이동이 멈춥니다.',
};
export interface GuidedScrollController {
  selectSpeed: (speed: ScrollSpeed) => void;
  setRepeatEnabled: (enabled: boolean) => void;
  pause: () => void;
  setMenuOpen: (open: boolean) => void;
  destroy: () => void;
}

export function createGuidedScroll(onChange: (state: ScrollState) => void): GuidedScrollController {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let state = INITIAL_SCROLL_STATE;
  let speed: ScrollSpeed = 0;
  let idleEnabled = true;
  let repeatEnabled = true;
  let repeatRemaining = 0;
  let repeatPending = false;
  let repeatDeadline = 0;
  let focused = document.hasFocus();
  let menuOpen = false;
  let held = false;
  let destroyed = false;
  let timer = 0;
  let repeatTimer = 0;
  let frame = 0;
  let previousTime: number | null = null;
  let position = window.scrollY;
  let expectedScroll: number | null = null;
  let lastActivity = performance.now();
  const cleanup: (() => void)[] = [];
  const controls = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('[data-auto-controls]'));
  const editable = () => document.activeElement instanceof Element && !controls(document.activeElement)
    && Boolean(document.activeElement.closest('form, input, textarea, select, [contenteditable]:not([contenteditable="false"])'));
  function limit() {
    const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const contact = document.getElementById('contact');
    const boundary = contact ? Math.max(0, contact.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2) : bottom;
    return { top: Math.min(boundary, bottom), contact: Boolean(contact) && boundary <= bottom };
  }
  function endNotice() {
    return limit().contact ? '문의 내용을 편하게 작성하도록 자동 스크롤을 멈췄습니다.' : '다한의 이야기를 모두 살펴보셨습니다.';
  }
  function blocker(automatic: boolean, allowBoundary = false): string | null {
    if (document.hidden || !focused) return '화면을 벗어나 자동 스크롤을 멈췄습니다.';
    if (menuOpen || held) return '메뉴 또는 화면을 조작하는 동안 자동 스크롤을 멈췄습니다.';
    if (editable()) return '입력하는 동안 자동 스크롤을 멈췄습니다.';
    if (!allowBoundary && window.scrollY >= limit().top - 1) return endNotice();
    if (automatic && motion.matches) return '동작 줄이기 설정에서는 자동 시작과 반복 재생을 사용하지 않습니다.';
    return null;
  }
  function publish(phase: ScrollPhase, notice: string) {
    if (destroyed) return;
    if (state.speed === speed && state.idleEnabled === idleEnabled && state.repeatEnabled === repeatEnabled
      && state.repeatRemaining === repeatRemaining && state.phase === phase && state.notice === notice) return;
    state = { speed, idleEnabled, repeatEnabled, repeatRemaining, phase, notice };
    onChange(state);
  }
  function clearTimer() { window.clearTimeout(timer); timer = 0; }
  function cancelRepeat() {
    window.clearTimeout(repeatTimer); repeatTimer = 0; repeatPending = false; repeatRemaining = 0;
  }
  function stopFrames() { cancelAnimationFrame(frame); frame = 0; speed = 0; previousTime = null; }
  function writePosition(top: number) {
    // The final frame can dispatch scroll after speed becomes zero. Consume that
    // event once so it cannot cancel the repeat timer as if it were user input.
    if (Math.abs(window.scrollY - top) > 0.1) expectedScroll = top;
    window.scrollTo({ top, behavior: 'instant' });
  }
  function armIdle() {
    clearTimer();
    if (destroyed || speed || repeatPending) return;
    if (!idleEnabled) { publish('off', '수동 스크롤 · 30초 자동 시작과 반복 이동도 멈췄습니다.'); return; }
    const reason = blocker(true);
    if (reason) { publish('paused', reason); return; }
    publish('waiting', '30초간 조작이 없으면 0.5배속으로 스크롤합니다. Off를 누르면 자동 시작도 꺼집니다.');
    timer = window.setTimeout(() => {
      timer = 0;
      if (performance.now() - lastActivity < IDLE_DELAY_MS) { armIdle(); return; }
      start(IDLE_SPEED, true);
    }, Math.max(0, IDLE_DELAY_MS - (performance.now() - lastActivity)));
  }
  function activity() {
    lastActivity = performance.now();
    cancelRepeat(); stopFrames();
    armIdle();
  }
  function repeatTick() {
    repeatTimer = 0;
    if (destroyed || !repeatPending) return;
    const reason = blocker(true, true);
    // Only a completed guided run can schedule a repeat. Manual arrival at the
    // contact section never returns to the top, even after another idle period.
    if (!repeatEnabled || !idleEnabled || reason || limit().top <= 1 || Math.abs(window.scrollY - position) > 2) {
      cancelRepeat(); publish(idleEnabled ? 'paused' : 'off', reason || endNotice()); return;
    }
    const remaining = repeatDeadline - performance.now();
    if (remaining <= 0) {
      cancelRepeat();
      position = 0;
      writePosition(0);
      // Replace, don't push: a presentation loop must not fill the Back stack.
      if (window.location.hash) {
        try { window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#start`); } catch { /* Scrolling still works when history access is restricted. */ }
      }
      start(IDLE_SPEED, true);
      return;
    }
    repeatRemaining = Math.ceil(remaining / 1000);
    publish('repeat-wait', `${endNotice()} ${repeatRemaining}초 후 맨 위에서 0.5배속으로 반복합니다. 직접 조작하거나 Off를 눌러 취소할 수 있습니다.`);
    repeatTimer = window.setTimeout(repeatTick, Math.min(1000, remaining));
  }
  function finish() {
    stopFrames(); clearTimer(); cancelRepeat();
    if (repeatEnabled && idleEnabled && !blocker(true, true) && limit().top > 1) {
      repeatPending = true;
      repeatDeadline = performance.now() + REPEAT_DELAY_MS;
      repeatTick();
    } else publish('paused', endNotice());
  }
  function tick(time: number) {
    frame = 0;
    if (destroyed || !speed) return;
    const reason = blocker(false, true);
    if (reason) { stopFrames(); clearTimer(); cancelRepeat(); publish(idleEnabled ? 'paused' : 'off', reason); return; }
    const boundary = limit();
    if (window.scrollY >= boundary.top - 1) { finish(); return; }
    // Integrate fractional CSS pixels, not rounded scrollY, on high-refresh displays.
    const elapsed = previousTime === null ? 0 : Math.min(64, Math.max(0, time - previousTime));
    previousTime = time;
    position = Math.min(position + 48 * speed * elapsed / 1000, boundary.top);
    writePosition(position);
    if (position >= boundary.top - 1) { finish(); return; }
    frame = requestAnimationFrame(tick);
  }
  function start(value: ScrollSpeed, automatic = false) {
    if (destroyed) return;
    clearTimer(); cancelRepeat(); stopFrames(); lastActivity = performance.now();
    if (!value) { idleEnabled = false; publish('off', '수동 스크롤 · 30초 자동 시작과 반복 이동도 멈췄습니다.'); return; }
    idleEnabled = true;
    // A real button click may restore focus after a blur; never restore hidden tabs.
    if (!automatic) focused = document.hasFocus();
    const reason = blocker(automatic);
    if (reason) { publish('paused', reason); return; }
    speed = value; position = window.scrollY;
    publish('running', `자동 스크롤 · ${value}배속${automatic ? ' · 자동 재생' : ''}`);
    frame = requestAnimationFrame(tick);
  }
  function setRepeatEnabled(enabled: boolean) {
    if (destroyed || repeatEnabled === enabled) return;
    repeatEnabled = enabled;
    if (!enabled && repeatPending) { cancelRepeat(); publish('paused', `${endNotice()} 반복을 껐습니다.`); return; }
    // This preference never starts a stopped presentation or overrides Off.
    publish(state.phase, `${enabled ? '반복 켜짐' : '반복 꺼짐'}. ${speed ? '현재 속도로 재생합니다.' : state.phase === 'off' ? '자동 이동은 Off 상태입니다.' : '자동 스크롤 종료 시 적용됩니다.'}`);
  }
  function listen(target: EventTarget, name: string, listener: EventListener, options?: AddEventListenerOptions) {
    target.addEventListener(name, listener, options);
    cleanup.push(() => target.removeEventListener(name, listener, options));
  }
  const interaction = (event: Event) => {
    // Let a playback button finish its native activation; any interaction during
    // the repeat countdown cancels the pending return, including control focus.
    if (controls(event.target) && !repeatPending) {
      lastActivity = performance.now();
      if (!speed) armIdle();
      return;
    }
    activity();
  };
  listen(window, 'pointermove', interaction, { passive: true });
  listen(window, 'pointerdown', (event) => { if (!controls(event.target)) held = true; interaction(event); }, { passive: true });
  listen(window, 'pointerup', () => { if (held) { held = false; activity(); } }, { passive: true });
  listen(window, 'pointercancel', () => { if (held) { held = false; activity(); } }, { passive: true });
  listen(window, 'touchstart', (event) => { if (!controls(event.target)) held = true; interaction(event); }, { passive: true });
  listen(window, 'touchend', () => { if (held) { held = false; activity(); } }, { passive: true });
  listen(window, 'touchcancel', () => { if (held) { held = false; activity(); } }, { passive: true });
  listen(window, 'wheel', () => activity(), { passive: true });
  listen(window, 'keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (controls(event.target) && (key === 'Enter' || key === ' ')) return;
    activity();
  });
  listen(document, 'input', interaction);
  listen(document, 'focusin', interaction);
  listen(document, 'focusout', () => {
    queueMicrotask(() => { if (!destroyed && !speed) { lastActivity = performance.now(); armIdle(); } });
  });
  listen(window, 'scroll', () => {
    if (expectedScroll !== null && Math.abs(window.scrollY - expectedScroll) <= 2) { expectedScroll = null; return; }
    expectedScroll = null;
    if (speed && Math.abs(window.scrollY - position) <= 2) return;
    activity();
  }, { passive: true });
  listen(window, 'blur', () => { focused = false; held = false; activity(); });
  listen(window, 'focus', () => { focused = true; held = false; activity(); });
  listen(document, 'visibilitychange', () => { focused = !document.hidden && document.hasFocus(); held = false; activity(); });
  listen(window, 'pagehide', () => { focused = false; held = false; activity(); });
  listen(window, 'pageshow', () => { focused = document.hasFocus(); activity(); });
  listen(motion, 'change', () => activity());
  armIdle();
  return {
    selectSpeed: (value) => { held = false; start(value); },
    setRepeatEnabled,
    pause: activity,
    setMenuOpen: (value) => { if (menuOpen !== value) { menuOpen = value; activity(); } },
    destroy: () => { destroyed = true; clearTimer(); cancelRepeat(); stopFrames(); cleanup.forEach((remove) => remove()); },
  };
}
