'use client';

import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';

/**
 * v2 회사 소개 페이지
 */
export default function V2AboutPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="회사 소개"
        subtitle="공간정보 전문기업 다한지리정보(주)를 소개합니다"
        breadcrumb="홈 > 회사 소개"
      />

      {/* 회사 소개 섹션 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row g-4">
            {/* 비전 */}
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-eye me-2" style={{ color: 'var(--v2-accent)' }} />
                    비전
                  </h3>
                  <p className="v2-content-text">
                    다한지리정보(주)는 &quot;공간정보의 미래를 선도한다&quot;는 비전 아래,
                    최첨단 GIS 기술과 전문 인력을 바탕으로 고객에게 최고의 가치를 제공합니다.
                  </p>
                  <p className="v2-content-text">
                    우리는 지속적인 기술 혁신과 품질 향상을 통해 공간정보 산업의 발전에 기여하고,
                    고객과 함께 성장하는 파트너가 되고자 합니다.
                  </p>
                </GlassCardBody>
              </GlassCard>
            </div>

            {/* 미션 */}
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-bullseye me-2" style={{ color: 'var(--v2-accent)' }} />
                    미션
                  </h3>
                  <p className="v2-content-text">
                    정확하고 신뢰할 수 있는 공간정보 서비스를 통해 고객의 의사결정을 지원하고,
                    사회 발전에 기여합니다.
                  </p>
                  <ul className="v2-list">
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      고품질 GIS 데이터 구축 및 서비스
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      맞춤형 공간정보 솔루션 개발
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      전문 인력 양성 및 기술 전수
                    </li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>

          {/* 핵심 가치 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">
              <i className="bi bi-star me-2" style={{ color: 'var(--v2-accent)' }} />
              핵심 가치
            </h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-lightbulb" />
                </div>
                <h4 className="v2-feature-title">혁신</h4>
                <p className="v2-feature-text">끊임없는 기술 혁신</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-patch-check" />
                </div>
                <h4 className="v2-feature-title">신뢰</h4>
                <p className="v2-feature-text">정확하고 믿을 수 있는 서비스</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-hand-thumbs-up" />
                </div>
                <h4 className="v2-feature-title">고객 중심</h4>
                <p className="v2-feature-text">고객 만족을 최우선으로</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-people" />
                </div>
                <h4 className="v2-feature-title">협력</h4>
                <p className="v2-feature-text">함께 성장하는 파트너십</p>
              </div>
            </div>
          </div>

          {/* 연혁 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">
              <i className="bi bi-clock-history me-2" style={{ color: 'var(--v2-accent)' }} />
              회사 연혁
            </h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="v2-list">
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2020</strong> - 회사 설립
                    </div>
                  </li>
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2021</strong> - GIS 컨설팅 사업 확장
                    </div>
                  </li>
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2022</strong> - 드론 측량 사업 시작
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="v2-list">
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2023</strong> - 소프트웨어 개발팀 구성
                    </div>
                  </li>
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2024</strong> - GIS 교육 서비스 런칭
                    </div>
                  </li>
                  <li>
                    <span className="v2-list-icon"><i className="bi bi-calendar3" style={{ color: 'white', fontSize: '0.7rem' }} /></span>
                    <div>
                      <strong>2025</strong> - v2 서비스 플랫폼 오픈
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
