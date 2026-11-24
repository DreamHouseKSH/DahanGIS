import { expect, test, type Page } from '@playwright/test';
import { MOBILE_WIDTHS, THEMES, measureFloating, openThemed, type FloatingSample } from './floating-geometry';
import { isolateExternalServices } from './helpers';

/**
 * W08 — 모바일(980px 이하)에서 떠 있는 두 요소가 본문을 가리거나 비치게 하지 않는다.
 * A: 서비스 구간의 칩 띠 사각형 안에 밑의 본문이 드러나지 않는다(불투명 배경 + 영역 전체 채움).
 * B: 알약("NN / 06 장이름")이 읽을 수 있는 본문 글자 위에 얹히지 않는다. 숨겨서 통과하면 안 된다.
 */
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', '폭을 테스트가 직접 정하므로 한 프로젝트에서만 돈다.');
  test.setTimeout(240_000);
  await isolateExternalServices(page);
});

/** 자동 스크롤을 끄고 from~to(문서 좌표)를 100px 간격으로 훑는다. to 는 스크롤할 수 있는 끝을 넘지 않는다. */
async function sweep(page: Page, range: 'services' | 'page'): Promise<FloatingSample[]> {
  await page.getByRole('button', { name: '자동 스크롤 끄기' }).click();
  const [from, to] = await page.evaluate((scope) => {
    const limit = document.documentElement.scrollHeight - window.innerHeight;
    if (scope === 'page') return [0, limit];
    const box = document.querySelector('#services')!.getBoundingClientRect();
    return [Math.max(0, Math.floor(box.top + window.scrollY) - 200), Math.min(limit, Math.ceil(box.bottom + window.scrollY))];
  }, range);
  const samples: FloatingSample[] = [];
  for (let y = from; y <= to; y += 100) samples.push(await measureFloating(page, y));
  return samples;
}

for (const theme of THEMES) for (const width of MOBILE_WIDTHS) {
  test(`A 칩 띠 안에 본문이 드러나지 않는다 — ${width}px ${theme}`, async ({ page }) => {
    await openThemed(page, '/', theme, width);
    const shown = (await sweep(page, 'services')).filter((sample) => sample.strip.shown);
    const exposed = shown.filter((sample) => sample.strip.exposed > 0);
    const worst = exposed.reduce((max, sample) => Math.max(max, sample.strip.exposed), 0);
    console.log(`[W08-A] ${theme} ${width}px 띠가 보인 표본 ${shown.length} · 본문이 드러난 표본 ${exposed.length}/${shown.length} · 최대 ${worst}/${shown[0]?.strip.points ?? 0}점 · 알파 ${shown[0]?.strip.alpha} opacity ${shown[0]?.strip.opacity} · 예 ${exposed[0]?.strip.exposedBy ?? '-'} (y=${exposed[0]?.scrollY ?? '-'})`);
    expect(shown.length, '서비스 구간에서 칩 띠가 보여야 한다').toBeGreaterThan(0);
    expect(shown.filter((sample) => sample.strip.alpha !== 1 || sample.strip.opacity !== 1).map((sample) => sample.scrollY), '칩 띠 배경이 불투명하지 않은 표본').toEqual([]);
    expect(exposed.map((sample) => `y=${sample.scrollY} ${sample.strip.exposed}/${sample.strip.points}점 ${sample.strip.exposedBy}`), '칩 띠 사각형 안에 본문이 드러난 표본').toEqual([]);
  });

  test(`B 알약이 본문 글자 위에 얹히지 않는다 — ${width}px ${theme}`, async ({ page }) => {
    await openThemed(page, '/', theme, width);
    const samples = await sweep(page, 'page');
    const shown = samples.filter((sample) => sample.pill.shown);
    const overlapped = shown.filter((sample) => sample.pill.overlapPx > 0);
    const worst = overlapped.reduce((max, sample) => (sample.pill.overlapPx > max.pill.overlapPx ? sample : max), shown[0]);
    const texts = [...new Set(shown.map((sample) => sample.pill.text))];
    console.log(`[W08-B] ${theme} ${width}px 알약이 보인 표본 ${shown.length}/${samples.length} · 글자와 겹친 표본 ${overlapped.length}/${shown.length} · 최대 ${worst?.pill.overlapPx ?? 0}px² (${worst?.pill.overlapWith ?? '-'} y=${worst?.scrollY ?? '-'}) · 알약 글자 ${texts.length}종`);
    expect(shown.length, '알약은 숨기지 않고 계속 보여야 한다').toBeGreaterThan(0);
    expect(overlapped.map((sample) => `y=${sample.scrollY} ${sample.pill.overlapPx}px² ${sample.pill.overlapWith}`), '알약이 본문 글자와 겹친 표본').toEqual([]);
    // 장이 바뀌면 알약 글자가 따라 바뀐다(서비스 구간은 칩 띠가 대신하므로 여섯 장 중 다섯).
    expect(texts.every((text) => /^0[1-6] \/ 06 \S/.test(text)), `알약 글자: ${texts.join(' | ')}`).toBe(true);
    expect(texts.length, `알약 글자: ${texts.join(' | ')}`).toBeGreaterThanOrEqual(5);
    // 기존 동작: 서비스 구간에서는 알약이 숨고 칩 띠가 나온다.
    const strips = samples.filter((sample) => sample.strip.shown);
    expect(strips.length, '서비스 구간에서 칩 띠가 보여야 한다').toBeGreaterThan(0);
    expect(strips.filter((sample) => sample.pill.shown).map((sample) => sample.scrollY), '칩 띠와 알약이 함께 보인 표본').toEqual([]);
  });
}
