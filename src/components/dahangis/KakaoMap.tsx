'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

type KakaoPoint = object;
type KakaoMapInstance = object;
interface KakaoMarker { setMap: (map: KakaoMapInstance | null) => void }
interface KakaoMaps {
  load: (ready: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoPoint;
  Map: new (container: HTMLElement, options: { center: KakaoPoint; level: number }) => KakaoMapInstance;
  Marker: new (options: { position: KakaoPoint }) => KakaoMarker;
}
declare global { interface Window { kakao?: { maps: KakaoMaps } } }
const LAT = 37.666507660077144;
const LNG = 126.74992290345497;
const MAP_URL = `https://map.kakao.com/link/map/DahanGIS%20GIFC%202211%ED%98%B8,${LAT},${LNG}`;
type MapStatus = 'loading' | 'missing-key' | 'error' | 'ready';

export default function KakaoMap() {
  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY?.trim();
  const [status, setStatus] = useState<MapStatus>(key ? 'loading' : 'missing-key');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const markerRef = useRef<KakaoMarker | null>(null);
  const generation = useRef(0);

  const initializeMap = useCallback(() => {
    const container = containerRef.current;
    const maps = window.kakao?.maps;
    if (!container || !maps) { setStatus('error'); return; }
    const currentGeneration = generation.current;
    try {
      maps.load(() => {
        if (generation.current !== currentGeneration || containerRef.current !== container || !container.isConnected) return;
        if (mapRef.current) { setStatus('ready'); return; }
        try {
          const center = new maps.LatLng(LAT, LNG);
          mapRef.current = new maps.Map(container, { center, level: 4 });
          markerRef.current = new maps.Marker({ position: center });
          markerRef.current.setMap(mapRef.current);
          setStatus('ready');
        } catch { setStatus('error'); }
      });
    } catch { setStatus('error'); }
  }, []);

  useEffect(() => () => {
    generation.current += 1;
    markerRef.current?.setMap(null);
    markerRef.current = null;
    mapRef.current = null;
  }, []);
  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus((current) => current === 'loading' ? 'error' : current), 15000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const message = {
    loading: '지도를 불러오는 중입니다.',
    'missing-key': '아래 링크에서 회사 위치를 확인해주세요.',
    error: '지도를 불러오지 못했습니다. 아래 카카오맵 링크를 이용해주세요.',
    ready: '',
  }[status];

  return <>
    {key ? <Script id="dahangis-kakao-sdk" src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`} strategy="afterInteractive" onReady={initializeMap} onError={() => setStatus('error')} /> : null}
    <div className="dg-map-card">
      <div className="dg-map-stage">
        <div ref={containerRef} id="dg-kakao-map" className="dg-kakao-map" aria-label="DahanGIS 위치 지도" data-status={status} />
        {message ? <p className="dg-map-status" role="status">{message}</p> : null}
      </div>
      <div className="dg-address-chip">경기 고양시 일산서구 킨텍스로 240 · GIFC 2211호</div>
      <a className="dg-map-open" href={MAP_URL} target="_blank" rel="noopener noreferrer">카카오맵에서 열기 ↗</a>
    </div>
  </>;
}
