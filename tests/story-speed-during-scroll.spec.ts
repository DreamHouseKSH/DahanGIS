import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

// 목차 링크를 누른 "직후"(이동이 아직 진행 중)에 2x 를 실제로 눌러도 2초 안에 재생이 시작되고 계속 내려가야 한다.
// 반대로 재생 중 사용자의 휠·터치·키 입력은 지금처럼 재생을 멈춰야 한다(회귀 방지).
const controls = (page: Page) => page.locator('[data-auto-controls]');
const speedButton = (page: Page) => page.getByRole('button', { name: '자동 스크롤 2배속', exact: true });
const DELAYS = [0, 100, 300];

// 목차(.story-rail)와 휠·키보드는 데스크톱 입력이므로 데스크톱 프로젝트에서만 돌린다.
test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '목차·휠·키보드 흐름은 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

for (const delay of DELAYS) {
  test(`목차 링크 클릭 ${delay}ms 뒤 2x 를 누르면 2초 안에 running 이고 1초 동안 scrollY 가 계속 늘어난다`, async ({ page }, info) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('.story-rail a[href="#services"]').click();
    if (delay) await page.waitForTimeout(delay);
    const atClick = await page.evaluate(() => scrollY);
    await speedButton(page).click();
    const t0 = Date.now();
    let reached = '';
    try {
      await expect(controls(page), `목차 클릭 ${delay}ms 뒤: 2x 클릭 뒤 2초 안에 running`).toHaveAttribute('data-state', 'running', { timeout: 2000 });
    } finally {
      reached = (await controls(page).getAttribute('data-state')) ?? '';
    }
    const started = Date.now() - t0;
    // 1초 동안 250ms 간격으로 표본을 뽑아 매번 늘었는지 본다(한 번 멈췄다 다시 가는 경우도 잡는다).
    const samples: number[] = [await page.evaluate(() => scrollY)];
    for (let i = 0; i < 4; i += 1) {
      await page.waitForTimeout(250);
      samples.push(await page.evaluate(() => scrollY));
    }
    const line = `목차 ${delay}ms: 클릭 시점 scrollY=${atClick.toFixed(0)}, running까지 ${started}ms(state=${reached}), 표본 ${samples.map((v) => v.toFixed(1)).join('→')}`;
    info.annotations.push({ type: 'measure', description: line });
    console.log(`MEASURE B ${line}`);
    for (let i = 1; i < samples.length; i += 1) {
      expect(samples[i], `${line}: ${i}번째 구간에서 scrollY 증가`).toBeGreaterThan(samples[i - 1]);
    }
    await expect(controls(page)).toHaveAttribute('data-state', 'running');
  });
}

/** 재생을 시작해 running 이 되고 실제로 내려가는 것까지 확인한다. */
async function startPlayback(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  await speedButton(page).click();
  await expect(controls(page)).toHaveAttribute('data-state', 'running');
  const y0 = await page.evaluate(() => scrollY);
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => scrollY), '재생 중 scrollY 증가').toBeGreaterThan(y0);
}

const INTERRUPTS: Record<string, (page: Page) => Promise<void>> = {
  '마우스 휠': async (page) => { await page.mouse.move(700, 500); await page.mouse.wheel(0, 400); },
  '키보드 PageDown': async (page) => { await page.keyboard.press('PageDown'); },
  '터치 시작': async (page) => { await page.evaluate(() => window.dispatchEvent(new Event('touchstart'))); },
};

for (const [name, interrupt] of Object.entries(INTERRUPTS)) {
  test(`재생 중 ${name} 입력은 재생을 멈춘다(회귀 방지)`, async ({ page }) => {
    await startPlayback(page);
    await interrupt(page);
    await expect(controls(page), `${name} 뒤 running 이 아니어야 함`).not.toHaveAttribute('data-state', 'running', { timeout: 1500 });
    // 멈춘 뒤에는 스스로 다시 내려가지 않는다.
    await page.waitForTimeout(600);
    const y0 = await page.evaluate(() => scrollY);
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => scrollY), `${name} 뒤 자동으로 계속 내려가지 않음`).toBeLessThanOrEqual(y0 + 1);
  });
}
// 스크롤바 끌기는 헤드리스 Chromium 에서 재현할 수 없어(오버레이 스크롤바) 이 파일에서는 다루지 않는다.
