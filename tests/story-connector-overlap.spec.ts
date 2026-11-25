import { writeFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';
import { chapters, pillars } from '../src/components/story/content';
import { IN_VIEW_MARGIN, measureConnector, persistProblem, sectionVisible, settleConnector, summarize, sweepConnector, type ConnectorSample } from './connector-geometry';

// 왼쪽 목차 연결선이 (1) 본문 위를 지나가지 않고 (2) 화면 밖 구간을 가리키지 않으며 (3) 활성 항목에 붙어 있는지 본다.
const WIDTHS = [981, 1024, 1200, 1280, 1440, 1920];
const HEIGHT = 900;
const ITEMS = [...chapters.map((chapter) => chapter.id), ...pillars.map((pillar) => pillar.id)];
const OVERLAP_TOLERANCE = 1; // px
const START_TOLERANCE = 3; // px — 시작점 y 와 활성 라벨 세로 중심의 차이
const shown = (sample: ConnectorSample) => sample.lineShown || sample.dotShown;
const where = (sample: ConnectorSample) => `${sample.item} · scrollY ${sample.scrollY}`;

// 연결선은 980px 이하에서 숨김이고 뷰포트를 직접 정하므로 데스크톱 프로젝트에서만 돌린다.
test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '연결선은 모바일 폭에서 숨김 — 뷰포트를 직접 지정하는 데스크톱 전용 점검');
  await isolateExternalServices(page);
});

async function openStory(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  // 등장 효과의 0.6초 이동(translateY 18px)이 제목 상자를 흔들지 않게 끝난 상태로 고정한다.
  await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}' });
  // 30초 무조작 자동 재생이 측정 도중 화면을 움직이지 않게 끈다.
  await page.getByRole('button', { name: '자동 스크롤 끄기', exact: true }).click();
}

// 폭마다 문서 전체를 150px 간격으로 한 번만 내리고(폭당 약 150표본), 네 가지 단언을 그 표본에 soft 로 건다.
for (const width of WIDTHS) {
  test(`연결선과 본문 (폭 ${width}): 목차 11항목 × 150px 간격 스크롤에서 겹침·엉뚱한 곳 없음, 제목 연결 보존`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: HEIGHT });
    await openStory(page);
    const samples = await sweepConnector(page, width, HEIGHT);
    const rows = summarize(samples, OVERLAP_TOLERANCE);
    // 재현 수치화용: CONNECTOR_REPORT=<폴더> 를 주면 표본과 요약을 남긴다(평소 실행에서는 쓰지 않는다).
    if (process.env.CONNECTOR_REPORT) writeFileSync(`${process.env.CONNECTOR_REPORT}/sweep-${width}.json`, JSON.stringify({ rows, samples }));

    // 표본 범위: 11항목 모두 활성 표본이 있고, 제목이 화면 안인 표본도 있다(아래 보존 단언이 빈 채로 통과하지 않게).
    for (const item of ITEMS) {
      const row = rows.find((entry) => entry.item === item);
      expect.soft(row?.samples ?? 0, `${item} 활성 표본 수`).toBeGreaterThan(0);
      expect.soft(row?.inView ?? 0, `${item} 제목이 화면 안인 표본 수`).toBeGreaterThan(0);
    }

    // (겹침 없음) 연결선이 보일 때 선·점이 글자·이미지·카드 상자와 1px 넘게 겹치지 않는다.
    const overlapped = samples.filter((sample) => shown(sample) && sample.overlapPx > OVERLAP_TOLERANCE);
    const worst = [...overlapped].sort((a, b) => b.overlapPx - a.overlapPx).slice(0, 8).map((sample) => `${where(sample)} → ${sample.overlapPx}px ${sample.overlapWith}`);
    expect.soft(worst, `겹침 없음: 본문과 겹친 표본 ${overlapped.length} / ${samples.length} (최악 8건)`).toEqual([]);

    // (엉뚱한 곳 없음) 활성 구간(#id)의 보이는 범위가 없으면 선과 점이 보이지 않는다. 제목만 지나간 것은 숨길 이유가 아니다.
    const out = samples.filter((sample) => !(sectionVisible(sample) > 0));
    const stray = out.filter(shown);
    expect.soft(stray.slice(0, 8).map((sample) => `${where(sample)} → 구간 y ${sample.secTop}~${sample.secBottom}, 선 끝 y ${sample.endY}`),
      `엉뚱한 곳 없음: 구간이 화면 밖인데 선·점이 보인 표본 ${stray.length} / ${out.length} (앞 8건)`).toEqual([]);

    // (보존) 제목이 화면 안이면 선과 점이 보이고, 끝점 높이는 제목 상자의 위~아래 사이다.
    const inView = samples.filter((sample) => sample.destination === 'in');
    const broken = inView.filter((sample) => !sample.lineShown || !sample.dotShown
      || sample.endY < sample.destTop - 1 || sample.endY > sample.destBottom + 1
      || sample.dotY < sample.destTop - 1 || sample.dotY > sample.destBottom + 1);
    expect.soft(broken.slice(0, 8).map((sample) => `${where(sample)} → 선 ${sample.lineShown} 점 ${sample.dotShown} 끝 y ${sample.endY} 점 y ${sample.dotY} 제목 y ${sample.destTop}~${sample.destBottom}`),
      `보존: 제목이 화면 안(위 ${IN_VIEW_MARGIN.top}px·아래 ${IN_VIEW_MARGIN.bottom}px 여유)인 표본 ${inView.length}개 중 어긋난 것`).toEqual([]);

    // (보존) 선이 보일 때 시작점은 활성 라벨 오른쪽 13px 밖, 라벨 세로 중심 3px 이내다.
    const drawn = samples.filter((sample) => sample.lineShown);
    const detached = drawn.filter((sample) => !(sample.startGap >= 13) || !(Math.abs(sample.startOffsetY) <= START_TOLERANCE));
    expect.soft(detached.slice(0, 8).map((sample) => `${where(sample)} → 라벨 오른쪽에서 ${sample.startGap}px, 세로 중심에서 ${sample.startOffsetY}px`),
      `보존: 선이 보인 표본 ${drawn.length}개 중 시작점이 활성 라벨에서 떨어진 것`).toEqual([]);

    // (시작점 부착) 강조 배경에 가려지지 않고 실제로 눈에 보이는 첫 점도 활성 라벨 글자의 세로 중심 3px 이내다.
    const afloat = drawn.filter((sample) => !(Math.abs(sample.visibleStartOffsetY) <= START_TOLERANCE));
    expect.soft(afloat.slice(0, 8).map((sample) => `${where(sample)} → 보이는 시작점이 글자 중심에서 ${sample.visibleStartOffsetY}px (앞 ${sample.hiddenStartPx}px 는 강조 배경에 가림)`),
      `시작점 부착: 선이 보인 표본 ${drawn.length}개 중 눈에 보이는 시작점이 활성 라벨 높이에서 벗어난 것 ${afloat.length}개 (앞 8건)`).toEqual([]);
  });
}

// 사용자 캡처의 두 위치를 그대로 고정한다: 01 정사영상 제목이 화면 위쪽에 보일 때 / 제목이 화면 위로 지나간 뒤.
for (const width of [1280, 1440, 1920]) {
  test(`01 정사영상 두 위치 (폭 ${width}): 제목이 보이면 라벨 높이에서 출발해 제목을 가리키고, 제목이 지나가도 구간이 보이는 동안 선·점이 남는다`, async ({ page }) => {
    await page.setViewportSize({ width, height: HEIGHT });
    await openStory(page);
    const place = async (titleTop: number) => {
      await page.evaluate((top) => scrollTo({ top: document.querySelector('#ortho h2')!.getBoundingClientRect().top + scrollY - top, behavior: 'instant' }), titleTop);
      await settleConnector(page);
      await page.waitForTimeout(1000); // 완료 정의: 스크롤이 멈추고 목차 펼침이 끝난 뒤 1초 기준
      return measureConnector(page);
    };
    const seen = await place(250);
    expect.soft(seen.item, '활성 항목').toBe('ortho');
    expect.soft(seen.destination, '제목 y≈250 은 화면 안').toBe('in');
    expect.soft(seen.lineShown && seen.dotShown, '제목이 보일 때 선·점 표시').toBe(true);
    expect.soft(Math.abs(seen.startOffsetY), '제목이 보일 때: 시작점 y − 라벨 글자 중심').toBeLessThanOrEqual(START_TOLERANCE);
    expect.soft(Math.abs(seen.visibleStartOffsetY), '제목이 보일 때: 눈에 보이는 시작점 y − 라벨 글자 중심').toBeLessThanOrEqual(START_TOLERANCE);
    expect.soft(seen.overlapPx, `제목이 보일 때 본문 겹침 (${seen.overlapWith})`).toBeLessThanOrEqual(OVERLAP_TOLERANCE);
    expect.soft(seen.endY >= seen.destTop - 1 && seen.endY <= seen.destBottom + 1, `끝점 y ${seen.endY} 가 제목 ${seen.destTop}~${seen.destBottom} 안`).toBe(true);

    const passed = await place(-420);
    expect.soft(passed.item, '제목이 지나간 뒤에도 활성 항목은 정사영상').toBe('ortho');
    expect.soft(passed.destination, '제목은 화면 밖').toBe('out');
    // 2026-11-25 사용자 요구로 뒤집힘: 구간이 화면에 있는 동안 선·점은 남고, 끝점은 헤더 아래 구간의 보이는 범위 위쪽에 있다.
    expect.soft(sectionVisible(passed), '구간(#ortho)은 아직 화면 안').toBeGreaterThan(0);
    expect.soft(persistProblem(passed), '제목이 지나간 뒤에도 선·점이 남고 끝점은 구간의 보이는 범위 위쪽').toBe('');
    expect.soft(Math.abs(passed.visibleStartOffsetY), '제목이 지나간 뒤: 눈에 보이는 시작점 y − 라벨 글자 중심').toBeLessThanOrEqual(START_TOLERANCE);
    expect.soft(passed.overlapPx, `제목이 지나간 뒤 본문 겹침 (${passed.overlapWith})`).toBeLessThanOrEqual(OVERLAP_TOLERANCE);
  });
}

/** 한 프레임: 선이 보이는지, 시작점 y − 활성 라벨 세로 중심. */
type Frame = { at: number; shown: boolean; offset: number; item: string };
type Recorder = { frames: Frame[]; done: boolean };

/** action 직후부터 스크롤이 멈추고 1초 지날 때까지(최대 6초) 매 프레임 시작점과 활성 라벨의 세로 차이를 적는다. */
async function recordStart(page: Page, action: () => Promise<void>): Promise<Frame[]> {
  await page.evaluate(() => {
    const recorder: Recorder = { frames: [], done: false };
    (window as unknown as { __connector: Recorder }).__connector = recorder;
    const began = performance.now();
    let lastY = scrollY, movedAt = began;
    const tick = () => {
      const now = performance.now();
      if (scrollY !== lastY) { lastY = scrollY; movedAt = now; }
      const svg = document.querySelector('.story-connector')!, path = svg.querySelector('path')!;
      const active = [...document.querySelectorAll('.story-rail a[aria-current]')].pop();
      const label = active?.querySelector(':scope > span:last-child')?.getBoundingClientRect();
      const hidden = [svg, path].some((el) => { const style = getComputedStyle(el); return style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) <= 0.01; });
      const drawn = !hidden && Boolean(path.getAttribute('d')) && path.getTotalLength() > 0;
      const start = drawn ? path.getPointAtLength(0) : null, matrix = path.getScreenCTM();
      const y = start && matrix ? start.x * matrix.b + start.y * matrix.d + matrix.f : NaN;
      recorder.frames.push({ at: now - began, shown: drawn, offset: label ? y - (label.top + label.height / 2) : NaN, item: active?.getAttribute('href') ?? '' });
      if ((now - movedAt >= 1000 && now - began >= 1200) || now - began >= 6000) recorder.done = true; else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await action();
  await page.waitForFunction(() => (window as unknown as { __connector: Recorder }).__connector.done);
  return page.evaluate(() => (window as unknown as { __connector: Recorder }).__connector.frames);
}

/** 선이 보이면서 시작점이 라벨 중심에서 tolerance 넘게 떨어진 프레임이 이어진 가장 긴 시간(ms). */
function longestDetached(frames: Frame[], tolerance: number) {
  let longest = 0, since = -1;
  for (const frame of frames) {
    const detached = frame.shown && !(Math.abs(frame.offset) <= tolerance);
    if (detached && since < 0) since = frame.at;
    if (detached) longest = Math.max(longest, frame.at - since); else since = -1;
  }
  return Math.round(longest);
}

test('시작점 부착: 목차가 펼쳐지고 접히는 이동 뒤에도 선은 활성 라벨 세로 중심 3px 안에서 출발하고, 0.5초 넘게 허공에서 출발하지 않는다', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: HEIGHT });
  await openStory(page);
  const rail = (id: string) => page.locator(`.story-rail a[href="#${id}"]`);
  /** 그 구간 제목이 화면 위쪽(y≈250)에 오도록 한 번에 옮긴다 — 키보드·해시·검색 이동처럼 뒤따르는 스크롤이 없는 경우. */
  const jumpTo = (id: string) => page.evaluate((sid) => scrollTo({ top: document.querySelector(`#${sid} h2`)!.getBoundingClientRect().top + scrollY - 250, behavior: 'instant' }), id);
  const steps: [string, () => Promise<void>][] = [
    ['맨 위 → 정사영상 제목으로 즉시 이동(하위 목차 펼침)', () => jumpTo('ortho')],
    ['정사영상 → 소프트웨어 제목으로 즉시 이동(하위 항목만 바뀜)', () => jumpTo('software')],
    ['목차 클릭: 강점(하위 목차 접힘)', () => rail('why').click()],
    ['강점 → 데이터 제목으로 즉시 이동(다시 펼침)', () => jumpTo('data')],
    ['맨 위로 즉시 이동(접힘)', () => page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))],
    ['목차 클릭: 서비스(펼침)', () => rail('services').click()],
    ['목차 클릭: 정사영상', () => rail('ortho').click()],
    ['휠 600px', async () => { await page.mouse.move(720, 450); await page.mouse.wheel(0, 600); }],
  ];
  const failures: string[] = [];
  for (const [name, action] of steps) {
    const frames = await recordStart(page, action);
    const last = frames[frames.length - 1];
    const rested = last.shown ? Math.round(last.offset * 10) / 10 : 0; // 선을 숨겼으면 떨어진 것이 아니다
    const longest = longestDetached(frames, START_TOLERANCE);
    if (!(Math.abs(rested) <= START_TOLERANCE) || longest > 500) failures.push(`${name}: 멈추고 1초 뒤 차이 ${rested}px, 떨어진 채 보인 최장 ${longest}ms (활성 ${last.item})`);
  }
  expect(failures, '멈춘 뒤 3px 초과 또는 0.5초 넘게 허공에서 출발한 이동').toEqual([]);
});

test('보존: 980px 이하·reduced-motion·인쇄에서는 연결선을 그리지 않는다', async ({ page }) => {
  const display = () => page.locator('.story-connector').evaluate((node) => getComputedStyle(node).display);
  await page.setViewportSize({ width: 981, height: HEIGHT });
  await openStory(page);
  await settleConnector(page);
  expect(await display(), '981px 에서는 그린다').not.toBe('none');
  await page.setViewportSize({ width: 980, height: HEIGHT });
  expect(await display(), '980px').toBe('none');
  await page.setViewportSize({ width: 1440, height: HEIGHT });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await display(), 'reduced-motion').toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference', media: 'print' });
  expect(await display(), '인쇄').toBe('none');
});
