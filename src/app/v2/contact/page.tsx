'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { FloatingOrbs } from '../../../components/v2/GradientBackground';
import { PageHero } from '../../../components/v2/GlassHero';
import GlassCard, { GlassCardBody } from '../../../components/v2/GlassCard';

// Kakao Maps SDK 타입 정의
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

/**
 * v2 문의 페이지
 * v1과 동일한 연락처 정보 + 카카오맵 + Glassmorphism 스타일
 */
export default function V2ContactPage() {
  useEffect(() => {
    // 카카오맵 초기화는 Script onLoad에서 처리
  }, []);

  return (
    <div className="v2-page">
      <div className="v2-gradient-bg" />
      <FloatingOrbs />

      {/* Kakao Maps SDK */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=d17e5ba09e7ac9feecd1d21a95e83042&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              const mapContainer = document.getElementById('v2-map');
              if (!mapContainer) return;

              const mapOption = {
                center: new window.kakao.maps.LatLng(37.66646028695495, 126.7498890599695),
                level: 3
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOption);
              const markerPosition = new window.kakao.maps.LatLng(37.66646028695495, 126.7498890599695);
              const marker = new window.kakao.maps.Marker({ position: markerPosition });
              marker.setMap(map);
              const iwContent = '<div style="padding:8px 12px; text-align:center; font-size:13px;">다한지리정보(주)<br><a href="https://map.kakao.com/link/map/다한지리정보(주),37.66646028695495,126.7498890599695" style="color:#667eea" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/다한지리정보(주),37.66646028695495,126.7498890599695" style="color:#667eea" target="_blank">길찾기</a></div>';
              const iwPosition = new window.kakao.maps.LatLng(37.66646028695495, 126.7498890599695);
              const infowindow = new window.kakao.maps.InfoWindow({ position: iwPosition, content: iwContent });
              infowindow.open(map, marker);
            });
          }
        }}
        onError={(e) => {
          console.error('Kakao Maps SDK 로드 실패:', e);
        }}
      />

      {/* Hero */}
      <PageHero
        title="문의하기"
        subtitle="다한지리정보(주)에 궁금한 점이 있으시면 언제든지 문의해주세요."
        breadcrumb="홈 > 문의"
      />

      {/* 문의 섹션 */}
      <section className="v2-content-section">
        <div className="v2-container">
          <div className="row g-4">
            {/* 연락처 정보 및 지도 */}
            <div className="col-lg-6">
              <GlassCard className="mb-4">
                <GlassCardBody>
                  <h3 className="v2-content-title mb-4">
                    <i className="bi bi-building me-2" style={{ color: 'var(--v2-accent)' }} />
                    연락 정보
                  </h3>

                  <div className="mb-4">
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--v2-accent)' }} />
                      주소
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginLeft: '1.75rem', lineHeight: '1.7' }}>
                      경기도 고양시 일산서구 킨텍스로 240,<br />
                      GIFC 오피스 2211호<br />
                      (대화동, 킨텍스 꿈에그린)
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 style={{ color: 'var(--v2-text-light)', fontSize: '1rem' }}>
                      <i className="bi bi-globe me-2" style={{ color: 'var(--v2-accent)' }} />
                      웹사이트
                    </h5>
                    <p style={{ marginLeft: '1.75rem' }}>
                      <a
                        href="https://www.dahangis.co.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--v2-accent)', textDecoration: 'none' }}
                      >
                        www.dahangis.co.kr
                      </a>
                    </p>
                  </div>
                </GlassCardBody>
              </GlassCard>

              {/* 카카오맵 */}
              <GlassCard>
                <GlassCardBody style={{ padding: '1rem' }}>
                  <h4 style={{ color: 'var(--v2-text-light)', fontSize: '1rem', marginBottom: '1rem' }}>
                    <i className="bi bi-map me-2" style={{ color: 'var(--v2-accent)' }} />
                    오시는 길
                  </h4>
                  <div
                    id="v2-map"
                    style={{
                      width: '100%',
                      height: '350px',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                  />
                </GlassCardBody>
              </GlassCard>
            </div>

            {/* 문의 폼 */}
            <div className="col-lg-6">
              <GlassCard className="h-100">
                <GlassCardBody>
                  <h3 className="v2-content-title mb-4">
                    <i className="bi bi-envelope me-2" style={{ color: 'var(--v2-accent)' }} />
                    문의 양식
                  </h3>
                  <form action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="673dfa82-13e5-4f01-9512-e51836b9dde9" />
                    <input type="hidden" name="redirect" value="https://www.dahangis.co.kr/v2/contact" />

                    <div className="mb-3">
                      <label className="v2-form-label">이름 *</label>
                      <input
                        type="text"
                        className="form-control v2-form-control"
                        name="name"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="v2-form-label">이메일 *</label>
                      <input
                        type="email"
                        className="form-control v2-form-control"
                        name="email"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="v2-form-label">제목 *</label>
                      <input
                        type="text"
                        className="form-control v2-form-control"
                        name="subject"
                        placeholder="제목을 입력하세요"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="v2-form-label">문의 내용 *</label>
                      <textarea
                        className="form-control v2-form-control"
                        name="message"
                        rows={6}
                        placeholder="문의 내용을 상세히 입력해 주세요"
                        required
                      />
                    </div>

                    <button type="submit" className="v2-btn v2-btn-gradient w-100">
                      <i className="bi bi-send me-2" />
                      문의하기
                    </button>
                  </form>
                </GlassCardBody>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
