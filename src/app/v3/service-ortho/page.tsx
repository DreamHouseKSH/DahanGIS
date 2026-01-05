'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';
import { DroneIllustration } from '../../../components/v3/illustrations';

/**
 * v3 정밀 정사영상 서비스 페이지
 * Cloud Dancer 테마
 */
export default function V3ServiceOrthoPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      <PageHero
        title="정밀 정사영상 제작"
        subtitle="드론 및 항공 촬영을 통한 고해상도 정사영상으로 정확한 공간분석을 지원합니다"
        breadcrumb="홈 > 서비스 > 정밀 정사영상"
      />

      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-camera-video me-2" style={{ color: 'var(--accent-sage)' }} />
                    서비스 개요
                  </h3>
                  <p className="v3-content-text">
                    최신 드론과 항공 촬영 장비를 활용하여 GSD 2cm급 초정밀 영상부터 광역 촬영까지
                    다양한 요구사항에 맞는 정사영상을 제작합니다.
                  </p>
                  <ul className="v3-list">
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>드론/항공 촬영 계획 수립</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>고해상도 정사영상 제작</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>수치표고모델(DEM) 생성</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>3D 모델링 및 점군 데이터</li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <DroneIllustration width={350} height={280} />
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-gear me-2" style={{ color: 'var(--accent-sage)' }} />
              주요 장비 및 기술
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-airplane" />
                </div>
                <h4 className="v3-feature-title">고성능 드론</h4>
                <p className="v3-feature-text">DJI Matrice, Phantom 시리즈</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-camera" />
                </div>
                <h4 className="v3-feature-title">정밀 카메라</h4>
                <p className="v3-feature-text">1억 화소 고해상도 센서</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-geo-alt" />
                </div>
                <h4 className="v3-feature-title">RTK/PPK</h4>
                <p className="v3-feature-text">cm급 정밀 측위 시스템</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-pc-display" />
                </div>
                <h4 className="v3-feature-title">처리 소프트웨어</h4>
                <p className="v3-feature-text">Pix4D, Metashape</p>
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
