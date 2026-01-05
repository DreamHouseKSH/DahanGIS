'use client';

/**
 * Consulting 일러스트레이션 - Cloud Dancer 테마
 * GIS 컨설팅을 표현하는 차분한 SVG 일러스트
 */
interface ConsultingIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function ConsultingIllustration({
  className = '',
  width = 400,
  height = 300,
}: ConsultingIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3ConsultGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3ConsultGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3ConsultGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
      </defs>

      {/* 차트/그래프 배경 */}
      <g transform="translate(200, 160)">
        {/* 메인 보드 */}
        <rect x="-130" y="-100" width="260" height="180" rx="12" fill="rgba(139, 154, 139, 0.08)" stroke="url(#v3ConsultGradient1)" strokeWidth="1" />

        {/* 그래프 영역 */}
        <g transform="translate(-100, -70)">
          {/* 축 */}
          <line x1="0" y1="120" x2="180" y2="120" stroke="#B8B4AC" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="120" stroke="#B8B4AC" strokeWidth="1" />

          {/* 가로 그리드 */}
          <g stroke="#D4D1CA" strokeWidth="0.5" opacity="0.5">
            <line x1="0" y1="30" x2="180" y2="30" />
            <line x1="0" y1="60" x2="180" y2="60" />
            <line x1="0" y1="90" x2="180" y2="90" />
          </g>

          {/* 막대 그래프 */}
          <g opacity="0.8">
            <rect x="20" y="50" width="25" height="70" rx="3" fill="url(#v3ConsultGradient1)">
              <animate attributeName="height" values="0;70;70" dur="1.5s" fill="freeze" />
              <animate attributeName="y" values="120;50;50" dur="1.5s" fill="freeze" />
            </rect>
            <rect x="55" y="30" width="25" height="90" rx="3" fill="url(#v3ConsultGradient2)">
              <animate attributeName="height" values="0;90;90" dur="1.5s" fill="freeze" begin="0.2s" />
              <animate attributeName="y" values="120;30;30" dur="1.5s" fill="freeze" begin="0.2s" />
            </rect>
            <rect x="90" y="70" width="25" height="50" rx="3" fill="url(#v3ConsultGradient3)">
              <animate attributeName="height" values="0;50;50" dur="1.5s" fill="freeze" begin="0.4s" />
              <animate attributeName="y" values="120;70;70" dur="1.5s" fill="freeze" begin="0.4s" />
            </rect>
            <rect x="125" y="20" width="25" height="100" rx="3" fill="url(#v3ConsultGradient1)">
              <animate attributeName="height" values="0;100;100" dur="1.5s" fill="freeze" begin="0.6s" />
              <animate attributeName="y" values="120;20;20" dur="1.5s" fill="freeze" begin="0.6s" />
            </rect>
          </g>

          {/* 추세선 */}
          <path
            d="M 32,50 L 67,30 L 102,70 L 137,20"
            fill="none"
            stroke="#9B8B7D"
            strokeWidth="2"
            strokeDasharray="200"
            strokeDashoffset="200"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" values="200;0" dur="2s" fill="freeze" begin="1s" />
          </path>
          <g opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" begin="2.5s" />
            <circle cx="32" cy="50" r="4" fill="#9B8B7D" />
            <circle cx="67" cy="30" r="4" fill="#9B8B7D" />
            <circle cx="102" cy="70" r="4" fill="#9B8B7D" />
            <circle cx="137" cy="20" r="4" fill="#9B8B7D" />
          </g>
        </g>
      </g>

      {/* 전략 아이콘들 */}
      <g opacity="0.6">
        {/* 왼쪽 아이콘 - 타겟 */}
        <g transform="translate(50, 80)">
          <circle r="25" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3ConsultGradient1)" strokeWidth="1" />
          <circle r="16" fill="none" stroke="url(#v3ConsultGradient1)" strokeWidth="1.5" opacity="0.7" />
          <circle r="8" fill="none" stroke="url(#v3ConsultGradient1)" strokeWidth="1.5" opacity="0.7" />
          <circle r="3" fill="url(#v3ConsultGradient1)" />
        </g>

        {/* 오른쪽 아이콘 - 전구 */}
        <g transform="translate(350, 80)">
          <circle r="25" fill="rgba(169, 159, 148, 0.1)" stroke="url(#v3ConsultGradient3)" strokeWidth="1" />
          <path
            d="M 0,-12 Q 10,-8 10,2 Q 10,8 5,10 L 5,14 L -5,14 L -5,10 Q -10,8 -10,2 Q -10,-8 0,-12"
            fill="url(#v3ConsultGradient3)"
            opacity="0.8"
          />
          <line x1="-4" y1="16" x2="4" y2="16" stroke="#9B8B7D" strokeWidth="1.5" />
          <line x1="-3" y1="18" x2="3" y2="18" stroke="#9B8B7D" strokeWidth="1.5" />
        </g>

        {/* 상단 아이콘 - 체크리스트 */}
        <g transform="translate(200, 30)">
          <rect x="-20" y="-15" width="40" height="30" rx="4" fill="rgba(123, 155, 155, 0.1)" stroke="url(#v3ConsultGradient2)" strokeWidth="1" />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#7B9B9B" strokeWidth="1.5" />
          <line x1="-12" y1="0" x2="8" y2="0" stroke="#7B9B9B" strokeWidth="1.5" />
          <line x1="-12" y1="6" x2="4" y2="6" stroke="#7B9B9B" strokeWidth="1.5" />
        </g>
      </g>

      {/* 연결선 */}
      <g stroke="#B8B4AC" strokeWidth="0.8" fill="none" opacity="0.35" strokeDasharray="3,3">
        <path d="M 75,80 Q 120,100 140,130" />
        <path d="M 325,80 Q 280,100 260,130" />
        <path d="M 200,45 L 200,60" />
      </g>
    </svg>
  );
}
