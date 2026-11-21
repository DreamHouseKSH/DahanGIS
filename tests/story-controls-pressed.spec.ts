import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

// Off 의 눌림 표시(aria-pressed)와 색 강조는 속도 값이 아니라 "자동 시작이 꺼졌는가"를 따라야 한다.
const controls = (page: Page) => page.locator('[data-auto-controls]');
const button = (page: Page, name: string) => page.getByRole('button', { name, exact: true });
const OFF = '자동 스크롤 끄기';
const SPEEDS = { '0.5x': '자동 스크롤 0.5배속', '1x': '자동 스크롤 1배속', '2x': '자동 스크롤 2배속' } as const;

test.beforeEach(async ({ page }) => { await isolateExternalServices(page); });

async function pressed(page: Page) {
  const out: Record<string, string | null> = { Off: await button(page, OFF).getAttribute('aria-pressed') };
  for (const [label, name] of Object.entries(SPEEDS)) out[label] = await button(page, name).getAttribute('aria-pressed');
  return out;
}
const color = (page: Page, name: string) => button(page, name).evaluate((el) => {
  const s = getComputedStyle(el); return `${s.color}|${s.borderColor}|${s.backgroundColor}`;
});
const ALL_FALSE = { Off: 'false', '0.5x': 'false', '1x': 'false', '2x': 'false' };

test('연 직후(waiting): 자동 시작이 살아 있으면 Off 를 포함해 전부 aria-pressed=false 이고 색 강조가 없다', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(controls(page)).toHaveAttribute('data-state', 'waiting');
  await expect(controls(page)).toHaveAttribute('data-idle-enabled', 'true');
  expect(await pressed(page)).toEqual(ALL_FALSE);
  // 아무 것도 눌리지 않았으므로 Off 와 눌리지 않은 2x 의 색이 같아야 한다
  expect(await color(page, OFF), 'Off 색 = 눌리지 않은 버튼 색').toBe(await color(page, SPEEDS['2x']));
});

test('일시정지(paused): 자동 시작이 살아 있으면 전부 aria-pressed=false 이다', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await expect(controls(page)).toHaveAttribute('data-state', 'paused');
  await expect(controls(page)).toHaveAttribute('data-idle-enabled', 'true');
  expect(await pressed(page)).toEqual(ALL_FALSE);
  expect(await color(page, OFF), 'Off 색 = 눌리지 않은 버튼 색').toBe(await color(page, SPEEDS['2x']));
});

for (const [label, name] of Object.entries(SPEEDS)) {
  test(`재생 중(running) ${label}: 재생 중인 속도만 true 이고 Off 는 false`, async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await button(page, name).click();
    await expect(controls(page)).toHaveAttribute('data-state', 'running');
    expect(await pressed(page)).toEqual({ ...ALL_FALSE, [label]: 'true' });
    expect(await color(page, name), '재생 중인 속도는 강조').not.toBe(await color(page, OFF));
  });
}

test('Off 를 누른 뒤(off, idle-enabled=false): Off 만 aria-pressed=true 이고 색이 강조된다', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await button(page, OFF).click();
  await expect(controls(page)).toHaveAttribute('data-state', 'off');
  await expect(controls(page)).toHaveAttribute('data-idle-enabled', 'false');
  expect(await pressed(page)).toEqual({ ...ALL_FALSE, Off: 'true' });
  expect(await color(page, OFF), 'Off 눌림 색 강조(눌리지 않은 버튼과 달라야 함)').not.toBe(await color(page, SPEEDS['2x']));
});

test('Off 뒤 다른 속도를 누르면 Off 는 false 로 돌아오고 해당 속도만 true', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await button(page, OFF).click();
  await button(page, SPEEDS['1x']).click();
  await expect(controls(page)).toHaveAttribute('data-state', 'running');
  expect(await pressed(page)).toEqual({ ...ALL_FALSE, '1x': 'true' });
});

test('버튼 이름·제목은 바뀌지 않는다', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(button(page, OFF)).toHaveAttribute('title', '정지하고 30초 자동 시작과 반복 이동도 중단하기');
  await expect(button(page, SPEEDS['2x'])).toHaveAttribute('title', '2배속으로 시작');
});
