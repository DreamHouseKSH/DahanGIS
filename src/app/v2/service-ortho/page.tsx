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

          {/* 제작 프로세스 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">
              <i className="bi bi-diagram-3 me-2" style={{ color: 'var(--v2-accent)' }} />
              제작 프로세스
            </h3>
            <div className="row g-3 justify-content-center">
              <div className="col-6 col-md-2">
                <div className="text-center p-3" style={{ background: 'var(--glass-bg)', borderRadius: '12px' }}>
                  <div className="v2-feature-icon mx-auto mb-2" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-clipboard-check" style={{ fontSize: '1.2rem' }} />
                  </div>
                  <h6 style={{ color: 'var(--v2-text-light)', fontSize: '0.85rem' }}>1. 촬영 계획</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 0 }}>대상 지역 분석<br />비행 경로 설정</p>
                </div>
              </div>
              <div className="col-6 col-md-2">
                <div className="text-center p-3" style={{ background: 'var(--glass-bg)', borderRadius: '12px' }}>
                  <div className="v2-feature-icon mx-auto mb-2" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-camera-reels" style={{ fontSize: '1.2rem' }} />
                  </div>
                  <h6 style={{ color: 'var(--v2-text-light)', fontSize: '0.85rem' }}>2. 데이터 취득</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 0 }}>항공/드론 촬영<br />GCP 측량</p>
                </div>
              </div>
              <div className="col-6 col-md-2">
                <div className="text-center p-3" style={{ background: 'var(--glass-bg)', borderRadius: '12px' }}>
                  <div className="v2-feature-icon mx-auto mb-2" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-cpu" style={{ fontSize: '1.2rem' }} />
                  </div>
                  <h6 style={{ color: 'var(--v2-text-light)', fontSize: '0.85rem' }}>3. 데이터 처리</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 0 }}>항공삼각측량<br />DEM/DSM 생성</p>
                </div>
              </div>
              <div className="col-6 col-md-2">
                <div className="text-center p-3" style={{ background: 'var(--glass-bg)', borderRadius: '12px' }}>
                  <div className="v2-feature-icon mx-auto mb-2" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-palette" style={{ fontSize: '1.2rem' }} />
                  </div>
                  <h6 style={{ color: 'var(--v2-text-light)', fontSize: '0.85rem' }}>4. 후처리</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 0 }}>색상 보정<br />모자이크 편집</p>
                </div>
              </div>
              <div className="col-6 col-md-2">
                <div className="text-center p-3" style={{ background: 'var(--glass-bg)', borderRadius: '12px' }}>
                  <div className="v2-feature-icon mx-auto mb-2" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-patch-check" style={{ fontSize: '1.2rem' }} />
                  </div>
                  <h6 style={{ color: 'var(--v2-text-light)', fontSize: '0.85rem' }}>5. 품질 검수</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: 0 }}>정확도 검증<br />최종 납품</p>
                </div>
              </div>
            </div>
          </div>

          {/* 정확도 및 품질 기준 */}
          <div className="v2-content-card mt-4">
            <h3 className="v2-content-title text-center mb-4">
              <i className="bi bi-rulers me-2" style={{ color: 'var(--v2-accent)' }} />
              정확도 및 품질 기준
            </h3>
            <p className="v2-content-text text-center mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
              국토교통부 공공측량 작업규정을 준수하여 최고 품질의 정사영상을 제공합니다.
            </p>
            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', background: 'var(--v2-accent)', color: 'white', borderRadius: '8px 0 0 8px', textAlign: 'left' }}>항목</th>
                    <th style={{ padding: '12px 16px', background: 'var(--v2-accent)', color: 'white', textAlign: 'center' }}>기준</th>
                    <th style={{ padding: '12px 16px', background: 'var(--v2-accent)', color: 'white', borderRadius: '0 8px 8px 0', textAlign: 'left' }}>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text-light)', borderRadius: '8px 0 0 8px' }}>공간 해상도 (GSD)</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text)', textAlign: 'center' }}>2cm ~ 50cm</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0' }}>고객 요구에 따라 협의</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text-light)', borderRadius: '8px 0 0 8px' }}>수평 위치 정확도</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text)', textAlign: 'center' }}>1 GSD 이하</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0' }}>RMSE 기준</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text-light)', borderRadius: '8px 0 0 8px' }}>수직 위치 정확도</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text)', textAlign: 'center' }}>1.5 GSD 이하</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0' }}>DEM/DSM 정확도 기반</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text-light)', borderRadius: '8px 0 0 8px' }}>데이터 포맷</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text)', textAlign: 'center' }}>GeoTIFF, ECW, JPG</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0' }}>고객 요구 포맷 지원</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text-light)', borderRadius: '8px 0 0 8px' }}>좌표계</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'var(--v2-text)', textAlign: 'center' }}>GRS80 / UTM-K 등</td>
                    <td style={{ padding: '12px 16px', background: 'var(--glass-bg)', color: 'rgba(255,255,255,0.7)', borderRadius: '0 8px 8px 0' }}>국가 표준 좌표계 지원</td>
                  </tr>
                </tbody>
              </table>
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
