export const serviceOptions = ['정밀 정사영상', 'GIS 데이터 구축', 'GIS 컨설팅', '소프트웨어 개발', 'GIS 교육', '기타 · 상담'];
export const orgOptions = ['공공기관', '지자체', '민간기업', '학교 · 연구', '기타'];
export const prefOptions = ['이메일', '전화', '화상 미팅', '방문'];
export const budgets = ['미정 · 상담 후 결정', '~ 1천만원', '2천만원', '3천만원', '5천만원', '7천만원', '1억원 내외', '1억 이상'];
export const starts = ['즉시 착수', '1개월 이내', '2–3개월 내', '하반기', '미정 · 상담 중'];
export const durations = ['1개월 미만', '1–3개월', '3–6개월', '6개월 이상', '장기 · 유지보수'];
export type Step = 1 | 2 | 3 | 4;
export type Fields = {
  services: string[]; orgType: string; budget: string; start: string; duration: string;
  aoi: string; brief: string; name: string; role: string; email: string; phone: string; pref: string; consent: boolean;
};
export type ContactIssue = { step: Step; field: keyof Fields | 'form'; message: string };
export const initialFields: Fields = {
  services: [], orgType: '', budget: budgets[0], start: '미정 · 상담 중', duration: durations[1],
  aoi: '', brief: '', name: '', role: '', email: '', phone: '', pref: prefOptions[0], consent: false,
};
export const limits = { aoi: 300, brief: 10000, name: 100, role: 200, email: 254, phone: 40 };

export function validateStep(fields: Fields, step: Step): ContactIssue | null {
  const issue = (field: ContactIssue['field'], message: string): ContactIssue => ({ step, field, message });
  if (step === 1) {
    if (!fields.services.length || fields.services.some((item) => !serviceOptions.includes(item))) return issue('services', '서비스 유형을 하나 이상 선택해주세요.');
    if (fields.orgType && !orgOptions.includes(fields.orgType)) return issue('orgType', '발주 유형을 다시 선택해주세요.');
  }
  if (step === 2) {
    if (!budgets.includes(fields.budget)) return issue('budget', '예산 규모를 다시 선택해주세요.');
    if (!starts.includes(fields.start)) return issue('start', '착수 희망 시기를 다시 선택해주세요.');
    if (!durations.includes(fields.duration)) return issue('duration', '진행 기간을 다시 선택해주세요.');
    if (fields.aoi.length > limits.aoi) return issue('aoi', '대상 지역은 300자 이내로 입력해주세요.');
  }
  if (step === 3) {
    if (!fields.brief.trim()) return issue('brief', '요청 내용을 입력해주세요.');
    if (fields.brief.length > limits.brief) return issue('brief', '요청 내용은 10,000자 이내로 입력해주세요.');
  }
  if (step === 4) {
    if (!fields.name.trim() || fields.name.length > limits.name) return issue('name', '이름을 100자 이내로 입력해주세요.');
    if (fields.role.length > limits.role) return issue('role', '직함 / 소속을 200자 이내로 입력해주세요.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) || fields.email.length > limits.email) return issue('email', '올바른 이메일 주소를 입력해주세요.');
    if (!prefOptions.includes(fields.pref)) return issue('pref', '선호 연락 방식을 다시 선택해주세요.');
    if (fields.pref === '전화' && !fields.phone.trim()) return issue('phone', '전화 연락을 원하시면 연락처를 입력해주세요.');
    if (fields.phone && (!/^[+\d\s().-]{7,40}$/.test(fields.phone.trim()) || fields.phone.replace(/\D/g, '').length < 7)) return issue('phone', '연락처를 확인해주세요. 숫자, +, -, 괄호, 공백을 사용할 수 있습니다.');
    if (!fields.consent) return issue('consent', '문의 정보 전송 안내를 확인하고 동의해주세요.');
  }
  return null;
}
export function validateContact(fields: Fields): ContactIssue | null {
  for (const step of [1, 2, 3, 4] as const) {
    const issue = validateStep(fields, step);
    if (issue) return issue;
  }
  return null;
}
export function contactPayload(fields: Fields, accessKey: string, botcheck = false) {
  return {
    access_key: accessKey, subject: '[DahanGIS] 신규 프로젝트 문의', from_name: 'DahanGIS Contact Form',
    name: fields.name.trim(), email: fields.email.trim(), phone: fields.phone.trim(), botcheck,
    message: [
      `[서비스] ${fields.services.join(', ')}`, `[발주 유형] ${fields.orgType || '-'}`,
      `[예산] ${fields.budget}`, `[착수] ${fields.start}`, `[기간] ${fields.duration}`,
      `[대상 지역] ${fields.aoi.trim() || '-'}`, `[요청 내용]\n${fields.brief.trim()}`,
      `[담당자] ${fields.name.trim()} / ${fields.role.trim() || '-'}`, `[이메일] ${fields.email.trim()}`,
      `[연락처] ${fields.phone.trim() || '-'}`, `[선호 연락] ${fields.pref}`, '[문의 정보 전송 안내 동의] 확인',
    ].join('\n\n'),
  };
}
