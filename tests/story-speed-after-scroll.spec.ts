import { test, expect, type Page } from '@playwright/test';
import { isolateExternalServices } from './helpers';

// 스크롤 이동(휠·목차 클릭·PageDown)이 멈춘 직후 속도 버튼을 실제로 눌러도 재생이 시작돼야 한다.
const controls = (page: Page) => page.locator('[data-auto-controls]');
const speedButton = (page: Page) => page.getByRole('button', { name: '자동 스크롤 2배속', exact: true });
const DELAYS = [100, 500, 1000];

// 휠·PageDown 은 데스크톱 입력이므로 데스크톱 프로젝트에서만 돌린다.
test.beforeEach(async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop-chromium', '휠·키보드 흐름은 데스크톱 프로젝트에서만 실행');
  await isolateExternalServices(page);
});

/** scrollY 가 연속 10프레임 변하지 않을 때까지 폴링한다. */
async function settle(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => {
    let last = -1, still = 0;
    const tick = () => { still = scrollY === last ? still + 1 : 0; last = scrollY; if (still >= 10) resolve(); else requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }));
}

const FLOWS: Record<string, (page: Page) => Promise<void>> = {
  '(가) 마우스 휠': async (page) => {
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, 1500);
    await settle(page);
  },
  '(나) 왼쪽 목차 링크': async (page) => {
    await page.locator('.story-rail a[href="#services"]').click();
    await settle(page);
  },
  '(다) 키보드 PageDown': async (page) => {
    await page.locator('body').click({ position: { x: 5, y: 300 } });
    await page.keyboard.press('PageDown');
    await settle(page);
  },
};

for (const [flow, move] of Object.entries(FLOWS)) {
  for (const delay of DELAYS) {
    test(`${flow} 이동이 멈춘 ${delay}ms 뒤 2x 를 누르면 1초 안에 running 이고 계속 내려간다`, async ({ page }, info) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await move(page);
      const arrived = await page.evaluate(() => scrollY);
      expect(arrived, '이동 후 맨 위가 아님').toBeGreaterThan(100);
      await page.waitForTimeout(delay);
      await speedButton(page).click();
      const t0 = Date.now();
      await expect(controls(page), `${flow} ${delay}ms: 클릭 뒤 1초 안에 running`).toHaveAttribute('data-state', 'running', { timeout: 1000 });
      const started = Date.now() - t0;
      const y0 = await page.evaluate(() => scrollY);
      await page.waitForTimeout(1000);
      const y1 = await page.evaluate(() => scrollY);
      info.annotations.push({ type: 'measure', description: `${flow} ${delay}ms: running까지 ${started}ms, 1초간 scrollY ${y0.toFixed(1)}→${y1.toFixed(1)}` });
      console.log(`MEASURE D ${flow} ${delay}ms: running까지 ${started}ms, 1초간 scrollY ${y0.toFixed(1)}→${y1.toFixed(1)}`);
      expect(y1, `${flow} ${delay}ms: 그 뒤 1초 동안 scrollY 증가`).toBeGreaterThan(y0);
      await expect(controls(page)).toHaveAttribute('data-state', 'running');
    });
  }
}

// 관측 재현용: 스크립트 scrollTo 흐름(실제 사용자 입력이 아니므로 완료 정의 밖, 수치만 남긴다).
for (const behavior of ['instant', 'smooth'] as const) {
  for (const delay of [0, 100, 500, 1000]) {
    test(`[관측] scrollTo(${behavior}) 호출 ${delay}ms 뒤 2x 클릭`, async ({ page }, info) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.evaluate((b) => scrollTo({ top: 1800, behavior: b }), behavior);
      await page.waitForTimeout(delay);
      const at = await page.evaluate(() => scrollY);
      await speedButton(page).click();
      await page.waitForTimeout(1000);
      const state = await controls(page).getAttribute('data-state');
      const y0 = await page.evaluate(() => scrollY);
      await page.waitForTimeout(1000);
      const y1 = await page.evaluate(() => scrollY);
      const line = `scrollTo(${behavior}) ${delay}ms: 클릭 시점 scrollY=${at.toFixed(0)}, 1초 뒤 state=${state}, scrollY ${y0.toFixed(1)}→${y1.toFixed(1)}`;
      info.annotations.push({ type: 'measure', description: line });
      console.log(`MEASURE D관측 ${line}`);
      // 부드러운 스크롤이 아직 진행 중일 때 누른 경우는 완료 정의 밖 — 관측만 남기고 도착한 뒤에 누른 경우만 단언한다.
      if (at >= 1799) expect(state, line).toBe('running');
    });
  }
}
