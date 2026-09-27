import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';
import { chapters } from '../src/components/story/content';

const off = (page: Page) => page.getByRole('button', { name: '자동 스크롤 끄기', exact: true });
const speed = (page: Page, rate = 1) => page.getByRole('button', { name: `자동 스크롤 ${rate}배속`, exact: true });
async function openStory(page: Page) { await page.goto('/', { waitUntil: 'networkidle' }); await expect(page.locator('.story-header')).toBeVisible(); }
test.beforeEach(async ({ page }) => { await isolateExternalServices(page); });

test('all six chapters and the complete service catalogue are in one document', async ({ page }) => {
  await openStory(page);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  for (const chapter of chapters) await expect(page.locator(`#${chapter.id}`)).toHaveCount(1);
  for (const id of ['ortho', 'data', 'consult', 'software', 'edu']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  expect(await page.locator('.story-catalogue table').count()).toBeGreaterThan(0);
  await expect(page.locator('#contact .dg-form')).toHaveCount(1);
  await expect(page.locator('.story-faq article')).toHaveCount(3);
  await expect(page.locator('.story-workflow > li')).toHaveCount(6);
});

test('guided scroll is opt-in and Off survives reload as the default', async ({ page }) => {
  await openStory(page); await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
  const before = await page.evaluate(() => scrollY);
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await speed(page).click(); await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 12);
  await page.reload({ waitUntil: 'networkidle' }); await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
});

test('the three rates really move at different speeds and Off cancels movement', async ({ page }) => {
  await openStory(page);
  const distances: number[] = [];
  for (const rate of [0.5, 1, 2]) {
    await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }));
    await speed(page, rate).click();
    const before = await page.evaluate(() => scrollY);
    await page.waitForTimeout(1100);
    await off(page).click();
    distances.push(await page.evaluate(() => scrollY) - before);
  }
  expect(distances[0]).toBeGreaterThan(10);
  expect(distances[1]).toBeGreaterThan(distances[0] * 1.4);
  expect(distances[2]).toBeGreaterThan(distances[1] * 1.4);
  const stopped = await page.evaluate(() => scrollY); await page.waitForTimeout(350);
  expect(await page.evaluate(() => scrollY)).toBe(stopped);
});

test('wheel, keyboard, touch, blur and hidden tabs stop without auto-resuming', async ({ page }) => {
  await openStory(page);
  for (const event of ['wheel', 'touchstart', 'blur', 'visibility']) {
    await speed(page).click(); await expect(speed(page)).toHaveAttribute('aria-pressed', 'true');
    await page.evaluate((name) => {
      if (name === 'visibility') {
        Object.defineProperty(document, 'hidden', { configurable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));
        Object.defineProperty(document, 'hidden', { configurable: true, value: false });
        document.dispatchEvent(new Event('visibilitychange'));
      } else window.dispatchEvent(new Event(name));
    }, event);
    await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
  }
  await speed(page).click(); await page.keyboard.press('Escape'); await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
});

test('chapter links update active location and connector without leaving the page', async ({ page, isMobile }) => {
  await openStory(page);
  for (const id of ['about', 'services', 'why', 'process', 'contact']) {
    if (isMobile) await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
    const nav = page.getByRole('navigation', { name: isMobile ? '모바일 구간 목차' : '스크롤 구간 목차', exact: true });
    await nav.locator(`a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expect(page.locator(`.story-rail a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location');
    await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
  }
  if (!isMobile) await expect(page.locator('.story-connector path')).toHaveAttribute('d', /^M .+ H .+ L /);
});

test('guided scroll stops exactly before the inquiry area', async ({ page }) => {
  await openStory(page);
  const boundary = await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top + scrollY - innerHeight * .2);
  await page.evaluate((position) => scrollTo({ top: position - 35, behavior: 'instant' }), boundary);
  await speed(page, 2).click();
  await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
  expect(Math.abs(await page.evaluate(() => scrollY) - boundary)).toBeLessThan(3);
  await expect(page.locator('.story-auto-status')).toContainText('문의 내용을 편하게 작성');
  await speed(page).click(); await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
});

test('embedded inquiry submits successfully without sending a real email', async ({ page }) => {
  let requests = 0;
  await page.route('https://api.web3forms.com/**', async (route) => { requests++; await route.fulfill({ json: { success: true } }); });
  await openStory(page);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const form = page.locator('#contact form.dg-form');
  await form.getByRole('button', { name: '정밀 정사영상', exact: true }).click();
  await form.getByRole('button', { name: /다음/ }).click(); await form.getByRole('button', { name: /다음/ }).click();
  await form.getByLabel('요청 내용', { exact: false }).fill('가상 검증 데이터: 실제 전송하지 않습니다.');
  await form.getByRole('button', { name: /다음/ }).click();
  await form.getByLabel('이름', { exact: false }).fill('테스트');
  await form.getByLabel('이메일', { exact: false }).fill('test@example.com');
  await form.getByLabel(/문의 답변을 위해/).check();
  await form.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.locator('#contact-success')).toBeVisible(); expect(requests).toBe(1);
});

test('reduced motion removes decorative displacement and never auto-starts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await openStory(page);
  await expect(page.locator('.story-tiles')).toHaveCSS('display', 'none');
  await expect(page.locator('.story-hero-image')).toHaveCSS('transform', 'none');
  await expect(off(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-reveal]').last()).toHaveCSS('opacity', '1');
});

test('all scenes fit desktop, tablet and narrow phones; retain review screenshots', async ({ page }, info) => {
  await openStory(page);
  for (const chapter of chapters) {
    await page.locator(`#${chapter.id}`).evaluate((element) => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 110, behavior: 'instant' }));
    const target = page.locator(`#${chapter.id} [data-story-target]`);
    await expect(target).toHaveCSS('opacity', '1');
    const widths = await page.evaluate(() => ({ full: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(widths.full, `overflow at ${chapter.id}`).toBeLessThanOrEqual(widths.viewport + 1);
    await page.screenshot({ path: info.outputPath(`story-${chapter.id}.png`) });
  }
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    await expect(off(page)).toBeVisible();
  }
});

test('JavaScript-disabled visitors can read every chapter and service specifications', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage(); await isolateExternalServices(page);
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('h1')).toContainText('공간을 읽고');
  for (const chapter of chapters) await expect(page.locator(`#${chapter.id}`)).toHaveCount(1);
  await expect(page.locator('#about-title')).toHaveCSS('opacity', '1');
  expect(await page.locator('.story-catalogue table').count()).toBeGreaterThan(0);
  await context.close();
});
