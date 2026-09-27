import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';

function checkEnvironment(key: string, required: boolean) {
  return spawnSync(process.execPath, ['scripts/check-env.mjs'], {
    cwd: process.cwd(), encoding: 'utf8',
    env: { ...process.env, NEXT_PUBLIC_WEB3FORMS_KEY: key, NEXT_PUBLIC_KAKAO_MAP_KEY: '', REQUIRE_CONTACT_KEY: String(required) },
  });
}

test('production cannot publish an empty or CI-only contact key', () => {
  for (const key of ['', 'ci-placeholder-not-a-real-key']) {
    const result = checkEnvironment(key, true);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Production deployment requires');
  }
});

test('local preview can deliberately omit external service credentials', () => {
  const result = checkEnvironment('', false);
  expect(result.status).toBe(0);
  expect(result.stderr).toContain('Contact form is disabled');
  expect(result.stderr).toContain('external map link remains available');
});
