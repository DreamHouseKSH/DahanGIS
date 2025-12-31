'use client';

import Link from 'next/link';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';
import { SoftwareIllustration } from '../../../components/v2/illustrations';

/**
 * v2 GIS 소프트웨어 개발 서비스 페이지
 */
export default function V2ServiceSoftwarePage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="GIS 소프트웨어 개발"
        subtitle="최신 기술 스택으로 맞춤형 GIS 솔루션 구현"
        breadcrumb="홈 > 서비스 > GIS 소프트웨어"
      />

      {/* 서비스 소개 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="v2-content-card">
                <h3 className="v2-content-title">서비스 개요</h3>
                <p className="v2-content-text">
                  다한지리정보(주)는 웹/모바일 GIS 애플리케이션 개발 서비스를 제공합니다.
                  React, Next.js, MapBox, OpenLayers 등 최신 기술 스택과
                  풍부한 경험을 바탕으로 맞춤형 GIS 솔루션을 구현합니다.
                </p>
                <p className="v2-content-text">
                  사용자 친화적인 UI/UX와 안정적인 시스템 아키텍처로
                  고품질 소프트웨어를 제공합니다.
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <SoftwareIllustration width={350} height={280} />
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">기술 스택</h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <GlassCard>
                  <GlassCardBody className="text-center">
                    <i className="bi bi-window" style={{ fontSize: '2rem', color: 'var(--v2-accent)' }} />
                    <h4 className="v2-feature-title mt-2">Frontend</h4>
                    <p className="v2-feature-text">
                      React, Next.js, TypeScript<br />
                      Tailwind CSS, Bootstrap
                    </p>
                  </GlassCardBody>
                </GlassCard>
              </div>
              <div className="col-md-4 mb-4">
                <GlassCard>
                  <GlassCardBody className="text-center">
                    <i className="bi bi-server" style={{ fontSize: '2rem', color: 'var(--v2-accent)' }} />
                    <h4 className="v2-feature-title mt-2">Backend</h4>
                    <p className="v2-feature-text">
                      Node.js, Python<br />
                      PostgreSQL, PostGIS
                    </p>
                  </GlassCardBody>
                </GlassCard>
              </div>
              <div className="col-md-4 mb-4">
                <GlassCard>
                  <GlassCardBody className="text-center">
                    <i className="bi bi-map" style={{ fontSize: '2rem', color: 'var(--v2-accent)' }} />
                    <h4 className="v2-feature-title mt-2">GIS Library</h4>
                    <p className="v2-feature-text">
                      MapBox, OpenLayers<br />
                      Leaflet, Turf.js
                    </p>
                  </GlassCardBody>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* 개발 서비스 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">개발 서비스</h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-globe" />
                </div>
                <h4 className="v2-feature-title">웹 GIS</h4>
                <p className="v2-feature-text">반응형 웹 GIS 시스템</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-phone" />
                </div>
                <h4 className="v2-feature-title">모바일 GIS</h4>
                <p className="v2-feature-text">현장용 모바일 앱</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-bar-chart" />
                </div>
                <h4 className="v2-feature-title">대시보드</h4>
                <p className="v2-feature-text">실시간 모니터링 시스템</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-plug" />
                </div>
                <h4 className="v2-feature-title">API 개발</h4>
                <p className="v2-feature-text">REST/GraphQL API</p>
              </div>
            </div>
          </div>

          {/* 개발 프로세스 */}
          <div className="row g-4 mt-4">
            <div className="col-12">
              <GlassCard>
                <GlassCardBody>
                  <h3 className="v2-content-title text-center mb-4">
                    <i className="bi bi-arrow-repeat me-2" style={{ color: 'var(--v2-accent)' }} />
                    애자일 개발 프로세스
                  </h3>
                  <div className="row text-center">
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-chat-dots" />
                      </div>
                      <p className="v2-feature-text mt-2">요구분석</p>
                    </div>
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-pencil-square" />
                      </div>
                      <p className="v2-feature-text mt-2">설계</p>
                    </div>
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-code-slash" />
                      </div>
                      <p className="v2-feature-text mt-2">개발</p>
                    </div>
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-bug" />
                      </div>
                      <p className="v2-feature-text mt-2">테스트</p>
                    </div>
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-rocket" />
                      </div>
                      <p className="v2-feature-text mt-2">배포</p>
                    </div>
                    <div className="col-md-2 col-4 mb-3">
                      <div className="v2-feature-icon mx-auto" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-headset" />
                      </div>
                      <p className="v2-feature-text mt-2">유지보수</p>
                    </div>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>

          {/* CTA */}
          <div className="v2-glass-card v2-glass-card-strong text-center mt-4" style={{ padding: '3rem 2rem' }}>
            <h3 className="v2-content-title">맞춤형 GIS 소프트웨어가 필요하신가요?</h3>
            <p className="v2-content-text mb-4">전문가와 상담하고 견적을 받아보세요</p>
            <Link href="/v2/contact" className="v2-btn v2-btn-gradient">
              <i className="bi bi-telephone me-2" />
              무료 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
