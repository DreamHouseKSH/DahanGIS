'use client';

import Script from 'next/script';
import { useCallback, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const DAHANGIS_LAT = 37.666507660077144;
const DAHANGIS_LNG = 126.74992290345497;
const KAKAO_MAP_URL = `https://map.kakao.com/link/map/DahanGIS%20GIFC%202211%ED%98%B8,${DAHANGIS_LAT},${DAHANGIS_LNG}`;
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

      const center = new window.kakao.maps.LatLng(DAHANGIS_LAT, DAHANGIS_LNG);
      const map = new window.kakao.maps.Map(container, { center, level: 4 });
      const marker = new window.kakao.maps.Marker({ position: center });
      marker.setMap(map);
      setMapStatus('ready');
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
          href={KAKAO_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오맵에서 열기 ↗
        </a>
      </div>
    </>
  );
}
