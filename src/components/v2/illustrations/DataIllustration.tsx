'use client';

/**
 * Data 일러스트레이션 - GIS 데이터 구축
 * 데이터베이스와 레이어 구조를 표현하는 SVG 일러스트
 */
interface DataIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function DataIllustration({
  className = '',
  width = 400,
  height = 300,
}: DataIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dataGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="dataGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="dataGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
        <linearGradient id="dataGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fa709a" />
          <stop offset="100%" stopColor="#fee140" />
        </linearGradient>
      </defs>

      {/* 데이터베이스 실린더 (중앙) */}
      <g transform="translate(200, 150)">
        {/* 하단 타원 */}
        <ellipse cx="0" cy="60" rx="70" ry="20" fill="url(#dataGradient1)" opacity="0.5" />

        {/* 실린더 몸체 */}
        <rect x="-70" y="-40" width="140" height="100" fill="url(#dataGradient1)" opacity="0.3" />

        {/* 측면 그라데이션 효과 */}
        <path
          d="M-70,-40 L-70,60 A70,20 0 0,0 70,60 L70,-40"
          fill="none"
          stroke="url(#dataGradient2)"
          strokeWidth="2"
        />

        {/* 상단 타원 */}
        <ellipse cx="0" cy="-40" rx="70" ry="20" fill="url(#dataGradient1)" />
        <ellipse cx="0" cy="-40" rx="70" ry="20" fill="none" stroke="url(#dataGradient2)" strokeWidth="2" />

        {/* 데이터 레이어 라인들 */}
        <ellipse cx="0" cy="-10" rx="65" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="0" cy="20" rx="65" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* 데이터 흐름 표시 */}
        <g>
          <circle cx="0" cy="-40" r="3" fill="white">
            <animate attributeName="cy" values="-40;60;-40" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="-30" cy="-40" r="2" fill="white">
            <animate attributeName="cy" values="-40;60;-40" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="-40" r="2" fill="white">
            <animate attributeName="cy" values="-40;60;-40" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* 레이어 카드들 (좌측) */}
      <g transform="translate(50, 80)">
        {/* 레이어 1: 도로 */}
        <g transform="translate(0, 0)">
          <rect width="80" height="50" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#dataGradient2)" strokeWidth="1" />
          <line x1="10" y1="25" x2="70" y2="25" stroke="url(#dataGradient2)" strokeWidth="2" />
          <line x1="20" y1="20" x2="60" y2="30" stroke="url(#dataGradient2)" strokeWidth="2" opacity="0.5" />
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">도로</text>
        </g>

        {/* 레이어 2: 건물 */}
        <g transform="translate(0, 60)">
          <rect width="80" height="50" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#dataGradient3)" strokeWidth="1" />
          <rect x="15" y="15" width="20" height="25" fill="url(#dataGradient3)" opacity="0.5" />
          <rect x="45" y="20" width="15" height="20" fill="url(#dataGradient3)" opacity="0.5" />
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">건물</text>
        </g>

        {/* 레이어 3: 수계 */}
        <g transform="translate(0, 120)">
          <rect width="80" height="50" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#dataGradient4)" strokeWidth="1" />
          <path d="M10,30 Q25,20 40,30 Q55,40 70,25" fill="none" stroke="url(#dataGradient4)" strokeWidth="2" />
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">수계</text>
        </g>
      </g>

      {/* 연결선 (레이어 → DB) */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5">
        <line x1="130" y1="105" x2="145" y2="130">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="130" y1="165" x2="145" y2="150">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="130" y1="225" x2="145" y2="180">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 출력 데이터 (우측) */}
      <g transform="translate(290, 60)">
        {/* 속성 테이블 */}
        <rect width="90" height="80" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#dataGradient1)" strokeWidth="1" />
        <text x="45" y="15" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">속성 테이블</text>

        {/* 테이블 헤더 */}
        <rect x="5" y="20" width="80" height="15" fill="url(#dataGradient1)" opacity="0.3" />
        <text x="20" y="30" fill="white" fontSize="7">ID</text>
        <text x="45" y="30" fill="white" fontSize="7">Name</text>
        <text x="72" y="30" fill="white" fontSize="7">Type</text>

        {/* 테이블 행들 */}
        <g fill="white" fontSize="6" opacity="0.7">
          <text x="20" y="45">001</text>
          <text x="45" y="45">도로A</text>
          <text x="72" y="45">Line</text>

          <text x="20" y="55">002</text>
          <text x="45" y="55">건물B</text>
          <text x="72" y="55">Poly</text>

          <text x="20" y="65">003</text>
          <text x="45" y="65">하천C</text>
          <text x="72" y="65">Line</text>
        </g>
      </g>

      {/* GeoJSON/Format 출력 */}
      <g transform="translate(290, 155)">
        <rect width="90" height="70" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#dataGradient2)" strokeWidth="1" />
        <text x="45" y="15" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">출력 형식</text>

        {/* 포맷 아이콘들 */}
        <g transform="translate(15, 30)">
          <rect width="25" height="20" rx="3" fill="url(#dataGradient2)" opacity="0.5" />
          <text x="12.5" y="14" textAnchor="middle" fill="white" fontSize="7">SHP</text>
        </g>
        <g transform="translate(50, 30)">
          <rect width="25" height="20" rx="3" fill="url(#dataGradient3)" opacity="0.5" />
          <text x="12.5" y="14" textAnchor="middle" fill="white" fontSize="7">JSON</text>
        </g>
        <g transform="translate(15, 55)">
          <rect width="25" height="12" rx="3" fill="url(#dataGradient4)" opacity="0.5" />
          <text x="12.5" y="9" textAnchor="middle" fill="white" fontSize="6">GDB</text>
        </g>
        <g transform="translate(50, 55)">
          <rect width="25" height="12" rx="3" fill="url(#dataGradient1)" opacity="0.5" />
          <text x="12.5" y="9" textAnchor="middle" fill="white" fontSize="6">KML</text>
        </g>
      </g>

      {/* 연결선 (DB → 출력) */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5">
        <line x1="270" y1="120" x2="290" y2="100">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="270" y1="160" x2="290" y2="180">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 품질 검수 표시 */}
      <g transform="translate(180, 250)">
        <rect x="0" y="0" width="80" height="30" rx="5" fill="rgba(67, 233, 123, 0.2)" stroke="url(#dataGradient3)" strokeWidth="1" />
        <circle cx="15" cy="15" r="8" fill="url(#dataGradient3)" />
        <path d="M11,15 L14,18 L20,12" stroke="white" strokeWidth="2" fill="none" />
        <text x="50" y="18" fill="white" fontSize="9">검수 완료</text>
      </g>
    </svg>
  );
}
