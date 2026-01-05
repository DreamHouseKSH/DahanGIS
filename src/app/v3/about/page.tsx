'use client';

import { FloatingClouds } from '../../../components/v3/CloudBackground';
import { PageHero } from '../../../components/v3/CloudHero';
import CloudCard, { CloudCardBody } from '../../../components/v3/CloudCard';

/**
 * v3 회사 소개 페이지
 * Cloud Dancer 테마 - 차분하고 평온한 디자인
 */
export default function V3AboutPage() {
  return (
    <div className="v3-page">
      <div className="v3-cloud-bg" />
      <FloatingClouds />

      {/* Hero */}
      <PageHero
        title="회사 소개"
        subtitle="공간정보 전문기업 다한지리정보(주)를 소개합니다"
        breadcrumb="홈 > 회사 소개"
      />

      {/* 회사 소개 섹션 */}
      <section className="v3-content-section">
        <div className="v3-container">
          <div className="row g-4">
            {/* 비전 */}
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-eye me-2" style={{ color: 'var(--accent-sage)' }} />
                    비전
                  </h3>
                  <p className="v3-content-text">
                    다한지리정보(주)는 &quot;공간정보의 미래를 선도한다&quot;는 비전 아래,
                    최첨단 GIS 기술과 전문 인력을 바탕으로 고객에게 최고의 가치를 제공합니다.
                  </p>
                  <p className="v3-content-text">
                    우리는 지속적인 기술 혁신과 품질 향상을 통해 공간정보 산업의 발전에 기여하고,
                    고객과 함께 성장하는 파트너가 되고자 합니다.
                  </p>
                </CloudCardBody>
              </CloudCard>
            </div>

            {/* 미션 */}
            <div className="col-lg-6">
              <CloudCard className="h-100">
                <CloudCardBody>
                  <h3 className="v3-content-title">
                    <i className="bi bi-bullseye me-2" style={{ color: 'var(--accent-sage)' }} />
                    미션
                  </h3>
                  <p className="v3-content-text">
                    정확하고 신뢰할 수 있는 공간정보 서비스를 통해 고객의 의사결정을 지원하고,
                    사회 발전에 기여합니다.
                  </p>
                  <ul className="v3-list">
                    <li>
                      <span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>
                      고품질 GIS 데이터 구축 및 서비스
                    </li>
                    <li>
                      <span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>
                      맞춤형 공간정보 솔루션 개발
                    </li>
                    <li>
                      <span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>
                      전문 인력 양성 및 기술 전수
                    </li>
                  </ul>
                </CloudCardBody>
              </CloudCard>
            </div>
          </div>

          {/* 우리의 접근 방식 */}
          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-compass me-2" style={{ color: 'var(--accent-sage)' }} />
              우리의 접근 방식
            </h3>
            <p className="v3-content-text text-center mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
              다한지리정보는 고객의 성공을 최우선 목표로 삼고, 다음과 같은 접근 방식을 통해 최상의 솔루션을 제공합니다.
            </p>
            <div className="row g-4">
              <div className="col-md-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '0.75rem' }}>
                      <i className="bi bi-person-check me-2" style={{ color: 'var(--accent-sage)' }} />
                      고객 중심 사고
                    </h5>
                    <p className="v3-content-text" style={{ fontSize: '0.95rem' }}>
                      고객의 비즈니스 목표와 당면 과제를 깊이 이해하고, 실제적인 가치를 창출하는 맞춤형 솔루션을 제안합니다.
                    </p>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-md-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '0.75rem' }}>
                      <i className="bi bi-graph-up me-2" style={{ color: 'var(--accent-sage)' }} />
                      데이터 기반 의사결정
                    </h5>
                    <p className="v3-content-text" style={{ fontSize: '0.95rem' }}>
                      정확하고 신뢰성 높은 공간 데이터 분석을 통해 객관적인 근거에 기반한 최적의 의사결정을 지원합니다.
                    </p>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-md-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '0.75rem' }}>
                      <i className="bi bi-rocket-takeoff me-2" style={{ color: 'var(--accent-sage)' }} />
                      기술 혁신과 적용
                    </h5>
                    <p className="v3-content-text" style={{ fontSize: '0.95rem' }}>
                      최신 GIS 기술 동향을 지속적으로 연구하고 검증하여, 가장 효과적이고 효율적인 기술을 선별하여 적용합니다.
                    </p>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-md-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '0.75rem' }}>
                      <i className="bi bi-headset me-2" style={{ color: 'var(--accent-sage)' }} />
                      지속적인 지원
                    </h5>
                    <p className="v3-content-text" style={{ fontSize: '0.95rem' }}>
                      솔루션 구축 이후에도 안정적인 운영과 지속적인 개선을 위한 기술 지원 및 유지보수 서비스를 제공합니다.
                    </p>
                  </CloudCardBody>
                </CloudCard>
              </div>
            </div>
          </div>

          {/* 기술력 및 전문성 */}
          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-cpu me-2" style={{ color: 'var(--accent-sage)' }} />
              기술력 및 전문성
            </h3>
            <p className="v3-content-text text-center mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
              다한지리정보는 최신 GIS 기술 트렌드를 선도하며, 혁신적인 솔루션을 제공하기 위해 끊임없이 연구 개발에 투자하고 있습니다.
            </p>
            <div className="row g-4">
              <div className="col-lg-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '1rem' }}>
                      <i className="bi bi-camera-reels me-2" style={{ color: 'var(--accent-sage)' }} />
                      정밀 측량 및 영상 처리
                    </h5>
                    <ul className="v3-list">
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>고해상도 항공/위성/드론 영상 처리</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>LiDAR 데이터 분석</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>정밀 GNSS 측량 기술</li>
                    </ul>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-lg-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '1rem' }}>
                      <i className="bi bi-database me-2" style={{ color: 'var(--accent-sage)' }} />
                      공간 데이터베이스 및 빅데이터
                    </h5>
                    <ul className="v3-list">
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>대용량 공간 데이터 처리</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>PostGIS, GeoServer 활용</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>Hadoop/Spark 연계 분석</li>
                    </ul>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-lg-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '1rem' }}>
                      <i className="bi bi-code-slash me-2" style={{ color: 'var(--accent-sage)' }} />
                      GIS 소프트웨어 개발
                    </h5>
                    <ul className="v3-list">
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>웹/모바일/데스크톱 GIS 애플리케이션</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>오픈소스 GIS (QGIS, OpenLayers)</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>상용 GIS (ArcGIS) 플랫폼</li>
                    </ul>
                  </CloudCardBody>
                </CloudCard>
              </div>
              <div className="col-lg-6">
                <CloudCard className="h-100">
                  <CloudCardBody>
                    <h5 style={{ color: 'var(--v3-text-primary)', marginBottom: '1rem' }}>
                      <i className="bi bi-robot me-2" style={{ color: 'var(--accent-sage)' }} />
                      AI 및 머신러닝
                    </h5>
                    <ul className="v3-list">
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>위성 영상 분석 자동화</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>객체 탐지 및 변화 탐지</li>
                      <li><span className="v3-list-icon"><i className="bi bi-check2" style={{ color: 'white', fontSize: '0.75rem' }} /></span>딥러닝 기반 분류 분석</li>
                    </ul>
                  </CloudCardBody>
                </CloudCard>
              </div>
            </div>
          </div>

          {/* 핵심 가치 */}
          <div className="v3-content-card mt-4">
            <h3 className="v3-content-title text-center mb-4">
              <i className="bi bi-star me-2" style={{ color: 'var(--accent-sage)' }} />
              핵심 가치
            </h3>
            <div className="v3-features-grid">
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-lightbulb" />
                </div>
                <h4 className="v3-feature-title">혁신</h4>
                <p className="v3-feature-text">끊임없는 기술 혁신</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-patch-check" />
                </div>
                <h4 className="v3-feature-title">신뢰</h4>
                <p className="v3-feature-text">정확하고 믿을 수 있는 서비스</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-hand-thumbs-up" />
                </div>
                <h4 className="v3-feature-title">고객 중심</h4>
                <p className="v3-feature-text">고객 만족을 최우선으로</p>
              </div>
              <div className="v3-feature-item">
                <div className="v3-feature-icon">
                  <i className="bi bi-people" />
                </div>
                <h4 className="v3-feature-title">협력</h4>
                <p className="v3-feature-text">함께 성장하는 파트너십</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
