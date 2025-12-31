'use client';

import Link from 'next/link';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';
import { ConsultingIllustration } from '../../../components/v2/illustrations';

/**
 * v2 GIS 컨설팅 서비스 페이지
 */
export default function V2ServiceConsultingPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="GIS 컨설팅"
        subtitle="전문가의 분석과 전략 수립으로 최적의 GIS 솔루션 제안"
        breadcrumb="홈 > 서비스 > GIS 컨설팅"
      />

      {/* 서비스 소개 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="v2-content-card">
                <h3 className="v2-content-title">서비스 개요</h3>
                <p className="v2-content-text">
                  다한지리정보(주)의 GIS 컨설팅 서비스는 고객의 비즈니스 요구사항을 분석하고
                  최적의 공간정보 시스템 구축 전략을 제시합니다.
                </p>
                <p className="v2-content-text">
                  요구사항 분석, 시스템 설계, 데이터 모델링, 구현 전략 수립까지
                  종합적인 컨설팅 서비스를 제공합니다.
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <ConsultingIllustration width={350} height={280} />
            </div>
          </div>

          {/* 컨설팅 분야 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">컨설팅 분야</h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-diagram-3" />
                </div>
                <h4 className="v2-feature-title">시스템 설계</h4>
                <p className="v2-feature-text">GIS 시스템 아키텍처 설계</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-database" />
                </div>
                <h4 className="v2-feature-title">데이터 설계</h4>
                <p className="v2-feature-text">공간 데이터베이스 모델링</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-graph-up" />
                </div>
                <h4 className="v2-feature-title">분석 전략</h4>
                <p className="v2-feature-text">공간분석 전략 수립</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-clipboard-check" />
                </div>
                <h4 className="v2-feature-title">품질 관리</h4>
                <p className="v2-feature-text">품질관리 체계 구축</p>
              </div>
            </div>
          </div>

          {/* 컨설팅 프로세스 */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-arrow-repeat me-2" style={{ color: 'var(--v2-accent)' }} />
                    컨설팅 프로세스
                  </h3>
                  <ul className="v2-list">
                    <li><span className="v2-list-icon">1</span>현황 분석 및 요구사항 파악</li>
                    <li><span className="v2-list-icon">2</span>As-Is / To-Be 분석</li>
                    <li><span className="v2-list-icon">3</span>시스템 아키텍처 설계</li>
                    <li><span className="v2-list-icon">4</span>구현 전략 및 로드맵 수립</li>
                    <li><span className="v2-list-icon">5</span>산출물 작성 및 보고</li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-file-earmark-text me-2" style={{ color: 'var(--v2-accent)' }} />
                    주요 산출물
                  </h3>
                  <ul className="v2-list">
                    <li><span className="v2-list-icon"><i className="bi bi-file-text" style={{ color: 'white', fontSize: '0.7rem' }} /></span>현황 분석 보고서</li>
                    <li><span className="v2-list-icon"><i className="bi bi-file-text" style={{ color: 'white', fontSize: '0.7rem' }} /></span>시스템 설계서</li>
                    <li><span className="v2-list-icon"><i className="bi bi-file-text" style={{ color: 'white', fontSize: '0.7rem' }} /></span>데이터 모델 설계서</li>
                    <li><span className="v2-list-icon"><i className="bi bi-file-text" style={{ color: 'white', fontSize: '0.7rem' }} /></span>구현 전략 보고서</li>
                    <li><span className="v2-list-icon"><i className="bi bi-file-text" style={{ color: 'white', fontSize: '0.7rem' }} /></span>사업 계획서</li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>

          {/* CTA */}
          <div className="v2-glass-card v2-glass-card-strong text-center mt-4" style={{ padding: '3rem 2rem' }}>
            <h3 className="v2-content-title">GIS 컨설팅 서비스가 필요하신가요?</h3>
            <p className="v2-content-text mb-4">전문가와 상담하고 최적의 솔루션을 찾아보세요</p>
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
