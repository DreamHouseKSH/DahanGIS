import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

const controls = (page: Page) => page.locator('[data-auto-controls]');
const repeat = (page: Page) => page.getByRole('button', { name: '자동 스크롤 반복', exact: true });
const off = (page: Page) => page.getByRole('button', { name: '자동 스크롤 끄기', exact: true });
const half = (page: Page) => page.getByRole('button', { name: '자동 스크롤 0.5배속', exact: true });
const fast = (page: Page) => page.getByRole('button', { name: '자동 스크롤 2배속', exact: true });
async function openClock(page: Page) {
  await page.clock.install();
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(repeat(page)).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(() => Date.now()) + 100));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
}
async function nearEnd(page: Page) {
  const boundary = await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top + scrollY - innerHeight * .2);
  await page.evaluate((top) => scrollTo({ top: top - 20, behavior: 'instant' }), boundary);
  await page.clock.runFor(100);
  await fast(page).click();
  await page.clock.runFor(1000);
  return boundary;
}
async function waiting(page: Page) {
  const boundary = await nearEnd(page);
  await expect(controls(page)).toHaveAttribute('data-state', 'repeat-wait');
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
  return boundary;
}
test.beforeEach(async ({ page }) => { await isolateExternalServices(page); });

test('repeat defaults ON, is keyboard/touch operable, and resets ON on reload', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(repeat(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  if (isMobile) await repeat(page).tap(); else await repeat(page).click();
  await expect(repeat(page)).toHaveAttribute('aria-pressed', 'false');
  await repeat(page).focus(); await page.keyboard.press('Enter');
  await expect(repeat(page)).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Space'); await expect(repeat(page)).toHaveAttribute('aria-pressed', 'false');
  await page.reload({ waitUntil: 'networkidle' });
  await expect(repeat(page)).toHaveAttribute('aria-pressed', 'true');
});

test('guided completion visibly counts down, returns to the top and resumes at 0.5x', async ({ page }, info) => {
  await openClock(page);
  const boundary = await waiting(page);
  await expect(page.locator('.story-auto-label small')).toContainText('초 후 처음');
  await page.screenshot({ path: info.outputPath('repeat-countdown.png') });
  // Less than 5 seconds since arrival: must not return yet.
  await page.clock.runFor(3000);
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
  await expect(controls(page)).toHaveAttribute('data-state', 'repeat-wait');
  await page.clock.runFor(2200);
  await expect(controls(page)).toHaveAttribute('data-state', 'running');
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => scrollY)).toBeLessThan(60);
  await expect(page.locator('.story-rail a[href="#start"]')).toHaveAttribute('aria-current', 'location');
  await page.clock.runFor(1500);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(25);
});

test('turning repeat off preserves current speed and stops permanently at the boundary', async ({ page }) => {
  await openClock(page); await repeat(page).click();
  const boundary = await nearEnd(page);
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
  await page.clock.runFor(60_000);
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
});

test('Off cancels a pending return and repeat preference cannot override Off', async ({ page }) => {
  await openClock(page); await waiting(page); await off(page).click();
  const stopped = await page.evaluate(() => scrollY);
  await repeat(page).click(); await repeat(page).click();
  await page.clock.runFor(60_000);
  await expect(controls(page)).toHaveAttribute('data-state', 'off');
  expect(await page.evaluate(() => scrollY)).toBe(stopped);
});

for (const event of ['wheel', 'pointermove', 'keydown', 'blur', 'visibility']) {
  test(`${event} cancels a pending repeat without returning later`, async ({ page }) => {
    await openClock(page); await waiting(page);
    const stopped = await page.evaluate(() => scrollY);
    await page.evaluate((kind) => {
      if (kind === 'visibility') { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); }
      else if (kind === 'keydown') window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      else window.dispatchEvent(new Event(kind));
    }, event);
    await page.clock.runFor(60_000);
    if (event === 'blur') await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    if (event === 'visibility') await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); });
    await page.clock.runFor(30_000);
    expect(await page.evaluate(() => scrollY)).toBe(stopped);
    await expect(controls(page)).not.toHaveAttribute('data-state', 'repeat-wait');
  });
}

test('writing an enquiry cancels repeat and preserves unsent input', async ({ page }) => {
  await openClock(page);
  const boundary = await waiting(page);
  const form = page.locator('#contact form.dg-form');
  await form.getByRole('button', { name: '정밀 정사영상', exact: true }).click();
  await form.getByRole('button', { name: /다음/ }).click();
  await form.getByRole('button', { name: /다음/ }).click();
  const input = form.getByLabel('요청 내용', { exact: false });
  await input.fill('아직 보내지 않은 문의입니다.');
  await expect(input).toBeFocused();
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
  await expect(controls(page)).toHaveAttribute('data-repeat-remaining', '0');
  // Drain scheduled callbacks. Native focus/scroll anchoring may still adjust
  // the viewport: measure script-driven movement separately from the browser.
  await page.clock.runFor(1000);
  await page.evaluate(() => {
    const observed = window as typeof window & { __repeatTestScrollCalls: number };
    observed.__repeatTestScrollCalls = 0;
    const nativeScroll = window.scrollTo.bind(window);
    window.scrollTo = (optionsOrX?: number | ScrollToOptions, y?: number) => {
      observed.__repeatTestScrollCalls += 1;
      if (typeof optionsOrX === 'number') nativeScroll(optionsOrX, y ?? 0);
      else nativeScroll(optionsOrX);
    };
  });
  await page.clock.runFor(60_000);
  expect(await page.evaluate(() => (window as typeof window & { __repeatTestScrollCalls: number }).__repeatTestScrollCalls)).toBe(0);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(boundary - 3);
  await expect(page.locator('#contact')).toBeInViewport();
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
  await expect(controls(page)).toHaveAttribute('data-repeat-remaining', '0');
  await expect(input).toBeFocused();
  await expect(input).toHaveValue('아직 보내지 않은 문의입니다.');
});

test('manual contact arrival never starts a loop', async ({ page }) => {
  await openClock(page);
  await page.locator('#contact').evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
  await page.clock.runFor(100);
  const stopped = await page.evaluate(() => scrollY);
  await page.clock.runFor(60_000);
  expect(await page.evaluate(() => scrollY)).toBe(stopped);
  await expect(controls(page)).not.toHaveAttribute('data-state', 'repeat-wait');
});

test('reduced motion never triggers an automatic repeat after explicit playback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await openClock(page);
  const boundary = await nearEnd(page); await page.clock.runFor(60_000);
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
});

test('all six playback controls stay reachable on narrow and desktop screens', async ({ page }, info) => {
  await page.goto('/', { waitUntil: 'networkidle' }); await off(page).click();
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(controls(page).getByRole('button')).toHaveCount(6);
    const boxes = await controls(page).getByRole('button').evaluateAll((buttons) => buttons.map((button) => {
      const rect = button.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: rect.width, height: rect.height };
    }));
    for (const box of boxes) { expect(box.left).toBeGreaterThanOrEqual(0); expect(box.right).toBeLessThanOrEqual(width); expect(box.height).toBeGreaterThanOrEqual(44); }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    if (width === 320 || width === 1440) await page.screenshot({ path: info.outputPath(`repeat-controls-${width}.png`) });
  }
});
