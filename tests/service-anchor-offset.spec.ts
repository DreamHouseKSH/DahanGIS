import { expect, test } from '@playwright/test';
import { THEMES, measureAnchor, openThemed, type AnchorSample } from './floating-geometry';
import { isolateExternalServices } from './helpers';

/**
 * W08-C — /services/ 에서 서비스 탭이나 #주소로 한 절에 멈추면, 그 절의 큰 번호(span.dg-big-num)가
 * 고정 탭 띠(sticky 가 아니면 헤더) 아랫변보다 8px 이상 아래에 있고 화면 위에서 220px 안에 있다.
 */
const WIDTHS = [981, 1024, 1100, 1200, 1280, 1440, 390, 768];
const SERVICES = ['ortho', 'data', 'consult', 'software', 'edu'];
const MIN_GAP = 8, MAX_TOP = 220;

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', '폭을 테스트가 직접 정하므로 한 프로젝트에서만 돈다.');
  test.setTimeout(120_000);
  await isolateExternalServices(page);
});

for (const theme of THEMES) for (const width of WIDTHS) {
  test(`C 서비스 번호가 탭 띠에 가려지지 않는다 — ${width}px ${theme}`, async ({ page }) => {
    const samples: (AnchorSample & { via: string })[] = [];
    await openThemed(page, '/services/', theme, width, 900);
    for (const id of SERVICES) {
      await page.locator(`nav.dg-service-nav a[href="#${id}"]`).click();
      samples.push({ via: '탭', ...(await measureAnchor(page, id)) });
    }
    for (const id of SERVICES) {
      await page.goto('about:blank');
      await page.goto(`/services/#${id}`, { waitUntil: 'networkidle' });
      samples.push({ via: '주소', ...(await measureAnchor(page, id)) });
    }
    const describe = (sample: (typeof samples)[number]) => `${sample.via} #${sample.id} 간격 ${sample.gap}px (번호 윗변 ${sample.numberTop} · ${sample.sticky ? '탭 띠' : '헤더'} 아랫변 ${sample.edge})`;
    const hidden = samples.filter((sample) => sample.gap < MIN_GAP);
    const pushed = samples.filter((sample) => sample.numberTop > MAX_TOP);
    const gaps = samples.map((sample) => sample.gap);
    console.log(`[W08-C] ${theme} ${width}px 간격 ${MIN_GAP}px 미만 ${hidden.length}/${samples.length} · 최소 간격 ${Math.min(...gaps)}px · 최대 간격 ${Math.max(...gaps)}px · 번호 윗변 최대 ${Math.max(...samples.map((sample) => sample.numberTop))}px · ${MAX_TOP}px 초과 ${pushed.length}/${samples.length}`);
    expect(hidden.map(describe), `번호 윗변이 고정 띠 아랫변보다 ${MIN_GAP}px 이상 아래에 있지 않은 표본`).toEqual([]);
    expect(pushed.map(describe), `번호가 화면 위에서 ${MAX_TOP}px 밖으로 밀린 표본`).toEqual([]);
  });
}
