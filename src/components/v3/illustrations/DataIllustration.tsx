'use client';

/**
 * Data 일러스트레이션 - Cloud Dancer 테마
 * GIS 데이터 구축을 표현하는 차분한 SVG 일러스트
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
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3DataGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3DataGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3DataGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
      </defs>

      {/* 데이터베이스 실린더 */}
      <g transform="translate(200, 150)">
        {/* 실린더 몸체 */}
        <ellipse cx="0" cy="-60" rx="80" ry="20" fill="url(#v3DataGradient1)" opacity="0.8" />
        <rect x="-80" y="-60" width="160" height="120" fill="url(#v3DataGradient1)" opacity="0.6" />
        <ellipse cx="0" cy="60" rx="80" ry="20" fill="url(#v3DataGradient1)" opacity="0.9" />

        {/* 데이터 레이어 표시 */}
        <ellipse cx="0" cy="-20" rx="80" ry="20" fill="none" stroke="#D4D1CA" strokeWidth="0.8" opacity="0.5" />
        <ellipse cx="0" cy="20" rx="80" ry="20" fill="none" stroke="#D4D1CA" strokeWidth="0.8" opacity="0.5" />

        {/* 데이터 아이콘들 */}
        <g fill="#E8E6E1" opacity="0.7">
          <rect x="-50" y="-50" width="30" height="6" rx="2" />
          <rect x="-50" y="-40" width="45" height="6" rx="2" />
          <rect x="-50" y="-30" width="25" height="6" rx="2" />
          <rect x="-50" y="-10" width="35" height="6" rx="2" />
          <rect x="-50" y="0" width="50" height="6" rx="2" />
          <rect x="-50" y="10" width="20" height="6" rx="2" />
          <rect x="-50" y="30" width="40" height="6" rx="2" />
          <rect x="-50" y="40" width="30" height="6" rx="2" />
        </g>

        {/* 플래그 아이콘 */}
        <g transform="translate(30, -40)">
          <circle cx="0" cy="0" r="8" fill="url(#v3DataGradient2)" />
          <circle cx="0" cy="0" r="5" fill="none" stroke="#E8E6E1" strokeWidth="1.5" />
        </g>
        <g transform="translate(40, 0)">
          <circle cx="0" cy="0" r="8" fill="url(#v3DataGradient3)" />
          <rect x="-3" y="-3" width="6" height="6" fill="#E8E6E1" rx="1" />
        </g>
        <g transform="translate(35, 40)">
          <circle cx="0" cy="0" r="8" fill="url(#v3DataGradient2)" />
          <polygon points="0,-4 4,3 -4,3" fill="#E8E6E1" />
        </g>
      </g>

      {/* 데이터 흐름 화살표 */}
      <g opacity="0.4">
        {/* 왼쪽 입력 */}
        <path d="M 50,100 Q 80,120 120,130" fill="none" stroke="url(#v3DataGradient2)" strokeWidth="1.5" strokeDasharray="4,4">
          <animate attributeName="stroke-dashoffset" values="8;0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="100" r="15" fill="url(#v3DataGradient2)" opacity="0.3" />
        <text x="50" y="104" textAnchor="middle" fill="#7A756C" fontSize="10">SHP</text>

        {/* 오른쪽 출력 */}
        <path d="M 280,130 Q 320,120 350,100" fill="none" stroke="url(#v3DataGradient3)" strokeWidth="1.5" strokeDasharray="4,4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle cx="350" cy="100" r="15" fill="url(#v3DataGradient3)" opacity="0.3" />
        <text x="350" y="104" textAnchor="middle" fill="#7A756C" fontSize="10">GDB</text>

        {/* 아래 입력 */}
        <path d="M 80,250 Q 120,230 140,210" fill="none" stroke="url(#v3DataGradient1)" strokeWidth="1.5" strokeDasharray="4,4">
          <animate attributeName="stroke-dashoffset" values="8;0" dur="1.8s" repeatCount="indefinite" />
        </path>
        <circle cx="80" cy="250" r="15" fill="url(#v3DataGradient1)" opacity="0.3" />
        <text x="80" y="254" textAnchor="middle" fill="#7A756C" fontSize="10">CSV</text>

        {/* 아래 출력 */}
        <path d="M 260,210 Q 280,230 320,250" fill="none" stroke="url(#v3DataGradient2)" strokeWidth="1.5" strokeDasharray="4,4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="1.8s" repeatCount="indefinite" />
        </path>
        <circle cx="320" cy="250" r="15" fill="url(#v3DataGradient2)" opacity="0.3" />
        <text x="320" y="254" textAnchor="middle" fill="#7A756C" fontSize="10">JSON</text>
      </g>

      {/* 품질 체크 마크 */}
      <g transform="translate(200, 50)">
        <circle r="20" fill="url(#v3DataGradient1)" opacity="0.8" />
        <path d="M -8,0 L -2,6 L 10,-6" fill="none" stroke="#E8E6E1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
