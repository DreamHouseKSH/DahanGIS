'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';
import { DataIllustration } from '../../../components/v3/illustrations';

/**
 * v3 GIS 데이터 구축 서비스 페이지
 * Cloud Dancer 테마
 */
export default function V3ServiceDataPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      <PageHero
        title="GIS 데이터 구축"
        subtitle="고품질 공간 데이터 구축 및 변환으로 신뢰할 수 있는 데이터를 제공합니다"
        breadcrumb="홈 > 서비스 > GIS 데이터 구축"
      />

      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-database me-2" style={{ color: 'var(--accent-sage)' }} />
                    서비스 개요
                  </h3>
                  <p className="v3-content-text">
                    다양한 소스의 공간 데이터를 수집, 가공, 변환하여 고품질의 GIS 데이터베이스를 구축합니다.
                    정확한 품질 검수로 신뢰할 수 있는 데이터를 제공합니다.
                  </p>
                  <ul className="v3-list">
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>수치지도 데이터 구축</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>주제도 데이터 제작</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>데이터 포맷 변환</li>
                    <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>품질 검수 및 보정</li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <DataIllustration width={350} height={280} />
            </div>
          </div>

          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-file-earmark-code me-2" style={{ color: 'var(--accent-sage)' }} />
              지원 포맷
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-file-earmark" />
                </div>
                <h4 className="v3-feature-title">Shapefile</h4>
                <p className="v3-feature-text">ESRI 표준 벡터 포맷</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-braces" />
                </div>
                <h4 className="v3-feature-title">GeoJSON</h4>
                <p className="v3-feature-text">웹 친화적 JSON 포맷</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-archive" />
                </div>
                <h4 className="v3-feature-title">GDB/GPKG</h4>
                <p className="v3-feature-text">지오데이터베이스</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-table" />
                </div>
                <h4 className="v3-feature-title">CSV/Excel</h4>
                <p className="v3-feature-text">좌표 데이터 변환</p>
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
