import { expect, test, type Page } from '@playwright/test';
import { THEMES, openThemed } from './floating-geometry';
import { isolateExternalServices } from './helpers';

/**
 * W08 — 장 알약을 헤더 안으로 옮긴 뒤에도 좁은 화면(320px 까지)의 헤더가 두 줄(로고 줄 + AUTO 줄)을 지킨다.
 * ① 테마·메뉴 버튼이 한 줄 ② AUTO 줄이 헤더 밖으로 밀리지 않음 ③ 알약이 헤더 안에 보이고 다른 요소와 겹치지 않음
 * ④ 누르는 버튼은 44×44 이상.
 */
const WIDTHS = [300, 320, 331, 332, 360];
type Box = { left: number; top: number; right: number; bottom: number; width: number; height: number };

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', '폭을 테스트가 직접 정하므로 한 프로젝트에서만 돈다.');
  await isolateExternalServices(page);
});

/** 헤더와 그 안 요소들의 사각형(뷰포트 기준 CSS px, 소수 첫째 자리). */
async function measureHeader(page: Page): Promise<Record<string, Box>> {
  return page.evaluate(() => {
    const header = document.querySelector('.story-header')!;
    const named: Record<string, Element | null> = {
      header, pill: header.querySelector('.story-mobile-chapter') ?? document.querySelector('.story-mobile-chapter'),
      로고: header.querySelector('.story-brand'), 테마: header.querySelector('.story-theme'), 메뉴: header.querySelector('.story-mobile-toggle'),
      auto: header.querySelector('.story-auto'), AUTO: header.querySelector('.story-auto-label'), 반복: header.querySelector('.story-repeat'),
    };
    header.querySelectorAll('.story-auto button:not(.story-auto-label):not(.story-repeat)').forEach((button) => { named[button.textContent ?? ''] = button; });
    const round = (value: number) => Math.round(value * 10) / 10;
    return Object.fromEntries(Object.entries(named).map(([name, el]) => {
      const box = el?.getBoundingClientRect();
      return [name, { left: round(box?.left ?? 0), top: round(box?.top ?? 0), right: round(box?.right ?? 0), bottom: round(box?.bottom ?? 0), width: round(box?.width ?? 0), height: round(box?.height ?? 0) }];
    }));
  });
}

for (const theme of THEMES) for (const width of WIDTHS) {
  test(`좁은 화면에서도 헤더가 두 줄을 지킨다 — ${width}px ${theme}`, async ({ page }) => {
    await openThemed(page, '/', theme, width);
    await page.getByRole('button', { name: '자동 스크롤 끄기' }).click();
    // 맨 위("01 / 06 시작")와 알약 글자가 가장 긴 장("05 / 06 프로세스") 두 곳에서 잰다.
    for (const chapter of ['start', 'process']) {
      if (chapter !== 'start') {
        await page.evaluate((id) => window.scrollTo({ top: document.querySelector(`#${id}`)!.getBoundingClientRect().top + window.scrollY + 300, behavior: 'instant' }), chapter);
        await expect(page.locator('.story-mobile-chapter')).toContainText('05 / 06');
      }
      const box = await measureHeader(page);
      const at = `${width}px ${theme} ${chapter}`;
      console.log(`[W08-N] ${at} · 테마 top ${box.테마.top} 메뉴 top ${box.메뉴.top} · auto 아랫변 ${box.auto.bottom} / 헤더 아랫변 ${box.header.bottom} · 알약 ${box.pill.left},${box.pill.top} ${box.pill.width}×${box.pill.height}`);
      expect(box.메뉴.top, `① 테마·메뉴 버튼이 한 줄 (${at})`).toBe(box.테마.top);
      expect(box.auto.bottom, `② AUTO 줄이 헤더 안 (${at})`).toBeLessThanOrEqual(box.header.bottom);
      expect(Math.min(box.pill.width, box.pill.height), `③ 알약이 보인다 (${at})`).toBeGreaterThan(0);
      expect(box.pill.left >= box.header.left && box.pill.right <= box.header.right && box.pill.top >= box.header.top && box.pill.bottom <= box.header.bottom, `③ 알약이 헤더 안 (${at}) ${JSON.stringify(box.pill)}`).toBe(true);
      const controls = Object.keys(box).filter((name) => !['header', 'pill', 'auto'].includes(name));
      const touching = controls.filter((name) => box[name].left < box.pill.right && box[name].right > box.pill.left && box[name].top < box.pill.bottom && box[name].bottom > box.pill.top);
      expect(touching, `③ 알약과 겹친 요소 (${at})`).toEqual([]);
      const small = controls.filter((name) => !['로고', 'AUTO'].includes(name) && (box[name].width < 44 || box[name].height < 44)).map((name) => `${name} ${box[name].width}×${box[name].height}`);
      expect(controls.length, `헤더 버튼을 모두 찾았다 (${at}): ${controls.join(',')}`).toBe(9);
      expect(small, `④ 44×44 보다 작은 버튼 (${at})`).toEqual([]);
    }
  });
}
