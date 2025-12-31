'use client';

/**
 * Map 일러스트레이션 - 정밀 정사영상/지도 매핑
 * 드론 항공촬영과 지도 제작을 표현하는 SVG 일러스트
 */
interface MapIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function MapIllustration({
  className = '',
  width = 400,
  height = 300,
}: MapIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mapGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="mapGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="mapGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
      </defs>

      {/* 지도 베이스 */}
      <rect x="50" y="80" width="300" height="180" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#mapGradient2)" strokeWidth="2" />

      {/* 지도 그리드 */}
      <g stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <line x1="50" y1="120" x2="350" y2="120" />
        <line x1="50" y1="160" x2="350" y2="160" />
        <line x1="50" y1="200" x2="350" y2="200" />
        <line x1="100" y1="80" x2="100" y2="260" />
        <line x1="150" y1="80" x2="150" y2="260" />
        <line x1="200" y1="80" x2="200" y2="260" />
        <line x1="250" y1="80" x2="250" y2="260" />
        <line x1="300" y1="80" x2="300" y2="260" />
      </g>

      {/* 지형 표현 (폴리곤 영역) */}
      <path
        d="M70,140 Q100,110 140,130 Q180,150 200,120 Q240,100 280,140 Q300,160 320,130 L320,200 Q280,220 240,200 Q200,180 160,210 Q120,230 80,200 L70,140"
        fill="url(#mapGradient3)"
        opacity="0.3"
      />

      {/* 도로/경로 */}
      <path
        d="M80,180 Q120,150 180,170 Q240,190 300,160 L330,180"
        fill="none"
        stroke="url(#mapGradient1)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 위치 마커들 */}
      <g>
        {/* 마커 1 */}
        <g transform="translate(120, 130)">
          <path d="M0,-20 C-10,-20 -15,-10 -15,0 C-15,10 0,25 0,25 C0,25 15,10 15,0 C15,-10 10,-20 0,-20" fill="url(#mapGradient1)" />
          <circle cx="0" cy="-5" r="5" fill="white" />
          <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
        </g>

        {/* 마커 2 */}
        <g transform="translate(220, 150)">
          <path d="M0,-20 C-10,-20 -15,-10 -15,0 C-15,10 0,25 0,25 C0,25 15,10 15,0 C15,-10 10,-20 0,-20" fill="url(#mapGradient2)" />
          <circle cx="0" cy="-5" r="5" fill="white" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
        </g>

        {/* 마커 3 */}
        <g transform="translate(300, 120)">
          <path d="M0,-20 C-10,-20 -15,-10 -15,0 C-15,10 0,25 0,25 C0,25 15,10 15,0 C15,-10 10,-20 0,-20" fill="url(#mapGradient3)" />
          <circle cx="0" cy="-5" r="5" fill="white" />
          <animate attributeName="opacity" values="1;0.8;1" dur="1.8s" repeatCount="indefinite" />
        </g>
      </g>

      {/* 드론 아이콘 (상단) */}
      <g transform="translate(200, 40)">
        {/* 드론 몸체 */}
        <rect x="-15" y="-5" width="30" height="10" rx="3" fill="url(#mapGradient1)" />
        {/* 프로펠러 암 */}
        <line x1="-25" y1="0" x2="-35" y2="-10" stroke="white" strokeWidth="2" />
        <line x1="25" y1="0" x2="35" y2="-10" stroke="white" strokeWidth="2" />
        <line x1="-25" y1="0" x2="-35" y2="10" stroke="white" strokeWidth="2" />
        <line x1="25" y1="0" x2="35" y2="10" stroke="white" strokeWidth="2" />
        {/* 프로펠러 */}
        <circle cx="-35" cy="-10" r="8" fill="none" stroke="url(#mapGradient2)" strokeWidth="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 -35 -10" to="360 -35 -10" dur="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="35" cy="-10" r="8" fill="none" stroke="url(#mapGradient2)" strokeWidth="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 35 -10" to="360 35 -10" dur="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="-35" cy="10" r="8" fill="none" stroke="url(#mapGradient2)" strokeWidth="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 -35 10" to="360 -35 10" dur="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="35" cy="10" r="8" fill="none" stroke="url(#mapGradient2)" strokeWidth="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 35 10" to="360 35 10" dur="0.5s" repeatCount="indefinite" />
        </circle>
        {/* 카메라 */}
        <rect x="-5" y="5" width="10" height="8" rx="2" fill="url(#mapGradient2)" />
      </g>

      {/* 스캔 라인 (드론에서 지도로) */}
      <g stroke="url(#mapGradient2)" strokeWidth="1" strokeDasharray="5,5" opacity="0.5">
        <line x1="200" y1="55" x2="120" y2="110">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="55" x2="200" y2="80">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="55" x2="280" y2="100">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 축척 표시 */}
      <g transform="translate(280, 250)">
        <line x1="0" y1="0" x2="50" y2="0" stroke="white" strokeWidth="2" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="white" strokeWidth="2" />
        <line x1="50" y1="-3" x2="50" y2="3" stroke="white" strokeWidth="2" />
        <text x="25" y="15" textAnchor="middle" fill="white" fontSize="10" opacity="0.7">1km</text>
      </g>

      {/* 좌표 표시 */}
      <text x="60" y="275" fill="white" fontSize="9" opacity="0.5">N 37.5665° E 126.9780°</text>
    </svg>
  );
}
