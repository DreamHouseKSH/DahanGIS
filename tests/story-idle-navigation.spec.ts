import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';
import { pillars } from '../src/components/story/content';

const controls = (page: Page) => page.locator('[data-auto-controls]');
const off = (page: Page) => page.getByRole('button', { name: '자동 스크롤 끄기', exact: true });
const auto = (page: Page) => page.getByRole('button', { name: 'AUTO 자동 스크롤 시작', exact: true });
const half = (page: Page) => page.getByRole('button', { name: '자동 스크롤 0.5배속', exact: true });
async function openClock(page: Page) {
  // Install before navigation; production still uses the real 30,000 ms threshold.
  await page.clock.install();
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(auto(page)).toBeVisible();
  await page.clock.pauseAt(new Date(await page.evaluate(() => Date.now()) + 100));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
}
async function jump(page: Page, id: string) {
  await page.locator(`#${id}`).evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }));
}
test.beforeEach(async ({ page }) => { await isolateExternalServices(page); });

test('AUTO is a real button and starts immediately using click, touch and keyboard', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  if (isMobile) await auto(page).tap(); else await auto(page).click();
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(10);
  await off(page).click();
  for (const key of ['Enter', 'Space']) {
    await auto(page).focus(); await page.keyboard.press(key);
    await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
    await off(page).click();
  }
});

test('no idle movement before 30 seconds; then continuous 0.5x playback', async ({ page }) => {
  await openClock(page);
  const before = await page.evaluate(() => scrollY);
  await page.clock.runFor(29_999);
  await expect(controls(page)).toHaveAttribute('data-state', 'waiting');
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.clock.runFor(1);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  await page.clock.runFor(1500);
  const distance = await page.evaluate(() => scrollY) - before;
  expect(distance).toBeGreaterThan(25); expect(distance).toBeLessThan(45);
  await page.clock.runFor(1500);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(before + distance + 20);
});

test('pointer activity resets the deadline and stops running playback before rearming', async ({ page }) => {
  await openClock(page);
  await page.clock.runFor(20_000);
  await page.evaluate(() => document.body.dispatchEvent(new Event('pointermove', { bubbles: true })));
  await page.clock.runFor(29_999);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(1);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => document.body.dispatchEvent(new Event('pointermove', { bubbles: true })));
  await expect(controls(page)).toHaveAttribute('data-state', 'waiting');
  await page.clock.runFor(29_999);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(1);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
});

test('Off disables both movement and idle restart until AUTO is pressed', async ({ page }) => {
  await openClock(page); await off(page).click();
  const before = await page.evaluate(() => scrollY);
  await page.clock.runFor(60_000);
  await expect(controls(page)).toHaveAttribute('data-idle-enabled', 'false');
  await expect(controls(page)).toHaveAttribute('data-state', 'off');
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await auto(page).click(); await page.clock.runFor(1500);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(before + 20);
});

test('hidden tabs and blurred windows wait a fresh 30 seconds on return', async ({ page }) => {
  await openClock(page);
  for (const kind of ['visibility', 'blur']) {
    await page.evaluate((mode) => {
      if (mode === 'visibility') { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); }
      else window.dispatchEvent(new Event('blur'));
    }, kind);
    const before = await page.evaluate(() => scrollY);
    await page.clock.runFor(60_000);
    expect(await page.evaluate(() => scrollY)).toBe(before);
    await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
    await page.evaluate((mode) => {
      if (mode === 'visibility') { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); }
      else window.dispatchEvent(new Event('focus'));
    }, kind);
    await page.clock.runFor(29_999); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
    await page.clock.runFor(1); await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  }
});

test('holding a touch or pointer never counts as inactivity', async ({ page }) => {
  await openClock(page);
  await page.evaluate(() => document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })));
  await page.clock.runFor(60_000); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.evaluate(() => document.body.dispatchEvent(new Event('pointerup', { bubbles: true })));
  await page.clock.runFor(29_999); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(1); await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
});

test('focused inputs block idle playback even outside the inquiry boundary', async ({ page }) => {
  await openClock(page);
  await page.evaluate(() => {
    const input = document.createElement('input'); input.id = 'idle-fixture';
    document.querySelector('.story-hero-copy')?.append(input); input.focus({ preventScroll: true });
  });
  const before = await page.evaluate(() => scrollY);
  await page.clock.runFor(60_000);
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.evaluate(() => (document.activeElement as HTMLElement).blur());
  await page.clock.runFor(29_999); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(1); await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
});

test('reduced motion prevents unattended start, but an explicit speed remains available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await openClock(page);
  await page.clock.runFor(60_000); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await auto(page).click(); await page.clock.runFor(1500);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(20);
});

test('idle playback stops at contact and does not restart there', async ({ page }) => {
  await openClock(page);
  const boundary = await page.locator('#contact').evaluate((el) => el.getBoundingClientRect().top + scrollY - innerHeight * .2);
  await page.evaluate((y) => scrollTo({ top: y - 20, behavior: 'instant' }), boundary);
  await page.clock.runFor(100);
  await page.evaluate(() => window.dispatchEvent(new Event('wheel')));
  await page.clock.runFor(30_000); await page.clock.runFor(1500);
  await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
  const stopped = await page.evaluate(() => scrollY);
  await page.clock.runFor(60_000); expect(await page.evaluate(() => scrollY)).toBe(stopped);
  await expect(page.locator('.story-auto-status')).toContainText('문의 내용을 편하게 작성');
});

test('an open mobile menu suppresses idle playback until closed', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 900 }); await openClock(page);
  await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
  await page.clock.runFor(60_000); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: '메뉴 열기', exact: true })).toBeFocused();
  await page.clock.runFor(29_999); await expect(half(page)).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(1); await expect(half(page)).toHaveAttribute('aria-pressed', 'true');
});

test('services expand automatically, track all five subsections and collapse on exit', async ({ page, isMobile }, info) => {
  await page.goto('/', { waitUntil: 'networkidle' }); await off(page).click();
  const submenu = page.locator('#story-rail-services');
  await expect(submenu).toHaveJSProperty('hidden', true);
  await jump(page, 'services');
  await expect(submenu).toHaveJSProperty('hidden', false);
  await expect(submenu.locator('a')).toHaveCount(5);
  const nav = isMobile ? page.getByRole('navigation', { name: '서비스 빠른 이동', exact: true }) : submenu;
  await expect(nav).toBeVisible();
  for (const pillar of pillars) {
    await nav.locator(`a[href="#${pillar.id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/#${pillar.id}$`));
    await expect(nav.locator(`a[href="#${pillar.id}"]`)).toHaveAttribute('aria-current', 'location');
    await expect(submenu).toHaveJSProperty('hidden', false);
  }
  await page.screenshot({ path: info.outputPath('expanded-services.png') });
  await jump(page, 'why'); await expect(submenu).toHaveJSProperty('hidden', true);
  await expect(page.getByRole('navigation', { name: '서비스 빠른 이동', exact: true })).toBeHidden();
});

test('direct service hashes expand navigation; service anchors remain keyboard-operable', async ({ page, isMobile }) => {
  await page.goto('/#data', { waitUntil: 'networkidle' }); await off(page).click();
  const nav = isMobile ? page.locator('.story-mobile-services') : page.locator('#story-rail-services');
  await expect(nav).toBeVisible();
  await expect(nav.locator('a[href="#data"]')).toHaveAttribute('aria-current', 'location');
  const next = nav.locator('a[href="#consult"]'); await next.focus(); await page.keyboard.press('Enter');
  await expect(next).toHaveAttribute('aria-current', 'location');
});

test('expanded menus and AUTO remain reachable at 320px and short desktop heights', async ({ page }, info) => {
  await page.setViewportSize({ width: 1024, height: 600 });
  await page.goto('/#edu', { waitUntil: 'networkidle' }); await off(page).click();
  const rail = page.locator('.story-rail');
  await expect(rail.locator('a[href="#edu"]')).toHaveAttribute('aria-current', 'location');
  const box = await rail.boundingBox(); expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThan(84); expect(box!.y + box!.height).toBeLessThanOrEqual(600);
  await page.screenshot({ path: info.outputPath('short-desktop-services.png') });
  await page.setViewportSize({ width: 320, height: 740 });
  await expect(auto(page)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
  const quick = page.locator('.story-mobile-services'); await expect(quick).toBeVisible();
  await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
  const menu = page.locator('#story-mobile-menu'); await expect(menu.locator('.story-service-menu')).toBeVisible();
  await menu.locator('a[href="#edu"]').click();
  await expect(menu).toBeHidden(); await expect(quick.locator('a[href="#edu"]')).toHaveAttribute('aria-current', 'location');
  await page.screenshot({ path: info.outputPath('narrow-mobile-services.png') });
});
