'use client';

import Link from 'next/link';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';
import { DroneIllustration, MapIllustration } from '../../../components/v2/illustrations';

/**
 * v2 정밀 정사영상 서비스 페이지
 */
export default function V2ServiceOrthoPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="정밀 정사영상 제작"
        subtitle="드론 및 항공 촬영을 통한 고해상도 정사영상 제작 서비스"
        breadcrumb="홈 > 서비스 > 정밀 정사영상"
      />

      {/* 서비스 소개 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="v2-content-card">
                <h3 className="v2-content-title">서비스 개요</h3>
                <p className="v2-content-text">
                  다한지리정보(주)의 정밀 정사영상 제작 서비스는 최신 드론 기술과
                  전문 인력을 활용하여 GSD 2cm급 초고해상도 영상부터 광역 촬영까지
                  다양한 요구사항에 대응합니다.
                </p>
                <p className="v2-content-text">
                  정확한 기준점 측량과 첨단 영상처리 기술을 통해
                  높은 정확도의 정사영상을 제공합니다.
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <DroneIllustration width={350} height={280} />
            </div>
          </div>

          {/* 주요 서비스 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">주요 서비스</h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-airplane" />
                </div>
                <h4 className="v2-feature-title">드론 촬영</h4>
                <p className="v2-feature-text">고해상도 드론 항공촬영</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-geo-alt" />
                </div>
                <h4 className="v2-feature-title">기준점 측량</h4>
                <p className="v2-feature-text">정밀 GPS/GNSS 측량</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-image" />
                </div>
                <h4 className="v2-feature-title">영상처리</h4>
                <p className="v2-feature-text">정사보정 및 모자이크</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-box" />
                </div>
                <h4 className="v2-feature-title">3D 모델링</h4>
                <p className="v2-feature-text">DSM/DEM 생성</p>
              </div>
            </div>
          </div>

          {/* 적용 분야 */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-layers me-2" style={{ color: 'var(--v2-accent)' }} />
                    적용 분야
                  </h3>
                  <ul className="v2-list">
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      도시계획 및 개발 사업
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      농업 및 환경 모니터링
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      재난재해 현황 파악
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      건설 현장 관리
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      문화재 및 시설물 기록
                    </li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-award me-2" style={{ color: 'var(--v2-accent)' }} />
                    서비스 강점
                  </h3>
                  <ul className="v2-list">
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-star" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      GSD 2cm급 초고해상도 촬영
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-star" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      수평/수직 정확도 5cm 이내
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-star" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      신속한 현장 투입 및 처리
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-star" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      다양한 출력 포맷 지원
                    </li>
                    <li>
                      <span className="v2-list-icon"><i className="bi bi-star" style={{ color: 'white', fontSize: '0.8rem' }} /></span>
                      철저한 품질 검수
                    </li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>

          {/* CTA */}
          <div className="v2-glass-card v2-glass-card-strong text-center mt-4" style={{ padding: '3rem 2rem' }}>
            <h3 className="v2-content-title">정밀 정사영상 서비스가 필요하신가요?</h3>
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
