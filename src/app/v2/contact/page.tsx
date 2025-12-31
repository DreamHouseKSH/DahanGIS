'use client';

import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';

/**
 * v2 문의 페이지
 */
export default function V2ContactPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="문의하기"
        subtitle="프로젝트 상담 및 견적 문의를 남겨주세요"
        breadcrumb="홈 > 문의"
      />

      {/* 문의 섹션 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row g-4">
            {/* 문의 폼 */}
            <div className="col-lg-8">
              <GlassCard>
                <GlassCardBody>
                  <h3 className="v2-content-title mb-4">
                    <i className="bi bi-envelope me-2" style={{ color: 'var(--v2-accent)' }} />
                    문의 양식
                  </h3>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="v2-form-label">이름 *</label>
                        <input
                          type="text"
                          className="form-control v2-form-control"
                          placeholder="이름을 입력하세요"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="v2-form-label">회사/기관</label>
                        <input
                          type="text"
                          className="form-control v2-form-control"
                          placeholder="회사/기관명을 입력하세요"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="v2-form-label">이메일 *</label>
                        <input
                          type="email"
                          className="form-control v2-form-control"
                          placeholder="이메일을 입력하세요"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="v2-form-label">연락처 *</label>
                        <input
                          type="tel"
                          className="form-control v2-form-control"
                          placeholder="연락처를 입력하세요"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="v2-form-label">문의 유형</label>
                        <select className="form-control v2-form-control">
                          <option value="">선택하세요</option>
                          <option value="ortho">정밀 정사영상 제작</option>
                          <option value="data">GIS 데이터 구축</option>
                          <option value="consulting">GIS 컨설팅</option>
                          <option value="software">GIS 소프트웨어 개발</option>
                          <option value="education">GIS 교육</option>
                          <option value="other">기타</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="v2-form-label">문의 내용 *</label>
                        <textarea
                          className="form-control v2-form-control"
                          rows={6}
                          placeholder="문의 내용을 상세히 입력해 주세요"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="privacyCheck"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="privacyCheck"
                            style={{ color: 'rgba(255,255,255,0.8)' }}
                          >
                            개인정보 수집 및 이용에 동의합니다
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="v2-btn v2-btn-gradient w-100">
                          <i className="bi bi-send me-2" />
                          문의 보내기
                        </button>
                      </div>
                    </div>
                  </form>
                </GlassCardBody>
              </GlassCard>
            </div>

            {/* 연락처 정보 */}
            <div className="col-lg-4">
              <GlassCard className="mb-4">
                <GlassCardBody>
                  <h3 className="v2-content-title mb-4">
                    <i className="bi bi-building me-2" style={{ color: 'var(--v2-accent)' }} />
                    연락처
                  </h3>
                  <div className="mb-4">
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-geo-alt me-2" />
                      주소
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '1.5rem' }}>
                      서울특별시 강남구<br />
                      테헤란로 123
                    </p>
                  </div>
                  <div className="mb-4">
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-telephone me-2" />
                      전화
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '1.5rem' }}>
                      02-1234-5678
                    </p>
                  </div>
                  <div className="mb-4">
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-envelope me-2" />
                      이메일
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '1.5rem' }}>
                      info@dahangis.co.kr
                    </p>
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-clock me-2" />
                      영업시간
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginLeft: '1.5rem' }}>
                      평일 09:00 - 18:00<br />
                      (주말 및 공휴일 휴무)
                    </p>
                  </div>
                </GlassCardBody>
              </GlassCard>

              {/* 빠른 상담 */}
              <GlassCard variant="strong">
                <GlassCardBody className="text-center">
                  <i className="bi bi-headset" style={{ fontSize: '2.5rem', color: 'var(--v2-accent)' }} />
                  <h4 className="v2-feature-title mt-3">빠른 상담</h4>
                  <p className="v2-feature-text mb-3">
                    급한 문의는 전화로<br />
                    연락 주세요
                  </p>
                  <a href="tel:02-1234-5678" className="v2-btn v2-btn-outline">
                    <i className="bi bi-telephone me-2" />
                    02-1234-5678
                  </a>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
