import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

/**
 * 등장 효과([data-reveal])가 내용을 가린 채로 두지 않는지 본다.
 * 기준: 요소가 뷰포트와 겹친 뒤 2초 안에 opacity ≥ 0.99 가 되고, 그 뒤 다시 숨겨지지 않는다.
 */
const PAGES = ['/', '/services/'] as const;
const SIZES = [{ width: 1440, height: 900 }, { width: 1024, height: 900 }, { width: 981, height: 900 }, { width: 390, height: 844 }];
const SERVICE_IDS = ['ortho', 'data', 'consult', 'software', 'edu'];
const SHOWN = 0.99;
const LIMIT_MS = 2000;

type RevealApi = {
  violations: string[];
  settled: () => boolean;
  done: (index: number) => boolean;
  sawFade: (index: number) => boolean;
};
declare global { interface Window { __reveal: RevealApi } }

// 뷰포트를 테스트 안에서 직접 정하므로 데스크톱 프로젝트에서만 돌린다.
test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '뷰포트를 직접 지정하므로 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

/** 매 프레임 [data-reveal] 을 보고 "겹친 뒤 2초 안에 보이는가 · 다시 숨겨지는가"를 기록한다. */
function installMonitor({ shown, limit }: { shown: number; limit: number }) {
  type Rec = { t0: number; shownAt: number | null; late: boolean; hiddenAgain: boolean; fade: boolean };
  const records = new Map<Element, Rec>();
  const violations: string[] = [];
  const all = () => Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const label = (el: HTMLElement) => `${location.pathname} #${el.closest('[id]')?.id ?? '-'} ${el.tagName.toLowerCase()}.${el.className.replace(/\s+/g, '.')}`;
  const overlaps = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0.5 && r.top < innerHeight - 0.5;
  };
  const tick = () => {
    const now = performance.now();
    for (const el of all()) {
      let rec = records.get(el);
      if (!rec) {
        if (!overlaps(el)) continue;
        rec = { t0: now, shownAt: null, late: false, hiddenAgain: false, fade: false };
        records.set(el, rec);
      }
      const opacity = Number(getComputedStyle(el).opacity);
      if (opacity > 0.01 && opacity < shown) rec.fade = true;
      if (rec.shownAt === null && opacity >= shown) rec.shownAt = now - rec.t0;
      if (rec.shownAt === null && !rec.late && now - rec.t0 > limit) {
        rec.late = true;
        const r = el.getBoundingClientRect();
        const inside = Math.round(Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
        violations.push(`${label(el)} — 겹친 뒤 ${limit}ms 지나도 opacity ${opacity} (보이는 높이 ${inside}px / 요소 ${Math.round(r.height)}px, 폭 ${innerWidth})`);
      }
      if (rec.shownAt !== null && !rec.hiddenAgain && opacity < 0.5) {
        rec.hiddenAgain = true;
        violations.push(`${label(el)} — 보인 뒤 다시 숨겨짐(opacity ${opacity}, 폭 ${innerWidth})`);
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const finished = (el: HTMLElement) => { const rec = records.get(el); return Boolean(rec && (rec.shownAt !== null || rec.late)); };
  window.__reveal = {
    violations,
    settled: () => all().every((el) => !overlaps(el) || finished(el)),
    done: (index) => finished(all()[index]),
    sawFade: (index) => Boolean(records.get(all()[index])?.fade),
  };
}

const opacities = (page: Page) => page.evaluate(() => Array.from(document.querySelectorAll('[data-reveal]'), (el) => Number(getComputedStyle(el).opacity)));
const lastOpacity = async (page: Page) => (await opacities(page)).at(-1);
const violations = (page: Page) => page.evaluate(() => window.__reveal.violations);
const settled = (page: Page) => page.waitForFunction(() => window.__reveal.settled(), undefined, { timeout: LIMIT_MS + 3000 });

/** 페이지를 열고, 등장 효과가 준비돼(화면 밖 요소가 숨겨져) 있는 상태에서 감시를 시작한다. */
async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'networkidle' });
  if (path === '/') {
    // 30초 무조작 자동 스크롤이 측정 위치를 흔들지 않게 끈다.
    await page.getByRole('button', { name: '자동 스크롤 끄기', exact: true }).click();
    await expect(page.locator('[data-auto-controls]')).toHaveAttribute('data-state', 'off');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }
  await expect.poll(() => lastOpacity(page), { message: '화면에 들어오기 전에는 숨겨져 있어야 한다' }).toBeLessThan(0.01);
  await page.evaluate(installMonitor, { shown: SHOWN, limit: LIMIT_MS });
}

async function scrollStill(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => {
    let last = -1, still = 0;
    const tick = () => {
      still = scrollY === last ? still + 1 : 0; last = scrollY;
      if (still >= 10) resolve(); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
}

async function enterByWheel(page: Page) {
  await page.mouse.move(300, 400);
  let last = -1, still = 0;
  while (still < 8) {
    await page.mouse.wheel(0, 160);
    await page.waitForTimeout(50);
    const y = await page.evaluate(() => Math.round(scrollY));
    still = y === last ? still + 1 : 0; last = y;
  }
}

async function enterByLinks(page: Page, path: string, width: number) {
  const narrow = width <= 980;
  if (path === '/') {
    if (narrow) {
      await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
      await page.locator('#story-mobile-menu a[href="#services"]').click();
    } else await page.locator('.story-rail a[href="#services"]').click();
    await scrollStill(page); await settled(page);
  }
  const menu = path === '/' ? (narrow ? '.story-mobile-services' : '.story-rail') : '.dg-service-nav';
  for (const id of SERVICE_IDS) {
    await page.locator(`${menu} a[href="#${id}"]`).click();
    await scrollStill(page); await settled(page);
  }
}

async function enterByJump(page: Page) {
  const count = await page.locator('[data-reveal]').count();
  for (let index = 0; index < count; index += 1) {
    await page.evaluate((i) => document.querySelectorAll('[data-reveal]')[i].scrollIntoView({ block: 'center', behavior: 'instant' }), index);
    await settled(page);
  }
}

for (const size of SIZES) {
  test.describe(`${size.width}x${size.height}`, () => {
    test.use({ viewport: size });
    for (const path of PAGES) {
      test(`${path} 휠 스크롤로 들어온 요소는 2초 안에 보인다`, async ({ page }) => {
        test.setTimeout(120_000);
        await open(page, path);
        await enterByWheel(page); await settled(page);
        expect(await violations(page)).toEqual([]);
      });

      test(`${path} 목차·메뉴 링크로 들어온 요소는 2초 안에 보인다`, async ({ page }) => {
        test.setTimeout(90_000);
        await open(page, path);
        await enterByLinks(page, path, size.width);
        expect(await violations(page)).toEqual([]);
      });

      test(`${path} scrollIntoView 즉시 이동으로 들어온 요소는 2초 안에 보인다`, async ({ page }) => {
        test.setTimeout(150_000);
        await open(page, path);
        await enterByJump(page);
        expect(await violations(page)).toEqual([]);
        expect((await opacities(page)).filter((value) => value < SHOWN), '끝까지 훑은 뒤 숨겨진 요소 수').toEqual([]);
      });
    }
  });
}

// 원인 고정: 요소가 화면 아래 가장자리에 조금만 걸쳐도(겹침 6px) 내용이 보여야 한다.
for (const size of [SIZES[0], SIZES[3]]) {
  for (const path of PAGES) {
    test(`${path} ${size.width}폭 — 가장자리에 6px 만 걸친 요소도 2초 안에 보인다`, async ({ page }) => {
      test.setTimeout(150_000);
      await page.setViewportSize(size);
      await open(page, path);
      const count = await page.locator('[data-reveal]').count();
      for (let index = 0; index < count; index += 1) {
        await page.evaluate((i) => {
          const top = document.querySelectorAll('[data-reveal]')[i].getBoundingClientRect().top;
          if (top > innerHeight - 6) window.scrollTo({ top: scrollY + top - innerHeight + 6, behavior: 'instant' });
        }, index);
        await page.waitForFunction((i) => window.__reveal.done(i), index, { timeout: LIMIT_MS + 3000 });
        if ((await violations(page)).length >= 3) break; // 실패가 분명하면 일찍 끝낸다
      }
      expect(await violations(page)).toEqual([]);
    });
  }
}

test.describe('등장 효과 보존', () => {
  test.use({ viewport: SIZES[0] });

  test('들어오기 전에는 숨겨져 있다가 들어오면 서서히 나타난다', async ({ page }) => {
    await open(page, '/services/'); // open() 이 "들어오기 전 숨김"을 단언한다
    const last = (await page.locator('[data-reveal]').count()) - 1;
    await page.locator('[data-reveal]').last().evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForFunction((i) => window.__reveal.done(i), last);
    expect(await page.evaluate((i) => window.__reveal.sawFade(i), last), '중간 opacity 를 거쳐 나타난다').toBe(true);
    expect(await lastOpacity(page)).toBeGreaterThanOrEqual(SHOWN);
    expect(await violations(page)).toEqual([]);
  });

  for (const path of PAGES) {
    test(`${path} prefers-reduced-motion 에서는 기다림 없이 전부 보인다`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path, { waitUntil: 'networkidle' });
      expect((await opacities(page)).filter((value) => value < SHOWN)).toEqual([]);
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      expect((await opacities(page)).filter((value) => value < SHOWN)).toEqual([]);
    });

    test(`${path} JS 가 꺼져 있어도 내용이 전부 보인다`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: SIZES[0] });
      const page = await context.newPage(); await isolateExternalServices(page);
      await page.goto(`http://127.0.0.1:4173${path}`);
      const values = await page.locator('[data-reveal]').evaluateAll((nodes) => nodes.map((el) => getComputedStyle(el).opacity));
      expect(values.length).toBeGreaterThan(0);
      expect(values.filter((value) => value !== '1')).toEqual([]);
      await context.close();
    });

    test(`${path} 스크립트가 도착하지 않아도(늦게 실행돼도) 내용이 전부 보인다`, async ({ page }) => {
      await page.route('**/_next/static/**/*.js', (route) => route.abort());
      await page.goto(path, { waitUntil: 'load' });
      await page.waitForTimeout(1000);
      expect((await opacities(page)).length).toBeGreaterThan(0);
      expect((await opacities(page)).filter((value) => value < SHOWN)).toEqual([]);
    });
  }
});
