'use client';

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';

const serviceOptions = ['정밀 정사영상', 'GIS 데이터 구축', 'GIS 컨설팅', '소프트웨어 개발', 'GIS 교육', '기타 · 상담'];
const orgOptions = ['공공기관', '지자체', '민간기업', '학교 · 연구', '기타'];
const prefOptions = ['이메일', '전화', '화상 미팅', '방문'];
const budgets = ['~ 1천만원', '2천만원', '3천만원', '5천만원', '7천만원', '1억원 내외', '1억 이상'];

type Fields = {
  services: string[];
  orgType: string;
  budget: string;
  start: string;
  duration: string;
  aoi: string;
  brief: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  pref: string;
};

const initialFields: Fields = {
  services: [],
  orgType: '',
  budget: budgets[3],
  start: '1개월 이내',
  duration: '1–3개월',
  aoi: '',
  brief: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  pref: '이메일',
};

export default function ContactWizard() {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [error, setError] = useState('');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  const message = useMemo(() => {
    return [
      `[서비스] ${fields.services.join(', ') || '-'}`,
      `[발주 유형] ${fields.orgType || '-'}`,
      `[예산] ${fields.budget}`,
      `[착수] ${fields.start}`,
      `[기간] ${fields.duration}`,
      `[대상 지역] ${fields.aoi || '-'}`,
      `[요청 내용]\n${fields.brief || '-'}`,
      `[담당자] ${fields.name || '-'} / ${fields.role || '-'}`,
      `[이메일] ${fields.email || '-'}`,
      `[연락처] ${fields.phone || '-'}`,
      `[선호 연락] ${fields.pref}`,
    ].join('\n\n');
  }, [fields]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setError('');
  }

  function toggleService(value: string) {
    const services = fields.services.includes(value)
      ? fields.services.filter((item) => item !== value)
      : [...fields.services, value];
    update('services', services);
  }

  function validate(targetStep = step) {
    if (targetStep === 1 && fields.services.length === 0) return '서비스 유형을 하나 이상 선택해주세요.';
    if (targetStep === 3 && !fields.brief.trim()) return '요청 내용을 입력해주세요.';
    if (targetStep === 4 && !fields.name.trim()) return '이름을 입력해주세요.';
    if (targetStep === 4 && !fields.email.trim()) return '이메일을 입력해주세요.';
    return '';
  }

  function nextStep() {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setStep((value) => Math.min(4, value + 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const message = validate(4);
    if (message || !accessKey) {
      event.preventDefault();
      setError(message || 'Web3Forms access key 설정이 필요합니다.');
    }
  }

  return (
    <form className="dg-form" action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="[DahanGIS] 신규 프로젝트 문의" />
      <input type="hidden" name="from_name" value="DahanGIS Contact Form" />
      <input type="hidden" name="redirect" value="https://dahangis.co.kr/contact" />
      <input type="checkbox" name="botcheck" className="dg-botcheck" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="services" value={fields.services.join(', ')} />
      <input type="hidden" name="orgType" value={fields.orgType} />
      <input type="hidden" name="budget" value={fields.budget} />
      <input type="hidden" name="start" value={fields.start} />
      <input type="hidden" name="duration" value={fields.duration} />
      <input type="hidden" name="aoi" value={fields.aoi} />
      <input type="hidden" name="brief" value={fields.brief} />
      <input type="hidden" name="name" value={fields.name} />
      <input type="hidden" name="role" value={fields.role} />
      <input type="hidden" name="email" value={fields.email} />
      <input type="hidden" name="phone" value={fields.phone} />
      <input type="hidden" name="pref" value={fields.pref} />
      <input type="hidden" name="message" value={message} />

      <div className="dg-form-head">
        <span>문의 양식 · <b>{String(step).padStart(2, '0')}</b> / 04</span>
        <span>{['Project Type', 'Scale', 'Brief', 'Contact'][step - 1]}</span>
      </div>
      <div className="dg-progress"><span style={{ width: `${step * 25}%` }} /></div>

      {step === 1 ? (
        <div className="dg-step">
          <h3>어떤 프로젝트인가요<i>?</i></h3>
          <p>여러 개 선택 가능합니다.</p>
          <Field label="서비스 유형" required>
            <ChipGroup options={serviceOptions} values={fields.services} onClick={toggleService} />
          </Field>
          <Field label="발주 유형">
            <ChipGroup options={orgOptions} value={fields.orgType} onClick={(value) => update('orgType', value)} />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="dg-step">
          <h3>프로젝트 규모·일정<i>.</i></h3>
          <p>대략적 범위로 적어주셔도 괜찮습니다.</p>
          <Field label="예산 규모">
            <div className="dg-budget">{fields.budget}</div>
            <input
              aria-label="예산 규모"
              type="range"
              min="0"
              max={budgets.length - 1}
              value={budgets.indexOf(fields.budget)}
              onChange={(event) => update('budget', budgets[Number(event.target.value)])}
            />
          </Field>
          <div className="dg-form-grid">
            <SelectField label="착수 희망" value={fields.start} options={['즉시 착수', '1개월 이내', '2–3개월 내', '하반기', '미정 · 상담 중']} onChange={(value) => update('start', value)} />
            <SelectField label="진행 기간" value={fields.duration} options={['1개월 미만', '1–3개월', '3–6개월', '6개월 이상', '장기 · 유지보수']} onChange={(value) => update('duration', value)} />
          </div>
          <Field label="대상 지역 / AOI">
            <input aria-label="대상 지역 / AOI" value={fields.aoi} onChange={(event) => update('aoi', event.target.value)} placeholder="예: 경기 고양시 일산서구 · 도심부" />
          </Field>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="dg-step">
          <h3>세부 내용을 알려주세요<i>.</i></h3>
          <p>간단한 설명도 좋고, RFP 내용을 붙여 넣으셔도 됩니다.</p>
          <Field label="요청 내용" required>
            <textarea aria-label="요청 내용" value={fields.brief} onChange={(event) => update('brief', event.target.value)} rows={7} placeholder="현재 상황, 기대하는 결과, 보유 자료, 제약 조건 등" />
          </Field>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="dg-step">
          <h3>연락처를 남겨주세요<i>.</i></h3>
          <p>담당자가 확인 후 회신드립니다.</p>
          <div className="dg-form-grid">
            <TextField label="이름" required value={fields.name} onChange={(value) => update('name', value)} placeholder="홍길동" />
            <TextField label="직함 / 소속" value={fields.role} onChange={(value) => update('role', value)} placeholder="GIS팀장 · 기관명" />
            <TextField label="이메일" required type="email" value={fields.email} onChange={(value) => update('email', value)} placeholder="you@example.com" />
            <TextField label="연락처" type="tel" value={fields.phone} onChange={(value) => update('phone', value)} placeholder="010-0000-0000" />
          </div>
          <Field label="선호 연락 방식">
            <ChipGroup options={prefOptions} value={fields.pref} onClick={(value) => update('pref', value)} />
          </Field>
        </div>
      ) : null}

      {error ? <p className="dg-form-error" role="alert">{error}</p> : null}

      <div className="dg-form-actions">
        <span>총 4단계</span>
        <div>
          <button className="dg-button" type="button" disabled={step === 1} onClick={() => setStep((value) => value - 1)}>← 이전</button>
          {step < 4 ? (
            <button className="dg-button dg-primary" type="button" onClick={nextStep}>다음 <span>→</span></button>
          ) : (
            <button className="dg-button dg-primary" type="submit">문의 보내기 <span>↗</span></button>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return <div className="dg-field"><span>{label}{required ? <b>*</b> : null}</span>{children}</div>;
}

function ChipGroup({ options, values, value, onClick }: { options: string[]; values?: string[]; value?: string; onClick: (value: string) => void }) {
  return <div className="dg-chips">{options.map((option) => <button key={option} type="button" className={(values?.includes(option) || value === option) ? 'dg-chip dg-on' : 'dg-chip'} onClick={() => onClick(option)}>{option}</button>)}</div>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <Field label={label}><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></Field>;
}

function TextField({ label, required, type = 'text', value, onChange, placeholder }: { label: string; required?: boolean; type?: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <Field label={label} required={required}><input aria-label={label} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></Field>;
}
