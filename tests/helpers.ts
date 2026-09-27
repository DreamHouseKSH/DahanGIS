import { expect, type Page } from '@playwright/test';

export const mockMapScript = `
window.kakao = { maps: {
  load: function(callback) { setTimeout(callback, 0); },
  LatLng: function(lat, lng) { this.lat = lat; this.lng = lng; },
  Map: function(container) {
    window.__mapInitCount = (window.__mapInitCount || 0) + 1;
    container.setAttribute('data-mock-map-count', String(window.__mapInitCount));
    var tile = document.createElement('div');
    tile.textContent = 'Mock map (no external API request)';
    tile.setAttribute('data-mock-map', 'ready');
    container.appendChild(tile);
  },
  Marker: function() { this.setMap = function() {}; }
}};
`;

/** Deny every external request by default. Tests never send real enquiries. */
export async function isolateExternalServices(page: Page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    if (url.hostname === 'dapi.kakao.com') return route.fulfill({ contentType: 'text/javascript', body: mockMapScript });
    if (url.hostname === 'api.web3forms.com') return route.fulfill({ status: 503, json: { success: false } });
    return route.abort('blockedbyclient');
  });
}

export async function navigate(page: Page, label: string) {
  const menu = page.getByRole('button', { name: '메뉴 열기', exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('navigation', { name: '주요 메뉴', exact: true }).getByRole('link', { name: label, exact: true }).click();
}

export async function reachContactDetails(page: Page) {
  await page.goto('/contact/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '정밀 정사영상', exact: true }).click();
  await page.getByRole('button', { name: 'GIS 데이터 구축', exact: true }).click();
  await page.getByRole('button', { name: /다음/ }).click();
  await expect(page.getByRole('heading', { name: '프로젝트 규모·일정.' })).toBeFocused();
  await page.getByRole('button', { name: /다음/ }).click();
  await page.getByLabel('요청 내용', { exact: false }).fill('  테스트용 요청 내용입니다. 실제 문의를 발송하지 않습니다.  ');
  await page.getByRole('button', { name: /다음/ }).click();
  await page.getByLabel('이름', { exact: false }).fill('  테스트 담당자  ');
  await page.getByLabel('이메일', { exact: false }).fill('review@example.com');
}
