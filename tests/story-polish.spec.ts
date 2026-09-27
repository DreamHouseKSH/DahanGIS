import { test, expect } from '@playwright/test';
import { isolateExternalServices } from './helpers';

test.beforeEach(async ({ page }) => { await isolateExternalServices(page); await page.goto('/', { waitUntil: 'networkidle' }); });

test('connector starts after the active label instead of crossing it', async ({ page, isMobile }) => {
  if (isMobile) { await expect(page.locator('.story-connector')).toBeHidden(); return; }
  for (const id of ['start', 'services', 'contact']) {
    await page.locator(`.story-rail a[href="#${id}"]`).click();
    await expect(page.locator(`.story-rail a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location');
    await expect.poll(async () => {
      const path = await page.locator('.story-connector path').getAttribute('d');
      const startX = Number(path?.split(' ')[1]);
      const right = await page.locator(`.story-rail a[href="#${id}"] > span:last-child`).evaluate((node) => node.getBoundingClientRect().right);
      return startX - right;
    }).toBeGreaterThanOrEqual(13);
  }
});

test('tabbing out of playback controls pauses the presentation', async ({ page }) => {
  const play = page.getByRole('button', { name: '자동 스크롤 1배속', exact: true });
  await play.click(); await expect(play).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '자동 스크롤 끄기', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
