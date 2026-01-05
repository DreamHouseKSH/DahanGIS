'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import { ServiceCard } from '../../../components/v3/CloudCard';
import {
  DroneIllustration,
  DataIllustration,
  ConsultingIllustration,
  SoftwareIllustration,
  EducationIllustration,
} from '../../../components/v3/illustrations';

/**
 * v3 서비스 개요 페이지
 * Cloud Dancer 테마 - 차분하고 평온한 디자인
 */
export default function V3ServicesPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      {/* Hero */}
      <PageHero
        title="서비스 개요"
        subtitle="다한지리정보(주)가 제공하는 전문 GIS 서비스를 소개합니다"
        breadcrumb="홈 > 서비스"
      />

      {/* 서비스 목록 */}
      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-services-grid">
            {/* 정밀 정사영상 */}
            <ServiceCard
              icon={<DroneIllustration width={100} height={75} />}
              title="정밀 정사영상 제작"
              description="드론 및 항공 촬영을 통한 고해상도 정사영상 제작. 정확한 지형정보를 기반으로 한 공간분석 솔루션을 제공합니다. GSD 2cm급 초정밀 영상부터 광역 촬영까지 다양한 요구사항에 대응합니다."
              link="/v3/service-ortho"
              linkText="자세히 보기"
            />

            {/* GIS 데이터 */}
            <ServiceCard
              icon={<DataIllustration width={100} height={75} />}
              title="GIS 데이터 구축"
              description="고품질 공간 데이터 구축 및 변환 서비스. 다양한 포맷 지원과 정확한 품질 검수로 신뢰할 수 있는 데이터를 제공합니다. Shapefile, GeoJSON, GDB 등 다양한 포맷을 지원합니다."
              link="/v3/service-data"
              linkText="자세히 보기"
            />

            {/* GIS 컨설팅 */}
            <ServiceCard
              icon={<ConsultingIllustration width={100} height={75} />}
              title="GIS 컨설팅"
              description="전문가의 분석과 전략 수립으로 최적의 GIS 솔루션을 제안합니다. 요구사항 분석부터 시스템 설계, 구현 전략까지 맞춤형 컨설팅으로 비즈니스 가치를 극대화하세요."
              link="/v3/service-consulting"
              linkText="자세히 보기"
            />

            {/* GIS 소프트웨어 */}
            <ServiceCard
              icon={<SoftwareIllustration width={100} height={75} />}
              title="GIS 소프트웨어 개발"
              description="웹/모바일 GIS 애플리케이션 개발. React, Next.js, MapBox, OpenLayers 등 최신 기술 스택과 풍부한 경험으로 맞춤형 GIS 솔루션을 구현합니다."
              link="/v3/service-software"
              linkText="자세히 보기"
            />

            {/* GIS 교육 */}
            <ServiceCard
              icon={<EducationIllustration width={100} height={75} />}
              title="GIS 교육"
              description="실무 중심의 GIS 교육 프로그램. 기초부터 고급까지 체계적인 커리큘럼으로 전문가를 양성합니다. QGIS, ArcGIS, Python GIS 등 다양한 과정을 운영합니다."
              link="/v3/service-education"
              linkText="자세히 보기"
            />
          </div>
        </div>
      </section>

      {/* 프로세스 */}
      <section className="v3-section">
        <div className="v3-container">
          <h2 className="v3-section-title">서비스 프로세스</h2>
          <p className="v3-section-subtitle">체계적인 프로세스로 최고의 결과물을 제공합니다</p>

          <div className="v3-content-card">
            <div className="row text-center">
              <div className="col-md-3 mb-4 mb-md-0">
                <div className="v3-feature-icon mx-auto" style={{ background: 'var(--gradient-sage)' }}>
                  <i className="bi bi-chat-dots" />
                </div>
                <h4 className="v3-feature-title mt-3">1. 상담</h4>
                <p className="v3-feature-text">요구사항 파악 및 상담</p>
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <div className="v3-feature-icon mx-auto" style={{ background: 'var(--gradient-warm)' }}>
                  <i className="bi bi-file-earmark-text" />
                </div>
                <h4 className="v3-feature-title mt-3">2. 기획</h4>
                <p className="v3-feature-text">분석 및 계획 수립</p>
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <div className="v3-feature-icon mx-auto" style={{ background: 'var(--gradient-sage)' }}>
                  <i className="bi bi-gear" />
                </div>
                <h4 className="v3-feature-title mt-3">3. 수행</h4>
                <p className="v3-feature-text">프로젝트 실행</p>
              </div>
              <div className="col-md-3">
                <div className="v3-feature-icon mx-auto" style={{ background: 'linear-gradient(135deg, #8B9A8B 0%, #7B9B9B 100%)' }}>
                  <i className="bi bi-check-circle" />
                </div>
                <h4 className="v3-feature-title mt-3">4. 납품</h4>
                <p className="v3-feature-text">검수 및 최종 납품</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-glass-card v3-glass-card-strong text-center" style={{ padding: '3rem 2rem' }}>
            <h3 className="v3-content-title">맞춤 서비스가 필요하신가요?</h3>
            <p className="v3-content-text mb-4">전문가와 상담하고 최적의 솔루션을 찾아보세요</p>
            <Link href="/v3/contact" className="v3-btn v3-btn-sage">
              <i className="bi bi-telephone me-2" />
              무료 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
