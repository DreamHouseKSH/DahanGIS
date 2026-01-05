'use client';

import Link from 'next/link';
import { FloatingClouds } from '../../components/v3/CloudBackground';
import CloudHero, { HeroButton } from '../../components/v3/CloudHero';
import { ServiceCard } from '../../components/v3/CloudCard';
import {
  HeroIllustration,
  DroneIllustration,
  DataIllustration,
  ConsultingIllustration,
  SoftwareIllustration,
  EducationIllustration,
} from '../../components/v3/illustrations';

/**
 * v3 홈페이지
 * Cloud Dancer (2026년 팬톤 올해의 컬러) 테마
 * 차분함, 평온함, 균형감을 담은 디자인
 */
export default function V3HomePage() {
  return (
    <div className="v3-page">
      {/* 클라우드 댄서 배경 */}
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      {/* Hero 섹션 */}
      <CloudHero
        title="공간정보의 미래를 선도합니다"
        subtitle="다한지리정보(주)는 최첨단 GIS 기술로 정밀 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션을 제공합니다."
        illustration={<HeroIllustration width={450} height={360} />}
        ctaButtons={
          <>
            <HeroButton href="/v3/services" variant="sage">
              <i className="bi bi-grid-3x3-gap me-2" />
              서비스 살펴보기
            </HeroButton>
            <HeroButton href="/v3/contact" variant="outline">
              <i className="bi bi-envelope me-2" />
              문의하기
            </HeroButton>
          </>
        }
        centered={false}
      />

      {/* 서비스 섹션 */}
      <section className="v3-section">
        <div className="v3-container">
          <h2 className="v3-section-title">핵심 서비스</h2>
          <p className="v3-section-subtitle">
            다양한 분야의 GIS 전문 서비스를 제공합니다
          </p>

          <div className="v3-services-grid">
            {/* 정밀 정사영상 */}
            <ServiceCard
              icon={<DroneIllustration width={80} height={60} />}
              title="정밀 정사영상 제작"
              description="드론 및 항공 촬영을 통한 고해상도 정사영상 제작. 정확한 지형정보를 기반으로 한 공간분석 솔루션을 제공합니다."
              link="/v3/service-ortho"
              linkText="자세히 보기"
            />

            {/* GIS 데이터 */}
            <ServiceCard
              icon={<DataIllustration width={80} height={60} />}
              title="GIS 데이터 구축"
              description="고품질 공간 데이터 구축 및 변환 서비스. 다양한 포맷 지원과 정확한 품질 검수로 신뢰할 수 있는 데이터를 제공합니다."
              link="/v3/service-data"
              linkText="자세히 보기"
            />

            {/* GIS 컨설팅 */}
            <ServiceCard
              icon={<ConsultingIllustration width={80} height={60} />}
              title="GIS 컨설팅"
              description="전문가의 분석과 전략 수립으로 최적의 GIS 솔루션을 제안합니다. 맞춤형 컨설팅으로 비즈니스 가치를 극대화하세요."
              link="/v3/service-consulting"
              linkText="자세히 보기"
            />

            {/* GIS 소프트웨어 */}
            <ServiceCard
              icon={<SoftwareIllustration width={80} height={60} />}
              title="GIS 소프트웨어 개발"
              description="웹/모바일 GIS 애플리케이션 개발. 최신 기술 스택과 풍부한 경험으로 맞춤형 GIS 솔루션을 구현합니다."
              link="/v3/service-software"
              linkText="자세히 보기"
            />

            {/* GIS 교육 */}
            <ServiceCard
              icon={<EducationIllustration width={80} height={60} />}
              title="GIS 교육"
              description="실무 중심의 GIS 교육 프로그램. 기초부터 고급까지 체계적인 커리큘럼으로 전문가를 양성합니다."
              link="/v3/service-education"
              linkText="자세히 보기"
            />
          </div>
        </div>
      </section>

      {/* 강점 섹션 */}
      <section className="v3-section">
        <div className="v3-container">
          <h2 className="v3-section-title">왜 다한지리정보인가?</h2>
          <p className="v3-section-subtitle">
            20년 이상의 경험과 전문성으로 최고의 서비스를 제공합니다
          </p>

          <div className="v3-features-grid">
            <div className="v3-feature-item">
              <div className="v3-feature-icon">
                <i className="bi bi-award" />
              </div>
              <h4 className="v3-feature-title">검증된 전문성</h4>
              <p className="v3-feature-text">
                국가 공간정보 사업 다수 수행
              </p>
            </div>

            <div className="v3-feature-item">
              <div className="v3-feature-icon">
                <i className="bi bi-people" />
              </div>
              <h4 className="v3-feature-title">전문 인력</h4>
              <p className="v3-feature-text">
                GIS/측량 분야 전문가 보유
              </p>
            </div>

            <div className="v3-feature-item">
              <div className="v3-feature-icon">
                <i className="bi bi-gear" />
              </div>
              <h4 className="v3-feature-title">최신 장비</h4>
              <p className="v3-feature-text">
                최첨단 드론 및 측량 장비 운용
              </p>
            </div>

            <div className="v3-feature-item">
              <div className="v3-feature-icon">
                <i className="bi bi-shield-check" />
              </div>
              <h4 className="v3-feature-title">품질 보증</h4>
              <p className="v3-feature-text">
                철저한 품질 관리 시스템
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-glass-card v3-glass-card-strong text-center" style={{ padding: '4rem 2rem' }}>
            <h2 className="v3-section-title" style={{ marginBottom: '1rem' }}>
              프로젝트를 시작하시겠습니까?
            </h2>
            <p className="v3-section-subtitle" style={{ marginBottom: '2rem' }}>
              전문가와 상담하고 최적의 솔루션을 찾아보세요
            </p>
            <div className="v3-hero-cta" style={{ opacity: 1 }}>
              <Link href="/v3/contact" className="v3-btn v3-btn-sage">
                <i className="bi bi-telephone me-2" />
                무료 상담 신청
              </Link>
              <Link href="/v3/about" className="v3-btn v3-btn-outline">
                <i className="bi bi-building me-2" />
                회사 소개
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
