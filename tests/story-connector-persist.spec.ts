import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';
import { chapters, pillars } from '../src/components/story/content';
import { measureConnector, persistProblem, sectionVisible, settleConnector, sweepConnector, type ConnectorSample } from './connector-geometry';

// 왼쪽 목차 연결선이 "제목이 화면에 있을 때만"이 아니라 "활성 구간(#id)이 화면에 있는 동안" 계속 보이는지 본다.
// (유지) 구간의 보이는 범위가 있으면 선·점이 보인다. (끝점) 헤더 아래·화면 안·구간 상자 안. (끊김 없음) 30px 걸음에서 사라지거나 튀지 않는다.
const WIDTHS = [1200, 1331, 1620];
const HEIGHT = 900;
const ITEMS = [...chapters.map((chapter) => chapter.id), ...pillars.map((pillar) => pillar.id)];
const SERVICES = ['ortho', 'data', 'software'];
const STEP = 30; // px — 끊김을 재는 한 걸음
const JUMP_LIMIT = 60; // px — 끝점 y 가 한 걸음에 스크롤 양보다 더 움직여도 되는 한계
const OVERLAP_TOLERANCE = 1; // px
const titlePassed = (sample: ConnectorSample) => sample.destBottom <= sample.headerBottom && sectionVisible(sample) > 0;

test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '연결선은 모바일 폭에서 숨김 — 뷰포트를 직접 지정하는 데스크톱 전용 점검');
  await isolateExternalServices(page);
});

async function openStory(page: Page, width: number) {
  await page.setViewportSize({ width, height: HEIGHT });
  await page.goto('/', { waitUntil: 'networkidle' });
  // 등장 효과의 이동이 제목 상자를 흔들지 않게 끝난 상태로 고정하고, 30초 무조작 자동 재생을 끈다.
  await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}' });
  await page.getByRole('button', { name: '자동 스크롤 끄기', exact: true }).click();
}

/** 그 구간 제목의 윗변이 화면 y=titleTop 에 오게 한 번에 옮긴다. */
const placeTitle = (page: Page, id: string, titleTop: number) => page.evaluate(([sid, top]) => {
  const title = document.querySelector(`#${sid} [data-story-target], #${sid} h2`)!;
  scrollTo({ top: title.getBoundingClientRect().top + scrollY - Number(top), behavior: 'instant' });
}, [id, titleTop] as const);

for (const width of WIDTHS) {
  test(`유지·끝점 (폭 ${width}): 목차 11항목 × 150px 간격 스크롤에서 구간이 보이는 동안 선·점이 남고 끝점은 구간 안`, async ({ page }) => {
    test.setTimeout(90000);
    await openStory(page, width);
    const samples = await sweepConnector(page, width, HEIGHT);

    // 표본 범위: 11항목 모두 구간이 보이는 활성 표본이 있고, 서비스 세 구간은 "제목이 지나간 뒤" 표본도 있다(빈 채로 통과하지 않게).
    for (const item of ITEMS) expect.soft(samples.filter((sample) => sample.item === item && sectionVisible(sample) > 0).length, `${item} 구간이 보이는 활성 표본 수`).toBeGreaterThan(0);
    for (const item of SERVICES) expect.soft(samples.filter((sample) => sample.item === item && titlePassed(sample)).length, `${item} 제목이 위로 지나간 표본 수`).toBeGreaterThan(0);

    // (유지·끝점) 완료 정의 1·2 — 제목이 보이든 지나갔든 아직 아래든 같다.
    const visible = samples.filter((sample) => sample.item && sectionVisible(sample) > 0);
    const problems = visible.map(persistProblem).filter(Boolean);
    expect.soft(problems.slice(0, 8), `유지·끝점: 구간이 보이는 표본 ${visible.length}개 중 어긋난 것 ${problems.length}개 (앞 8건)`).toEqual([]);
    const lost = visible.filter(titlePassed).filter((sample) => !sample.lineShown || !sample.dotShown);
    expect.soft(lost.length, `유지: 제목이 지나갔고 구간은 보이는 표본 ${visible.filter(titlePassed).length}개 중 선·점이 없는 것`).toBe(0);

    // (겹침 없음) 새로 보이게 된 위치에서도 선·점이 글자·이미지·카드와 겹치지 않는다.
    const overlapped = samples.filter((sample) => (sample.lineShown || sample.dotShown) && sample.overlapPx > OVERLAP_TOLERANCE);
    expect.soft(overlapped.slice(0, 8).map((sample) => `${sample.item} · scrollY ${sample.scrollY} → ${sample.overlapPx}px ${sample.overlapWith}`), `겹침 없음: 본문과 겹친 표본 ${overlapped.length} / ${samples.length} (앞 8건)`).toEqual([]);
  });

  test(`끊김 없음 (폭 ${width}): 정사영상·데이터·소프트웨어 구간을 ${STEP}px 씩 내려도 선이 사라지거나 끝점이 튀지 않는다`, async ({ page }) => {
    test.setTimeout(120000);
    await openStory(page, width);
    for (const id of SERVICES) {
      // 구간 윗변이 활성 기준선(화면 높이의 38%) 바로 아래에 오게 놓고, 그 구간이 활성인 동안 30px 씩 내린다.
      await page.evaluate(([sid, line]) => scrollTo({ top: document.getElementById(String(sid))!.getBoundingClientRect().top + scrollY - Number(line), behavior: 'instant' }), [id, HEIGHT * 0.38 + STEP] as const);
      const run: ConnectorSample[] = [];
      for (let step = 0; step < 200; step += 1) {
        await page.evaluate((by) => scrollBy({ top: by, behavior: 'instant' }), STEP);
        await settleConnector(page);
        const sample = await measureConnector(page);
        if (sample.item === id && sectionVisible(sample) > 0) run.push(sample); else if (run.length) break;
      }
      expect.soft(run.length, `${id}: 활성인 동안 모은 표본 수`).toBeGreaterThan(10);
      expect.soft(run.filter(titlePassed).length, `${id}: 제목이 위로 지나간 표본 수`).toBeGreaterThan(0);

      const gone = run.filter((sample) => !sample.lineShown || !sample.dotShown);
      expect.soft(gone.slice(0, 5).map((sample) => `scrollY ${sample.scrollY} (구간 y ${sample.secTop}~${sample.secBottom}, 제목 y ${sample.destTop}~${sample.destBottom})`),
        `${id} 끊김 없음: 표본 ${run.length}개 중 선·점이 사라진 것 ${gone.length}개 (앞 5건)`).toEqual([]);
      const problems = run.map(persistProblem).filter(Boolean);
      expect.soft(problems.slice(0, 5), `${id} 유지·끝점: 표본 ${run.length}개 중 어긋난 것 ${problems.length}개 (앞 5건)`).toEqual([]);

      const jumps: string[] = [];
      for (let index = 1; index < run.length; index += 1) {
        const before = run[index - 1], after = run[index];
        if (!before.lineShown || !after.lineShown) continue; // 사라진 걸음은 위 단언이 센다
        const moved = Math.abs(after.endY - before.endY), scrolled = Math.abs(after.scrollY - before.scrollY);
        if (moved - scrolled > JUMP_LIMIT) jumps.push(`scrollY ${before.scrollY}→${after.scrollY}: 끝점 y ${before.endY}→${after.endY} (스크롤 ${scrolled}px 보다 ${Math.round(moved - scrolled)}px 더 움직임)`);
      }
      expect.soft(jumps.slice(0, 5), `${id} 끊김 없음: 끝점 y 가 한 걸음에 스크롤 양보다 ${JUMP_LIMIT}px 넘게 튄 걸음 ${jumps.length}개 (앞 5건)`).toEqual([]);
      const overlapped = run.filter((sample) => sample.overlapPx > OVERLAP_TOLERANCE);
      expect.soft(overlapped.slice(0, 5).map((sample) => `scrollY ${sample.scrollY} → ${sample.overlapPx}px ${sample.overlapWith}`), `${id} 겹침 없음: 본문과 겹친 표본 ${overlapped.length}개 (앞 5건)`).toEqual([]);
    }
  });
}

// 사용자 캡처(2026-11-25) 위치: 목차 "데이터 구축"이 활성이고 제목은 위로 지나간 화면. 색 테마와 무관해야 한다.
test('데이터 구축 제목이 지나간 위치 (폭 1331): 멈춘 뒤 0.5초 안에 선·점이 보이고, 다크·라이트에서 같은 자리다', async ({ page }) => {
  await openStory(page, 1331);
  const theme = () => page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const measured: Record<string, ConnectorSample> = {};
  for (let round = 0; round < 2; round += 1) {
    const name = String(await theme());
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await settleConnector(page);
    await placeTitle(page, 'data', -300);
    await page.waitForTimeout(500); // 완료 정의: 스크롤이 멈춘 뒤 0.5초 안
    const sample = measured[name] = await measureConnector(page);
    expect.soft(sample.item, `${name}: 활성 항목`).toBe('data');
    expect.soft(titlePassed(sample), `${name}: 제목은 헤더 위로 지나갔고 구간은 보인다 (제목 y ${sample.destTop}~${sample.destBottom}, 구간 y ${sample.secTop}~${sample.secBottom})`).toBe(true);
    expect.soft(persistProblem(sample), `${name}: 선·점 유지와 끝점 위치`).toBe('');
    expect.soft(sample.overlapPx, `${name}: 본문 겹침 (${sample.overlapWith})`).toBeLessThanOrEqual(OVERLAP_TOLERANCE);
    if (round === 0) await page.locator('.story-theme').click();
  }
  expect(Object.keys(measured).sort(), '두 테마를 모두 쟀다').toEqual(['dark', 'light']);
  const key = ({ lineShown, dotShown, endX, endY, dotY }: ConnectorSample) => ({ lineShown, dotShown, endX, endY, dotY });
  expect(key(measured.light), '라이트와 다크의 표시 여부·끝점이 같다').toEqual(key(measured.dark));
});
