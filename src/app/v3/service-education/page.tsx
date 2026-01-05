'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';
import { EducationIllustration } from '../../../components/v3/illustrations';

/**
 * v3 GIS 교육 서비스 페이지
 * Cloud Dancer 테마
 */
export default function V3ServiceEducationPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      <PageHero
        title="GIS 교육"
        subtitle="실무 중심의 체계적인 커리큘럼으로 GIS 전문가를 양성합니다"
        breadcrumb="홈 > 서비스 > GIS 교육"
      />

      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-mortarboard me-2" style={{ color: 'var(--accent-sage)' }} />
                    서비스 개요
                  </h3>
                  <p className="v3-content-text">
                    기초부터 고급까지 체계적인 GIS 교육 프로그램을 운영합니다.
                    실무 경험이 풍부한 전문가가 직접 강의하며, 실습 중심의 교육을 제공합니다.
                  </p>
                  <ul className="v3-list">
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>QGIS 기초/심화 과정</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>ArcGIS 실무 과정</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>Python GIS 프로그래밍</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>웹 GIS 개발 과정</li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <EducationIllustration width={350} height={280} />
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-book me-2" style={{ color: 'var(--accent-sage)' }} />
              교육 과정
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-1-circle" />
                </div>
                <h4 className="v3-feature-title">입문 과정</h4>
                <p className="v3-feature-text">GIS 기초 개념 및 도구 사용법</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-2-circle" />
                </div>
                <h4 className="v3-feature-title">실무 과정</h4>
                <p className="v3-feature-text">실제 프로젝트 기반 실습</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-3-circle" />
                </div>
                <h4 className="v3-feature-title">개발 과정</h4>
                <p className="v3-feature-text">Python/웹 GIS 프로그래밍</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-4-circle" />
                </div>
                <h4 className="v3-feature-title">전문가 과정</h4>
                <p className="v3-feature-text">고급 분석 및 시스템 설계</p>
              </div>
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-star me-2" style={{ color: 'var(--accent-sage)' }} />
              교육 특징
            </h3>
            <div className="row g-4">
              <div className="col-md-4">
                <CloudCard className="h-100 text-center">
                  <CloudCardBody>
                    <div className="v3-feature-icon mx-auto mb-3">
                      <i className="bi bi-person-workspace" />
                    </div>
                    <h5 style={{ color: 'var(--v3-text-primary)' }}>실습 중심</h5>
                    <p className="v3-feature-text">이론 30% + 실습 70%</p>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-md-4">
                <CloudCard className="h-100 text-center">
                  <CloudCardBody>
                    <div className="v3-feature-icon mx-auto mb-3">
                      <i className="bi bi-people" />
                    </div>
                    <h5 style={{ color: 'var(--v3-text-primary)' }}>소수 정예</h5>
                    <p className="v3-feature-text">1:1 밀착 지도</p>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-md-4">
                <CloudCard className="h-100 text-center">
                  <CloudCardBody>
                    <div className="v3-feature-icon mx-auto mb-3">
                      <i className="bi bi-award" />
                    </div>
                    <h5 style={{ color: 'var(--v3-text-primary)' }}>수료증 발급</h5>
                    <p className="v3-feature-text">교육 이수 인증</p>
                  </CloudCardBody>
                </CloudCard>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/v3/contact" className="v3-btn v3-btn-sage">
              <i className="bi bi-telephone me-2" />
              교육 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
