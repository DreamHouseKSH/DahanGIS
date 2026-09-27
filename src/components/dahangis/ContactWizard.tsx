'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import ContactChannels from './ContactChannels';
import { budgets, contactPayload, durations, initialFields, limits, orgOptions, prefOptions, serviceOptions, starts, validateContact, validateStep, type ContactIssue, type Fields, type Step } from '../../lib/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactWizard() {
  const [step, setStep] = useState<Step>(1);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [error, setError] = useState<ContactIssue | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef<Step>(1);
  const busyRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const disposed = useRef(false);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() || '';

  useEffect(() => {
    disposed.current = false;
    return () => { disposed.current = true; controllerRef.current?.abort(); };
  }, []);
  useEffect(() => {
    if (previousStep.current !== step) headingRef.current?.focus();
    previousStep.current = step;
  }, [step]);
  useEffect(() => {
    if (error) document.getElementById(`contact-${error.field}`)?.focus();
  }, [error]);
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setError(null);
  }
  function nextStep() {
    const issue = validateStep(fields, step);
    if (issue) { setError(issue); return; }
    setError(null);
    setStep((current) => Math.min(4, current + 1) as Step);
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyRef.current || status === 'success') return;
    if (step < 4) { nextStep(); return; }
    const issue = validateContact(fields);
    if (issue) { setStep(issue.step); setError(issue); return; }
    if (!accessKey) return;
    busyRef.current = true;
    setStatus('submitting');
    setError(null);
    const controller = new AbortController();
    controllerRef.current = controller;
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const botcheck = new FormData(event.currentTarget).has('botcheck');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(contactPayload(fields, accessKey, botcheck)), signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== 'object' || !('success' in result) || result.success !== true) throw new Error('Submission not confirmed');
      if (!disposed.current) { setStatus('success'); setFields(initialFields); }
    } catch {
      if (!disposed.current) {
        setStatus('error');
        setError({ step: 4, field: 'form', message: '접수 결과를 확인하지 못했습니다. 입력 내용은 유지됩니다. 중복 접수 가능성이 있으니 확인 후 다시 시도해주세요.' });
      }
    } finally {
      clearTimeout(timer);
      controllerRef.current = null;
      busyRef.current = false;
    }
  }

  if (!accessKey) return <section className="dg-form" aria-labelledby="contact-unavailable">
    <h2 id="contact-unavailable" className="dg-card-title">온라인 문의를 준비 중입니다.</h2>
    <p>현재 온라인 문의 접수를 사용할 수 없습니다. 안내된 다른 연락 방법을 이용하거나 나중에 다시 방문해주세요.</p>
    <ContactChannels />
  </section>;

  if (status === 'success') return <section className="dg-form dg-form-success" aria-labelledby="contact-success">
    <h2 id="contact-success" ref={successRef} tabIndex={-1} className="dg-card-title">문의가 접수되었습니다.</h2>
    <p role="status">전송 서비스에서 접수를 확인했습니다. 담당자가 내용을 확인한 후 회신드립니다.</p>
    <button type="button" className="dg-button" onClick={() => { setStep(1); setError(null); setStatus('idle'); }}>새 문의 작성</button>
    <ContactChannels />
  </section>;

  const invalid = (field: keyof Fields) => error?.field === field;
  const describedBy = (field: keyof Fields) => invalid(field) ? 'contact-error' : undefined;
  const toggleService = (value: string) => {
    setFields((current) => ({ ...current, services: current.services.includes(value) ? current.services.filter((item) => item !== value) : [...current.services, value] }));
    setError(null);
  };

  return <form ref={formRef} className="dg-form" method="post" noValidate onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
    <noscript><p>문의 양식에는 JavaScript가 필요합니다. 브라우저에서 JavaScript를 켜거나 다른 연락 방법을 이용해주세요.</p><ContactChannels /></noscript>
    <input type="checkbox" name="botcheck" className="dg-botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="dg-form-head"><span>문의 양식 · <b>{String(step).padStart(2, '0')}</b> / 04</span><span>{['Project Type', 'Scale', 'Brief', 'Contact'][step - 1]}</span></div>
    <div className="dg-progress" role="progressbar" aria-label="문의 작성 단계" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} aria-valuetext={`4단계 중 ${step}단계`}><span style={{ width: `${step * 25}%` }} /></div>
    <fieldset className="dg-form-controls" disabled={status === 'submitting'}>
      <legend className="dg-sr-only">프로젝트 문의</legend>
      <div className="dg-step">
        <h3 ref={headingRef} tabIndex={-1}>{['어떤 프로젝트인가요?', '프로젝트 규모·일정.', '세부 내용을 알려주세요.', '연락처를 남겨주세요.'][step - 1]}</h3>
        {step === 1 ? <>
          <p>여러 개 선택 가능합니다.</p>
          <ChipGroup field="services" label="서비스 유형" required options={serviceOptions} values={fields.services} onClick={toggleService} invalid={invalid('services')} />
          <ChipGroup field="orgType" label="발주 유형" options={orgOptions} values={[fields.orgType]} onClick={(value) => update('orgType', value)} />
        </> : null}
        {step === 2 ? <>
          <p>정해지지 않은 항목은 상담 후 결정하셔도 됩니다.</p>
          <Field field="budget" label="예산 규모"><div className="dg-budget">{fields.budget}</div><input id="contact-budget" name="budget" type="range" min={0} max={budgets.length - 1} value={budgets.indexOf(fields.budget)} aria-valuetext={fields.budget} onChange={(event) => update('budget', budgets[Number(event.target.value)])} /></Field>
          <div className="dg-form-grid">
            <SelectField field="start" label="착수 희망" value={fields.start} options={starts} onChange={(value) => update('start', value)} />
            <SelectField field="duration" label="진행 기간" value={fields.duration} options={durations} onChange={(value) => update('duration', value)} />
          </div>
          <Field field="aoi" label="대상 지역 / AOI"><input id="contact-aoi" name="aoi" maxLength={limits.aoi} value={fields.aoi} onChange={(event) => update('aoi', event.target.value)} placeholder="예: 경기 고양시 일산서구 · 도심부" /></Field>
        </> : null}
        {step === 3 ? <>
          <p>현재 상황과 필요한 결과를 알려주세요. 민감한 개인정보와 기밀자료는 입력하지 마세요.</p>
          <Field field="brief" label="요청 내용" required><textarea id="contact-brief" name="brief" required maxLength={limits.brief} aria-invalid={invalid('brief')} aria-describedby={describedBy('brief')} value={fields.brief} onChange={(event) => update('brief', event.target.value)} rows={7} placeholder="현재 상황, 기대하는 결과, 보유 자료의 종류, 제약 조건 등" /></Field>
        </> : null}
        {step === 4 ? <>
          <p>담당자가 확인 후 회신드립니다.</p>
          <div className="dg-form-grid">
            <TextField field="name" label="이름" required autoComplete="name" value={fields.name} onChange={(value) => update('name', value)} placeholder="홍길동" invalid={invalid('name')} />
            <TextField field="role" label="직함 / 소속" autoComplete="organization" value={fields.role} onChange={(value) => update('role', value)} placeholder="GIS팀장 · 기관명" invalid={invalid('role')} />
            <TextField field="email" label="이메일" required type="email" autoComplete="email" value={fields.email} onChange={(value) => update('email', value)} placeholder="you@example.com" invalid={invalid('email')} />
            <TextField field="phone" label="연락처" required={fields.pref === '전화'} type="tel" autoComplete="tel" value={fields.phone} onChange={(value) => update('phone', value)} placeholder="010-0000-0000" invalid={invalid('phone')} />
          </div>
          <ChipGroup field="pref" label="선호 연락 방식" options={prefOptions} values={[fields.pref]} onClick={(value) => update('pref', value)} />
          <details className="dg-contact-notice" id="contact-data-notice"><summary>문의 정보 전송 안내</summary><p>입력한 이름, 이메일, 선택한 연락처·소속 및 프로젝트 문의 내용은 문의 접수와 답변을 위해 Web3Forms 전송 서비스로 전달됩니다. 정적 홈페이지 자체에는 문의를 저장하는 서버가 없습니다. 민감한 개인정보와 비공개 원본 데이터는 입력하지 마세요.</p><a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms 개인정보 안내 ↗</a></details>
          <label className="dg-consent" htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required checked={fields.consent} aria-invalid={invalid('consent')} aria-describedby={describedBy('consent')} onChange={(event) => update('consent', event.target.checked)} /><span>문의 답변을 위해 입력 내용을 Web3Forms로 전송하는 데 동의합니다.</span></label>
        </> : null}
      </div>
      <div className="dg-form-actions"><span>총 4단계</span><div>
        <button className="dg-button" type="button" disabled={step === 1} onClick={() => { setError(null); setStep((current) => (current - 1) as Step); }}>← 이전</button>
        {step < 4 ? <button className="dg-button dg-primary" type="button" onClick={nextStep}>다음 →</button> : <button className="dg-button dg-primary" type="submit">{status === 'submitting' ? '전송 중…' : '문의 보내기 ↗'}</button>}
      </div></div>
    </fieldset>
    {error ? <p id="contact-error" className="dg-form-error" role="alert"><span id="contact-form" tabIndex={-1}>{error.message}</span></p> : null}
    <ContactChannels />
  </form>;
}

function Field({ field, label, required, children }: { field: string; label: string; required?: boolean; children: ReactNode }) {
  return <div className="dg-field"><label htmlFor={`contact-${field}`}>{label}{required ? <b aria-hidden="true">*</b> : null}</label>{children}</div>;
}
function ChipGroup({ field, label, required, options, values, onClick, invalid }: { field: string; label: string; required?: boolean; options: string[]; values: string[]; onClick: (value: string) => void; invalid?: boolean }) {
  return <fieldset id={`contact-${field}`} tabIndex={-1} className="dg-field dg-chip-field" aria-invalid={invalid || undefined} aria-describedby={invalid ? 'contact-error' : undefined}><legend>{label}{required ? <b aria-hidden="true">*</b> : null}</legend><div className="dg-chips">{options.map((option) => <button key={option} type="button" className={`dg-chip${values.includes(option) ? ' dg-on' : ''}`} aria-pressed={values.includes(option)} onClick={() => onClick(option)}>{option}</button>)}</div></fieldset>;
}
function SelectField({ field, label, value, options, onChange }: { field: string; label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <Field field={field} label={label}><select id={`contact-${field}`} name={field} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></Field>;
}
function TextField({ field, label, required, type = 'text', autoComplete, value, onChange, placeholder, invalid }: { field: 'name' | 'role' | 'email' | 'phone'; label: string; required?: boolean; type?: string; autoComplete: string; value: string; onChange: (value: string) => void; placeholder: string; invalid?: boolean }) {
  return <Field field={field} label={label} required={required}><input id={`contact-${field}`} name={field} type={type} required={required} autoComplete={autoComplete} maxLength={limits[field]} aria-invalid={invalid || undefined} aria-describedby={invalid ? 'contact-error' : undefined} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></Field>;
}
