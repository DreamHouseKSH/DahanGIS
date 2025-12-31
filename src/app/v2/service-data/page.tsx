'use client';

import Link from 'next/link';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';
import { DataIllustration } from '../../../components/v2/illustrations';

/**
 * v2 GIS 데이터 구축 서비스 페이지
 */
export default function V2ServiceDataPage() {
  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Hero */}
      <PageHero
        title="GIS 데이터 구축"
        subtitle="고품질 공간 데이터 구축 및 변환 서비스"
        breadcrumb="홈 > 서비스 > GIS 데이터 구축"
      />

      {/* 서비스 소개 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="v2-content-card">
                <h3 className="v2-content-title">서비스 개요</h3>
                <p className="v2-content-text">
                  다한지리정보(주)는 다양한 공간 데이터의 구축, 변환, 정제 서비스를 제공합니다.
                  수치지도, 도면, 영상 등 다양한 원천 자료를 GIS 데이터로 변환하고
                  고객의 요구에 맞는 형식으로 가공합니다.
                </p>
                <p className="v2-content-text">
                  철저한 품질 검수 프로세스를 통해 신뢰할 수 있는 데이터를 제공합니다.
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <DataIllustration width={350} height={280} />
            </div>
          </div>

          {/* 데이터 유형 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">데이터 구축 유형</h3>
            <div className="v2-features-grid">
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-map" />
                </div>
                <h4 className="v2-feature-title">수치지형도</h4>
                <p className="v2-feature-text">1:1000~1:25000 수치지형도</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-building" />
                </div>
                <h4 className="v2-feature-title">건물/시설물</h4>
                <p className="v2-feature-text">건물 및 시설물 데이터베이스</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-signpost-split" />
                </div>
                <h4 className="v2-feature-title">도로/교통</h4>
                <p className="v2-feature-text">도로 네트워크 구축</p>
              </div>
              <div className="v2-feature-item">
                <div className="v2-feature-icon">
                  <i className="bi bi-tree" />
                </div>
                <h4 className="v2-feature-title">토지피복</h4>
                <p className="v2-feature-text">토지피복도 제작</p>
              </div>
            </div>
          </div>

          {/* 지원 포맷 */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-file-earmark-code me-2" style={{ color: 'var(--v2-accent)' }} />
                    지원 포맷
                  </h3>
                  <div className="row">
                    <div className="col-6">
                      <ul className="v2-list">
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>Shapefile (.shp)</li>
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>GeoJSON</li>
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>File GDB</li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="v2-list">
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>KML/KMZ</li>
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>GeoPackage</li>
                        <li><span className="v2-list-icon"><i className="bi bi-file" style={{ color: 'white', fontSize: '0.7rem' }} /></span>PostGIS</li>
                      </ul>
                    </div>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title">
                    <i className="bi bi-shield-check me-2" style={{ color: 'var(--v2-accent)' }} />
                    품질 관리
                  </h3>
                  <ul className="v2-list">
                    <li><span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>위상 오류 검사</li>
                    <li><span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>속성 무결성 검증</li>
                    <li><span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>좌표계 정확성 확인</li>
                    <li><span className="v2-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.8rem' }} /></span>품질 검수 보고서 제공</li>
                  </ul>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>

          {/* CTA */}
          <div className="v2-glass-card v2-glass-card-strong text-center mt-4" style={{ padding: '3rem 2rem' }}>
            <h3 className="v2-content-title">GIS 데이터 구축 서비스가 필요하신가요?</h3>
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
