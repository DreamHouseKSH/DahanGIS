'use client';

import Script from 'next/script';
import { useCallback, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const ADDRESS = '경기 고양시 일산서구 킨텍스로 240';
const FALLBACK_LAT = 37.6680;
const FALLBACK_LNG = 126.7385;
type MapStatus = 'loading' | 'missing-key' | 'error' | 'ready';

export default function KakaoMap() {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const [mapStatus, setMapStatus] = useState<MapStatus>(kakaoKey ? 'loading' : 'missing-key');

  const initializeMap = useCallback(() => {
    if (!window.kakao?.maps) {
      setMapStatus('error');
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById('dg-kakao-map');
      if (!container) return;

      const render = (lat: number, lng: number) => {
        const center = new window.kakao.maps.LatLng(lat, lng);
        const map = new window.kakao.maps.Map(container, { center, level: 4 });
        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);
        setMapStatus('ready');
      };

      if (window.kakao.maps.services?.Geocoder) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(ADDRESS, (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            render(Number(result[0].y), Number(result[0].x));
            return;
          }
          render(FALLBACK_LAT, FALLBACK_LNG);
        });
        return;
      }

      render(FALLBACK_LAT, FALLBACK_LNG);
    });
  }, []);

  const mapMessage = {
    loading: '지도를 불러오는 중입니다.',
    'missing-key': '카카오맵 키 설정이 필요합니다.',
    error: '지도를 불러올 수 없습니다. 카카오 도메인 설정을 확인해주세요.',
    ready: '',
  }[mapStatus];

  return (
    <>
      {kakaoKey ? (
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`}
          strategy="afterInteractive"
          onLoad={initializeMap}
          onError={() => setMapStatus('error')}
        />
      ) : null}
      <div className="dg-map-card">
        <div id="dg-kakao-map" className="dg-kakao-map" aria-label="DahanGIS 위치 지도">
          {mapMessage ? <span>{mapMessage}</span> : null}
        </div>
        <div className="dg-address-chip">경기 고양시 일산서구 킨텍스로 240 · GIFC 2211호</div>
        <a
          className="dg-map-open"
          href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0+%EA%B3%A0%EC%96%91%EC%8B%9C+%EC%9D%BC%EC%82%B0%EC%84%9C%EA%B5%AC+%ED%82%A8%ED%85%8D%EC%8A%A4%EB%A1%9C+240"
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오맵에서 열기 ↗
        </a>
      </div>
    </>
  );
}
