import { test, expect } from '@playwright/test';
import { pageDefinitions, SITE_URL } from '../src/lib/site-metadata';
import { isolateExternalServices, navigate, reachContactDetails } from './helpers';

test.beforeEach(async ({ page }) => { await isolateExternalServices(page); });

test('client-side round trips reveal headings and newly inserted content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  for (const [label, path] of [['서비스', '/services/'], ['문의', '/contact/'], ['홈', '/'], ['서비스', '/services/']] as const) {
    await navigate(page, label);
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    const heading = page.locator('h1');
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toHaveCSS('opacity', '1');
    const content = page.locator('[data-reveal]').last();
    await content.scrollIntoViewIfNeeded();
    await expect(content).toHaveCSS('opacity', '1');
  }
});

test('Kakao SDK is initialized again after leaving and revisiting contact', async ({ page }) => {
  await page.goto('/contact/', { waitUntil: 'networkidle' });
  const map = page.locator('#dg-kakao-map');
  await expect(map).toHaveAttribute('data-status', 'ready');
  await expect(map).toHaveAttribute('data-mock-map-count', '1');
  await navigate(page, '서비스');
  await expect(page).toHaveURL(/\/services\/$/);
  await navigate(page, '문의');
  await expect(map).toHaveAttribute('data-status', 'ready');
  await expect(map).toHaveAttribute('data-mock-map-count', '2');
  await expect(map.locator('[data-mock-map]')).toHaveCount(1);
});

test('SDK failure keeps an accessible external map fallback', async ({ page }) => {
  await page.route('https://dapi.kakao.com/**', (route) => route.abort('failed'));
  await page.goto('/contact/', { waitUntil: 'networkidle' });
  await expect(page.locator('#dg-kakao-map')).toHaveAttribute('data-status', 'error');
  await expect(page.getByRole('link', { name: /카카오맵에서 열기/ })).toHaveAttribute('href', /^https:\/\/map\.kakao\.com\/link\/map\//);
  await expect(page.getByRole('status')).toContainText('지도를 불러오지 못했습니다.');
});

test('wizard enforces required steps and announces selected chips', async ({ page }) => {
  await page.goto('/contact/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /다음/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('서비스 유형');
  const service = page.getByRole('button', { name: '정밀 정사영상', exact: true });
  await service.click();
  await expect(service).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /다음/ }).click();
  await expect(page.getByRole('slider', { name: '예산 규모' })).toHaveAttribute('aria-valuetext', '미정 · 상담 후 결정');
  await page.getByLabel('대상 지역 / AOI').fill('테스트 지역');
  await page.getByLabel('대상 지역 / AOI').press('Enter');
  await expect(page.getByRole('heading', { name: '세부 내용을 알려주세요.' })).toBeFocused();
  await page.getByRole('button', { name: /다음/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('요청 내용');
  await expect(page.getByLabel('요청 내용', { exact: false })).toBeFocused();
});

test('final submission checks email, phone preference and consent', async ({ page }) => {
  let posts = 0;
  await page.route('https://api.web3forms.com/**', async (route) => { posts += 1; await route.fulfill({ json: { success: true } }); });
  await reachContactDetails(page);
  await page.getByLabel('이메일', { exact: false }).fill('not-an-email');
  await page.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('올바른 이메일');
  await page.getByLabel('이메일', { exact: false }).fill('review@example.com');
  await page.getByRole('button', { name: '전화', exact: true }).click();
  await page.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('전화 연락');
  await page.getByLabel('연락처', { exact: false }).fill('010-0000-0000');
  await page.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('동의');
  expect(posts).toBe(0);
});

test('failed transmission preserves input, success stays on site and blocks duplicates', async ({ page }) => {
  let posts = 0;
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  const bodies: Record<string, unknown>[] = [];
  await page.route('https://api.web3forms.com/**', async (route) => {
    posts += 1;
    bodies.push(route.request().postDataJSON());
    if (posts === 1) return route.fulfill({ status: 503, json: { success: false } });
    await gate;
    await route.fulfill({ json: { success: true } });
  });
  await reachContactDetails(page);
  await page.getByLabel(/문의 답변을 위해 입력 내용을/).check();
  await page.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('입력 내용은 유지됩니다.');
  await expect(page.getByLabel('이름', { exact: false })).toHaveValue('  테스트 담당자  ');
  await expect(page.getByLabel('이메일', { exact: false })).toHaveValue('review@example.com');
  await page.getByRole('button', { name: /문의 보내기/ }).click();
  await expect(page.getByRole('button', { name: '전송 중…' })).toBeDisabled();
  await expect(page.getByLabel('이름', { exact: false })).toBeDisabled();
  // Dispatching another submit event must not bypass the synchronous busy guard.
  await page.locator('form.dg-form').evaluate((form) => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await expect.poll(() => posts).toBe(2);
  release?.();
  await expect(page.getByRole('heading', { name: '문의가 접수되었습니다.' })).toBeFocused();
  await expect(page).toHaveURL(/\/contact\/$/);
  expect(posts).toBe(2);
  expect(bodies[1].name).toBe('테스트 담당자');
  expect(bodies[1].message).toContain('정밀 정사영상, GIS 데이터 구축');
  expect(bodies[1].botcheck).toBe(false);
  await page.getByRole('button', { name: '새 문의 작성' }).click();
  await expect(page.getByRole('heading', { name: '어떤 프로젝트인가요?' })).toBeFocused();
  await expect(page.getByRole('button', { name: '정밀 정사영상', exact: true })).toHaveAttribute('aria-pressed', 'false');
});

test('network failure and malformed provider response never report success', async ({ page }) => {
  let attempt = 0;
  await page.route('https://api.web3forms.com/**', (route) => {
    attempt += 1;
    if (attempt === 1) return route.abort('failed');
    return route.fulfill({ status: 200, contentType: 'text/html', body: '<html>unexpected response</html>' });
  });
  await reachContactDetails(page);
  await page.getByLabel(/문의 답변을 위해 입력 내용을/).check();
  for (let index = 0; index < 2; index += 1) {
    await page.getByRole('button', { name: /문의 보내기/ }).click();
    await expect(page.locator('form.dg-form').getByRole('alert')).toContainText('접수 결과를 확인하지 못했습니다.');
    await expect(page.getByRole('heading', { name: '문의가 접수되었습니다.' })).toHaveCount(0);
    await expect(page.getByLabel('이메일', { exact: false })).toHaveValue('review@example.com');
  }
});

test('blocked localStorage does not break rendering or theme switching', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, method, { configurable: true, value: () => { throw new DOMException('Storage denied', 'SecurityError'); } });
    }
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '라이트 모드로 전환' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: '다크 모드로 전환' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await navigate(page, '문의');
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  expect(errors).toEqual([]);
});

test('reduced motion leaves all content readable without decorative tile displacement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.story-tiles')).toHaveCSS('display', 'none');
  await expect(page.locator('.story-hero-image')).toHaveCSS('transform', 'none');
  await expect(page.locator('[data-reveal]').last()).toHaveCSS('opacity', '1');
  await navigate(page, '서비스');
  await expect(page.locator('[data-reveal]').last()).toHaveCSS('opacity', '1');
});

test('missing IntersectionObserver never hides the page', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: undefined }); });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-reveal]').last()).toHaveCSS('opacity', '1');
});

test('keyboard navigation exposes a skip link and closes the mobile menu with Escape', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '본문 바로가기' })).toBeFocused();
  if (isMobile) {
    const menu = page.getByRole('button', { name: '메뉴 열기', exact: true });
    await menu.click();
    await expect(page.getByRole('button', { name: '메뉴 닫기', exact: true })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
  }
});

test('all public routes export distinct metadata and real static images', async ({ page, request }) => {
  for (const definition of pageDefinitions) {
    const response = await request.get(definition.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`rel="canonical" href="${SITE_URL}${definition.path}"`);
    expect(html).not.toContain('/_next/image?');
  }
  expect((await request.get('/this-route-does-not-exist/')).status()).toBe(404);
  expect(await (await request.get('/robots.txt')).text()).toContain('sitemap.xml');
  expect(await (await request.get('/sitemap.xml')).text()).toContain(`${SITE_URL}/contact/`);
  await page.goto('/', { waitUntil: 'networkidle' });
  const image = page.locator('.story-pillar-photo img').first();
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const src = await image.evaluate((element) => (element as HTMLImageElement).currentSrc);
  expect(src).toContain('/images/optimized/');
  expect(src).toMatch(/\.webp$/);
});

test('primary pages fit the viewport and produce review screenshots', async ({ page }, testInfo) => {
  for (const [path, name] of [['/', 'home'], ['/services/', 'services'], ['/contact/', 'contact']] as const) {
    await page.goto(path, { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveCSS('opacity', '1');
    const widths = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: false });
  }
});