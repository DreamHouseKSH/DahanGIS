'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';
import { ConsultingIllustration } from '../../../components/v3/illustrations';

/**
 * v3 GIS 컨설팅 서비스 페이지
 * Cloud Dancer 테마
 */
export default function V3ServiceConsultingPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      <PageHero
        title="GIS 컨설팅"
        subtitle="전문가의 분석과 전략 수립으로 최적의 GIS 솔루션을 제안합니다"
        breadcrumb="홈 > 서비스 > GIS 컨설팅"
      />

      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-lightbulb me-2" style={{ color: 'var(--accent-sage)' }} />
                    서비스 개요
                  </h3>
                  <p className="v3-content-text">
                    GIS 전문가가 고객의 비즈니스 요구사항을 분석하고, 최적의 공간정보 시스템 구축 전략을 수립합니다.
                    맞춤형 컨설팅으로 투자 대비 최대의 효과를 실현합니다.
                  </p>
                  <ul className="v3-list">
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>GIS 시스템 기획 컨설팅</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>공간정보 전략 수립</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>데이터 표준화 컨설팅</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>시스템 고도화 방안</li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <ConsultingIllustration width={350} height={280} />
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-diagram-3 me-2" style={{ color: 'var(--accent-sage)' }} />
              컨설팅 프로세스
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-search" />
                </div>
                <h4 className="v3-feature-title">1. 현황 분석</h4>
                <p className="v3-feature-text">기존 시스템 및 데이터 분석</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-list-check" />
                </div>
                <h4 className="v3-feature-title">2. 요구사항 정의</h4>
                <p className="v3-feature-text">비즈니스 요구사항 도출</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-pencil-square" />
                </div>
                <h4 className="v3-feature-title">3. 전략 수립</h4>
                <p className="v3-feature-text">최적 솔루션 설계</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-file-text" />
                </div>
                <h4 className="v3-feature-title">4. 보고서 제출</h4>
                <p className="v3-feature-text">상세 컨설팅 리포트</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/v3/contact" className="v3-btn v3-btn-sage">
              <i className="bi bi-telephone me-2" />
              상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
