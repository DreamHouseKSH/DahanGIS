'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';
import { SoftwareIllustration } from '../../../components/v3/illustrations';

/**
 * v3 GIS 소프트웨어 개발 서비스 페이지
 * Cloud Dancer 테마
 */
export default function V3ServiceSoftwarePage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      <PageHero
        title="GIS 소프트웨어 개발"
        subtitle="최신 기술 스택으로 맞춤형 웹/모바일 GIS 애플리케이션을 개발합니다"
        breadcrumb="홈 > 서비스 > GIS 소프트웨어"
      />

      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-code-slash me-2" style={{ color: 'var(--accent-sage)' }} />
                    서비스 개요
                  </h3>
                  <p className="v3-content-text">
                    React, Next.js, MapBox, OpenLayers 등 최신 기술 스택을 활용하여
                    고객의 요구사항에 맞는 맞춤형 GIS 솔루션을 개발합니다.
                  </p>
                  <ul className="v3-list">
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>웹 GIS 애플리케이션</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>모바일 GIS 앱 개발</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>공간분석 도구 개발</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>GIS API/서비스 구축</li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <SoftwareIllustration width={350} height={280} />
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-stack me-2" style={{ color: 'var(--accent-sage)' }} />
              기술 스택
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-globe" />
                </div>
                <h4 className="v3-feature-title">프론트엔드</h4>
                <p className="v3-feature-text">React, Next.js, TypeScript</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-map" />
                </div>
                <h4 className="v3-feature-title">지도 라이브러리</h4>
                <p className="v3-feature-text">MapBox, OpenLayers, Leaflet</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-server" />
                </div>
                <h4 className="v3-feature-title">백엔드</h4>
                <p className="v3-feature-text">Node.js, Python, GeoServer</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-database" />
                </div>
                <h4 className="v3-feature-title">데이터베이스</h4>
                <p className="v3-feature-text">PostgreSQL/PostGIS</p>
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
