'use client'; // 클라이언트 컴포넌트로 선언

import { useEffect } from 'react';
import Script from 'next/script';

// Kakao Maps SDK 타입 정의 (타입스크립트 사용 시)
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export default function ContactPage() {

  useEffect(() => {
    // 스크립트 로드 상태 확인 후 지도 로드 함수 실행
    // Kakao Maps SDK 스크립트가 이미 로드되었는지 확인
    // Script 컴포넌트의 onLoad를 사용하므로 useEffect 내에서는 즉시 실행 시도
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=d17e5ba09e7ac9feecd1d21a95e83042&autoload=false`} // autoload=false로 설정
        strategy="afterInteractive"
        onLoad={() => {
          // 스크립트 로드 완료 후 지도 생성 함수 호출
           if (window.kakao && window.kakao.maps) {
             window.kakao.maps.load(() => {
               const mapContainer = document.getElementById('map');
               if (!mapContainer) return; // mapContainer가 없으면 중단

               const mapOption = {
                 center: new window.kakao.maps.LatLng(37.66646028695495, 126.7498890599695),
                 level: 3
               };
               const map = new window.kakao.maps.Map(mapContainer, mapOption);
               const markerPosition = new window.kakao.maps.LatLng(37.66646028695495, 126.7498890599695);
               const marker = new window.kakao.maps.Marker({ position: markerPosition });
               marker.setMap(map);
               const iwContent = '<div style="padding:5px; text-align:center;">다한지리정보(주)<br><a href="https://map.kakao.com/link/map/다한지리정보(주),37.66646028695495,126.7498890599695" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/다한지리정보(주),37.66646028695495,126.7498890599695" style="color:blue" target="_blank">길찾기</a></div>';
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
      <div className="container py-5">
        <h1 className="display-5 fw-bold mb-4 text-center">연락처</h1>
        <p className="lead mb-5 text-center">다한지리정보(주)에 궁금한 점이 있으시면 언제든지 문의해주세요.</p>

        <div className="row g-5">
          <div className="col-md-6">
            <h2 className="h4 mb-3">연락 정보</h2>
            <ul className="list-unstyled mb-4">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                <strong>주소:</strong> 경기도 고양시 일산서구 킨텍스로 240, GIFC 오피스 2211호 (대화동, 킨텍스 꿈이그린)
              </li>
               <li className="mb-3">
                <i className="bi bi-globe me-2 text-primary"></i>
                <strong>웹사이트:</strong> <a href="https://www.dahangis.co.kr" className="text-decoration-none" target="_blank" rel="noopener noreferrer">www.dahangis.co.kr</a> {/* target blank 추가 */}
              </li>
              {/* 필요시 전화번호, 이메일 추가 */}
              {/*
              <li className="mb-3">
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                <strong>전화:</strong> <a href="tel:031-XXX-XXXX" className="text-decoration-none">031-XXX-XXXX</a>
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                <strong>이메일:</strong> <a href="mailto:info@dahangis.co.kr" className="text-decoration-none">info@dahangis.co.kr</a>
              </li>
              */}
            </ul>
            {/* Kakao Map Display Area */}
            <div id="map" className="rounded shadow mb-4" style={{ width: '100%', height: '400px' }}></div> {/* height 명시적 지정 */}
          </div>
          <div className="col-md-6">
            <h2 className="h4 mb-3">문의 양식</h2>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="673dfa82-13e5-4f01-9512-e51836b9dde9" />
              <input type="hidden" name="redirect" value="https://www.dahangis.co.kr/contact" /> {/* Next.js 경로로 수정 */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">이름</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">이메일</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">제목</label>
                <input type="text" className="form-control" id="subject" name="subject" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">내용</label>
                <textarea className="form-control" id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">문의하기</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
