import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

// 서비스 카드의 이미지(img)는 틀(.dg-service-visual-image)의 안쪽을 빈틈없이 채워야 한다.
// 틀의 테두리(양쪽 1px)를 감안해 너비·높이 차가 각각 4px 이하여야 하고, 문서가 가로로 넘치면 안 된다.
const IDS = ['ortho', 'data', 'consult', 'software', 'edu'] as const;
const WIDTHS = [1440, 1200, 1100, 1024, 981, 980, 768, 390];
const PAGES = ['/', '/services/'];
const TOLERANCE = 4;

test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '뷰포트를 직접 지정하므로 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

type Box = { id: string; frameW: number; frameH: number; imgW: number; imgH: number; fit: string; loaded: boolean };

/** 이미지를 모두 불러온 뒤 5개 카드의 틀과 img 크기를 잰다. */
async function measure(page: Page): Promise<{ boxes: Box[]; docScroll: number; inner: number }> {
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.dg-service-visual-image img'));
    imgs.forEach((img) => { img.loading = 'eager'; });
    await Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : new Promise<void>((resolve) => {
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
    }))));
  });
  return page.evaluate((ids) => {
    const boxes = ids.map((id) => {
      const frame = document.querySelector(`#${id} .dg-service-visual-image`) as HTMLElement;
      const img = frame.querySelector('img') as HTMLImageElement;
      const f = frame.getBoundingClientRect();
      const i = img.getBoundingClientRect();
      return { id, frameW: f.width, frameH: f.height, imgW: i.width, imgH: i.height, fit: getComputedStyle(img).objectFit, loaded: img.complete && img.naturalWidth > 0 };
    });
    return { boxes, docScroll: document.documentElement.scrollWidth, inner: innerWidth };
  }, [...IDS]);
}

for (const width of WIDTHS) {
  for (const path of PAGES) {
    test(`${path} ${width}px: 서비스 카드 5개의 img 가 틀을 채우고 가로 넘침이 없다`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });
      const { boxes, docScroll, inner } = await measure(page);
      const table = boxes.map((b) => `${b.id}: 틀 ${b.frameW.toFixed(1)}x${b.frameH.toFixed(1)} img ${b.imgW.toFixed(1)}x${b.imgH.toFixed(1)} 차 ${(b.frameW - b.imgW).toFixed(1)}x${(b.frameH - b.imgH).toFixed(1)} ${b.fit}`);
      info.annotations.push({ type: 'measure', description: `${path} ${width}: ${table.join(' | ')} | doc=${docScroll}/${inner}` });
      console.log(`MEASURE ${path} ${width} :: ${table.join(' | ')} | doc=${docScroll}/${inner}`);
      for (const b of boxes) {
        expect(b.loaded, `#${b.id} 이미지 로드 완료`).toBe(true);
        expect(b.frameW, `#${b.id} 틀 너비 > 0`).toBeGreaterThan(0);
        expect.soft(b.frameW - b.imgW, `#${b.id} 틀·img 너비 차 ≤ ${TOLERANCE}px`).toBeLessThanOrEqual(TOLERANCE);
        expect.soft(b.frameH - b.imgH, `#${b.id} 틀·img 높이 차 ≤ ${TOLERANCE}px`).toBeLessThanOrEqual(TOLERANCE);
        expect.soft(b.fit, `#${b.id} object-fit: cover`).toBe('cover');
      }
      expect(docScroll, '문서 가로 넘침 없음').toBe(inner);
    });
  }
}
