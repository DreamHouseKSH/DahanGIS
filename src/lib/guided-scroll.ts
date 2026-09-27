/** Browser-only guided scrolling. AUTO arms idle playback; Off disables it. */
export type ScrollSpeed = 0 | 0.5 | 1 | 2;
export type ScrollPhase = 'waiting' | 'running' | 'paused' | 'off';
export interface ScrollState {
  speed: ScrollSpeed;
  idleEnabled: boolean;
  phase: ScrollPhase;
  notice: string;
}
export const IDLE_DELAY_MS = 30_000;
export const IDLE_SPEED: ScrollSpeed = 0.5;
export const INITIAL_SCROLL_STATE: ScrollState = {
  speed: 0, idleEnabled: true, phase: 'waiting',
  notice: '30초간 조작이 없으면 0.5배속으로 스크롤합니다. Off를 누르면 자동 시작도 꺼집니다.',
};
export interface GuidedScrollController {
  selectSpeed: (speed: ScrollSpeed) => void;
  pause: () => void;
  setMenuOpen: (open: boolean) => void;
  destroy: () => void;
}

export function createGuidedScroll(onChange: (state: ScrollState) => void): GuidedScrollController {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let state = INITIAL_SCROLL_STATE;
  let speed: ScrollSpeed = 0;
  let idleEnabled = true;
  let focused = document.hasFocus();
  let menuOpen = false;
  let held = false;
  let destroyed = false;
  let timer = 0;
  let frame = 0;
  let previousTime: number | null = null;
  let position = window.scrollY;
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
  function blocker(automatic: boolean): string | null {
    if (document.hidden || !focused) return '화면을 벗어나 자동 스크롤을 멈췄습니다.';
    if (menuOpen || held) return '메뉴 또는 화면을 조작하는 동안 자동 스크롤을 멈췄습니다.';
    if (editable()) return '입력하는 동안 자동 스크롤을 멈췄습니다.';
    const boundary = limit();
    if (window.scrollY >= boundary.top - 1) return boundary.contact
      ? '문의 내용을 편하게 작성하도록 자동 스크롤을 멈췄습니다.' : '다한의 이야기를 모두 살펴보셨습니다.';
    if (automatic && motion.matches) return '동작 줄이기 설정에서는 30초 자동 시작을 사용하지 않습니다.';
    return null;
  }
  function publish(phase: ScrollPhase, notice: string) {
    if (destroyed) return;
    if (state.speed === speed && state.idleEnabled === idleEnabled && state.phase === phase && state.notice === notice) return;
    state = { speed, idleEnabled, phase, notice };
    onChange(state);
  }
  function clearTimer() { window.clearTimeout(timer); timer = 0; }
  function stopFrames() { cancelAnimationFrame(frame); frame = 0; speed = 0; previousTime = null; }
  function armIdle() {
    clearTimer();
    if (destroyed || speed) return;
    if (!idleEnabled) { publish('off', '수동 스크롤 · 30초 자동 시작도 꺼졌습니다.'); return; }
    const reason = blocker(true);
    if (reason) { publish('paused', reason); return; }
    publish('waiting', INITIAL_SCROLL_STATE.notice);
    timer = window.setTimeout(() => {
      timer = 0;
      if (performance.now() - lastActivity < IDLE_DELAY_MS) { armIdle(); return; }
      start(IDLE_SPEED, true);
    }, Math.max(0, IDLE_DELAY_MS - (performance.now() - lastActivity)));
  }
  function activity() {
    lastActivity = performance.now();
    stopFrames();
    armIdle();
  }
  function tick(time: number) {
    frame = 0;
    if (destroyed || !speed) return;
    const reason = blocker(false);
    if (reason) { stopFrames(); clearTimer(); publish(idleEnabled ? 'paused' : 'off', reason); return; }
    // Integrate fractional CSS pixels, not rounded scrollY, on high-refresh displays.
    const elapsed = previousTime === null ? 0 : Math.min(64, Math.max(0, time - previousTime));
    previousTime = time;
    const boundary = limit();
    position = Math.min(position + 48 * speed * elapsed / 1000, boundary.top);
    window.scrollTo({ top: position, behavior: 'instant' });
    if (position >= boundary.top - 1) {
      stopFrames(); clearTimer();
      publish('paused', boundary.contact ? '문의 내용을 편하게 작성하도록 자동 스크롤을 멈췄습니다.' : '다한의 이야기를 모두 살펴보셨습니다.');
      return;
    }
    frame = requestAnimationFrame(tick);
  }
  function start(value: ScrollSpeed, automatic = false) {
    if (destroyed) return;
    clearTimer(); stopFrames(); lastActivity = performance.now();
    if (!value) { idleEnabled = false; publish('off', '수동 스크롤 · 30초 자동 시작도 꺼졌습니다.'); return; }
    idleEnabled = true;
    // A real button click may restore focus after a blur; never restore hidden tabs.
    if (!automatic) focused = document.hasFocus();
    const reason = blocker(automatic);
    if (reason) { publish('paused', reason); return; }
    speed = value; position = window.scrollY;
    publish('running', `자동 스크롤 · ${value}배속${automatic ? ' · 30초 대기 후 시작' : ''}`);
    frame = requestAnimationFrame(tick);
  }
  function listen(target: EventTarget, name: string, listener: EventListener, options?: AddEventListenerOptions) {
    target.addEventListener(name, listener, options);
    cleanup.push(() => target.removeEventListener(name, listener, options));
  }
  const interaction = (event: Event) => {
    // Let the button's native click/keyboard activation finish before starting playback.
    if (controls(event.target)) {
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
    // focusout runs before activeElement changes; check after the focus transition.
    queueMicrotask(() => { if (!destroyed && !speed) { lastActivity = performance.now(); armIdle(); } });
  });
  listen(window, 'scroll', () => {
    // Our own animation must neither reset the idle timer nor stop itself.
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
    pause: activity,
    setMenuOpen: (value) => { if (menuOpen !== value) { menuOpen = value; activity(); } },
    destroy: () => { destroyed = true; clearTimer(); stopFrames(); cleanup.forEach((remove) => remove()); },
  };
}
