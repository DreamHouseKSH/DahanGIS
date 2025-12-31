'use client';

import Link from 'next/link';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';
import { EducationIllustration } from '../../../components/v2/illustrations';

/**
 * v2 GIS 교육 서비스 페이지
 */
export default function V2ServiceEducationPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="GIS 교육"
        subtitle="실무 중심의 체계적인 GIS 전문가 양성 프로그램"
        breadcrumb="홈 > 서비스 > GIS 교육"
      />

      {/* 서비스 소개 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="v2-content-card">
                <h3 className="v2-content-title">서비스 개요</h3>
                <p className="v2-content-text">
                  다한지리정보(주)의 GIS 교육 프로그램은 기초부터 고급까지
                  체계적인 커리큘럼으로 GIS 전문가를 양성합니다.
                </p>
                <p className="v2-content-text">
                  QGIS, ArcGIS, Python GIS 등 다양한 도구를 활용한
                  실무 중심의 교육을 제공합니다.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">
                    <i className="bi bi-clock me-1" />
                    준비중
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                    2025년 상반기 오픈 예정
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <EducationIllustration width={350} height={280} />
            </div>
          </div>

          {/* 교육 과정 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">교육 과정 (예정)</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <GlassCard className="h-100">
                  <GlassCardBody>
                    <div className="text-center mb-3">
                      <span className="badge" style={{ background: 'var(--gradient-accent)', padding: '0.5rem 1rem' }}>기초</span>
                    </div>
                    <h4 className="v2-feature-title text-center">GIS 입문</h4>
                    <ul className="v2-list">
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>GIS 개념 이해</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>좌표계와 투영법</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>QGIS 기초</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>데이터 시각화</li>
                    </ul>
                  </GlassCardBody>
                </GlassCard>
              </div>
              <div className="col-md-4">
                <GlassCard className="h-100">
                  <GlassCardBody>
                    <div className="text-center mb-3">
                      <span className="badge" style={{ background: 'var(--gradient-primary)', padding: '0.5rem 1rem' }}>중급</span>
                    </div>
                    <h4 className="v2-feature-title text-center">공간 분석</h4>
                    <ul className="v2-list">
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>벡터/래스터 분석</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>네트워크 분석</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>지형 분석</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>모델 빌더</li>
                    </ul>
                  </GlassCardBody>
                </GlassCard>
              </div>
              <div className="col-md-4">
                <GlassCard className="h-100">
                  <GlassCardBody>
                    <div className="text-center mb-3">
                      <span className="badge" style={{ background: 'var(--gradient-warm)', padding: '0.5rem 1rem' }}>고급</span>
                    </div>
                    <h4 className="v2-feature-title text-center">Python GIS</h4>
                    <ul className="v2-list">
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>GeoPandas</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>Shapely/Fiona</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>자동화 스크립트</li>
                      <li><span className="v2-list-icon"><i className="bi bi-book" style={{ color: 'white', fontSize: '0.7rem' }} /></span>웹 GIS 개발</li>
                    </ul>
                  </GlassCardBody>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* 교육 특징 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">교육 특징</h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-person-video3" />
                </div>
                <h4 className="v2-feature-title">실시간 강의</h4>
                <p className="v2-feature-text">온/오프라인 병행</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-laptop" />
                </div>
                <h4 className="v2-feature-title">실습 중심</h4>
                <p className="v2-feature-text">실제 프로젝트 기반</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-people" />
                </div>
                <h4 className="v2-feature-title">소수 정예</h4>
                <p className="v2-feature-text">1:1 멘토링 지원</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-award" />
                </div>
                <h4 className="v2-feature-title">수료증 발급</h4>
                <p className="v2-feature-text">과정 이수 인증</p>
              </div>
            </div>
          </div>

          {/* 사전 등록 CTA */}
          <div className="v2-glass-card v2-glass-card-strong text-center mt-4" style={{ padding: '3rem 2rem' }}>
            <h3 className="v2-content-title">교육 프로그램에 관심이 있으신가요?</h3>
            <p className="v2-content-text mb-4">사전 등록하시면 오픈 시 우선 안내드립니다</p>
            <Link href="/v2/contact" className="v2-btn v2-btn-gradient">
              <i className="bi bi-bell me-2" />
              사전 등록 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
