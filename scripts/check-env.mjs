import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();
if (process.env.REQUIRE_CONTACT_KEY === 'true' && (!key || key === 'ci-placeholder-not-a-real-key')) {
  throw new Error('Production deployment requires the NEXT_PUBLIC_WEB3FORMS_KEY repository secret. The existing published site has not been changed.');
}
if (!key) console.warn('Contact form is disabled in this build: no public form key configured.');
if (!process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.trim()) console.warn('Kakao SDK is disabled; the external map link remains available.');
