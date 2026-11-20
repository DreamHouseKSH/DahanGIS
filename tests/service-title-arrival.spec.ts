import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

const IDS = ['ortho', 'consult', 'data', 'software', 'edu'] as const;
const RIGHT_TITLE = new Set(['data', 'software']); // 제목 열이 시각물의 오른쪽에 오는 항목
const DESKTOP = [{ width: 1440, height: 900 }, { width: 1440, height: 700 }, { width: 981, height: 900 }];
const NARROW = [{ width: 390, height: 844 }, { width: 980, height: 900 }];
const PAGES = ['/', '/services/'];

// 뷰포트를 테스트 안에서 직접 정하므로 데스크톱 프로젝트에서만 돌린다.
test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '뷰포트를 직접 지정하므로 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

/** scrollY 가 연속 10프레임 변하지 않을 때까지 폴링한다(고정 sleep 없음). */
async function settle(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => {
    let last = -1, still = 0;
    const tick = () => {
      still = scrollY === last ? still + 1 : 0; last = scrollY;
      if (still >= 10) resolve(); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
}

async function titleTop(page: Page, id: string) {
  return page.evaluate((sid) => {
    const h2 = document.querySelector(`#${sid} .dg-section-title`)!.getBoundingClientRect();
    return { top: h2.top, inner: innerHeight };
  }, id);
}

async function expectTitleVisible(page: Page, id: string) {
  const { top, inner } = await titleTop(page, id);
  expect(top, `#${id} 제목 top`).toBeGreaterThanOrEqual(0);
  expect(top, `#${id} 제목 top ≤ innerHeight×0.6`).toBeLessThanOrEqual(inner * 0.6);
}

async function boxes(page: Page, id: string) {
  return page.evaluate((sid) => {
    const section = document.querySelector(`#${sid}`)!;
    const r = (el: Element | null) => { const b = el!.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, bottom: b.bottom }; };
    return {
      col: r(section.querySelector('.dg-detail-grid > div:first-child')),
      visual: r(section.querySelector('.dg-service-visual')),
      ext: r(section.querySelector('.dg-service-extended')),
    };
  }, id);
}

for (const size of DESKTOP) {
  test.describe(`${size.width}x${size.height}`, () => {
    test.use({ viewport: size });

    test('원페이지 목차 클릭 후 서비스 제목이 보인다 (완료정의 1)', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      const rail = page.locator('.story-rail');
      await rail.locator('a[href="#services"]').click();
      for (const id of IDS) {
        await rail.locator(`a[href="#${id}"]`).click();
        await settle(page);
        await expectTitleVisible(page, id);
      }
    });

    for (const path of PAGES) {
      test(`${path}#id 직접 접근 시 서비스 제목이 보인다 (완료정의 1·3)`, async ({ page }) => {
        for (const id of IDS) {
          await page.goto(`${path}#${id}`, { waitUntil: 'networkidle' });
          await settle(page);
          await expectTitleVisible(page, id);
        }
      });

      test(`${path} 교차 배치와 확장 블록 전폭 (완료정의 2·3)`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'networkidle' });
        for (const id of IDS) {
          const { col, visual, ext } = await boxes(page, id);
          if (RIGHT_TITLE.has(id)) expect(col.left, `#${id} 제목 열이 시각물 오른쪽`).toBeGreaterThan(visual.left);
          else expect(col.left, `#${id} 제목 열이 시각물 왼쪽`).toBeLessThan(visual.left);
          // 같은 줄: 그리드가 align-items:center 라 높이가 다른 두 열의 top 은 정상 배치에서도 어긋난다 → 세로 범위 겹침으로 판정
          expect(Math.min(col.bottom, visual.bottom) - Math.max(col.top, visual.top), `#${id} 같은 줄(세로 겹침)`).toBeGreaterThan(0);
          expect(ext.top, `#${id} 확장 블록은 아래`).toBeGreaterThanOrEqual(Math.max(col.bottom, visual.bottom) - 1);
          expect(ext.left, `#${id} 확장 전폭(좌)`).toBeLessThanOrEqual(Math.min(col.left, visual.left) + 2);
          expect(ext.right, `#${id} 확장 전폭(우)`).toBeGreaterThanOrEqual(Math.max(col.right, visual.right) - 2);
        }
      });
    }
  });
}

for (const size of NARROW) {
  test.describe(`${size.width}x${size.height}`, () => {
    test.use({ viewport: size });

    for (const path of PAGES) {
      test(`${path} 제목이 시각물보다 먼저(위) (완료정의 4)`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'networkidle' });
        for (const id of IDS) {
          const { col, visual } = await boxes(page, id);
          expect(col.top, `#${id} 제목 열이 시각물보다 위`).toBeLessThan(visual.top);
          expect(col.bottom, `#${id} 제목 열이 시각물과 겹치지 않음`).toBeLessThanOrEqual(visual.top + 1);
        }
      });
    }
  });
}
