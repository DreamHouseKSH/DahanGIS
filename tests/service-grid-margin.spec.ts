import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

const IDS = ['ortho', 'data', 'consult', 'software', 'edu'] as const;
const CROSSED = new Set<string>(['data', 'software']);
const WIDTHS = [981, 1024, 1100, 1200, 1440];
const PAGES = ['/', '/services/'];

test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '뷰포트를 직접 지정하므로 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

type Row = { id: string; gridRight: number; colRight: number; textRight: number; textMargin: number; colScroll: number; colClient: number };

/** 서비스 섹션마다 그리드·글 열·실제 글자 오른쪽 끝을 잰다. */
async function measure(page: Page): Promise<{ rows: Row[]; docScroll: number; inner: number }> {
  return page.evaluate((ids) => {
    const rows = ids.map((id) => {
      const section = document.querySelector(`#${id}`)!;
      const grid = section.querySelector('.dg-detail-grid')!;
      const col = grid.querySelector(':scope > div:first-child') as HTMLElement;
      let textRight = 0;
      const walker = document.createTreeWalker(col, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of Array.from(range.getClientRects())) if (rect.width > 0) textRight = Math.max(textRight, rect.right);
      }
      return {
        id, gridRight: grid.getBoundingClientRect().right, colRight: col.getBoundingClientRect().right,
        textRight, textMargin: innerWidth - textRight, colScroll: col.scrollWidth, colClient: col.clientWidth,
      };
    });
    return { rows, docScroll: document.documentElement.scrollWidth, inner: innerWidth };
  }, [...IDS]);
}

for (const width of WIDTHS) {
  for (const path of PAGES) {
    test(`${path} ${width}px: 교차 배치 서비스 오른쪽 여백이 나머지 이상이고 잘림·가로 넘침이 없다`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });
      const { rows, docScroll, inner } = await measure(page);
      const table = rows.map((r) => `${r.id}: 그리드우=${r.gridRight.toFixed(1)} 글열우=${r.colRight.toFixed(1)} 글자끝=${r.textRight.toFixed(1)} 여백=${r.textMargin.toFixed(1)} scrollW/clientW=${r.colScroll}/${r.colClient}`);
      info.annotations.push({ type: 'measure', description: `${path} ${width}: ${table.join(' | ')} | doc=${docScroll}/${inner}` });
      console.log(`MEASURE ${path} ${width} :: ${table.join(' | ')} | doc=${docScroll}/${inner}`);
      const plain = rows.filter((r) => !CROSSED.has(r.id));
      // 기준: 같은 폭 ortho·consult·edu 그리드 오른쪽 여백(= innerWidth − 그리드 오른쪽 끝)
      const baseline = Math.min(...plain.map((r) => inner - r.gridRight));
      for (const row of rows.filter((r) => CROSSED.has(r.id))) {
        expect(row.textMargin, `#${row.id} 글자 오른쪽 여백 ≥ 24px`).toBeGreaterThanOrEqual(24);
        expect(row.textMargin, `#${row.id} 글자 오른쪽 여백 ≥ 일반 그리드 여백(${baseline.toFixed(1)}px)−1`).toBeGreaterThanOrEqual(baseline - 1);
      }
      for (const row of rows) expect(row.colScroll, `#${row.id} 글 열 잘림 없음`).toBeLessThanOrEqual(row.colClient);
      expect(docScroll, '문서 가로 넘침 없음').toBe(inner);
    });
  }
}
