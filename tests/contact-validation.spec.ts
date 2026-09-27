import { test, expect } from '@playwright/test';
import { contactPayload, initialFields, validateContact, validateStep, type Fields } from '../src/lib/contact';

function validFields(): Fields {
  return { ...initialFields, services: ['정밀 정사영상'], brief: '검증용 요청', name: '검증 담당자', email: 'test@example.com', consent: true };
}

test('final validation rechecks all stages rather than only the visible step', () => {
  expect(validateContact(validFields())).toBeNull();
  expect(validateContact({ ...validFields(), services: [] })?.step).toBe(1);
  expect(validateContact({ ...validFields(), services: ['unknown'] })?.field).toBe('services');
  expect(validateContact({ ...validFields(), budget: 'unknown' })?.step).toBe(2);
  expect(validateContact({ ...validFields(), brief: '   ' })?.step).toBe(3);
  expect(validateContact({ ...validFields(), consent: false })?.field).toBe('consent');
});

test('limits and conditional phone requirements are checked', () => {
  expect(validateStep({ ...validFields(), brief: 'x'.repeat(10001) }, 3)?.field).toBe('brief');
  expect(validateStep({ ...validFields(), name: 'x'.repeat(101) }, 4)?.field).toBe('name');
  expect(validateStep({ ...validFields(), email: 'invalid' }, 4)?.field).toBe('email');
  expect(validateStep({ ...validFields(), pref: '전화', phone: '' }, 4)?.field).toBe('phone');
  expect(validateStep({ ...validFields(), phone: '.......' }, 4)?.field).toBe('phone');
  expect(validateStep({ ...validFields(), pref: '전화', phone: '+82 (10) 1234-5678' }, 4)).toBeNull();
});

test('payload trims input without interpolating it as HTML', () => {
  const payload = contactPayload({ ...validFields(), name: '  담당자  ', brief: '<script>not executable</script>' }, 'mock-key');
  expect(payload.name).toBe('담당자');
  expect(payload.message).toContain('<script>not executable</script>');
  expect(payload.access_key).toBe('mock-key');
  expect(payload.botcheck).toBe(false);
  expect(payload).not.toHaveProperty('redirect');
});
