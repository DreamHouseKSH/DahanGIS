'use client';

/**
 * Consulting 일러스트레이션 - GIS 컨설팅
 * 분석과 전략 수립을 표현하는 SVG 일러스트
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
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="consultGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="consultGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="consultGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
        <linearGradient id="consultGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fa709a" />
          <stop offset="100%" stopColor="#fee140" />
        </linearGradient>
      </defs>

      {/* 중앙 분석 보드 */}
      <g transform="translate(130, 50)">
        <rect width="180" height="200" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#consultGradient1)" strokeWidth="2" />

        {/* 보드 헤더 */}
        <rect x="0" y="0" width="180" height="35" rx="10" fill="url(#consultGradient1)" opacity="0.5" />
        <text x="90" y="23" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">GIS 분석 리포트</text>

        {/* 차트 영역 1: 파이 차트 */}
        <g transform="translate(50, 80)">
          <circle r="35" fill="none" stroke="url(#consultGradient2)" strokeWidth="8" strokeDasharray="55 165" transform="rotate(-90)" />
          <circle r="35" fill="none" stroke="url(#consultGradient3)" strokeWidth="8" strokeDasharray="45 175" strokeDashoffset="-55" transform="rotate(-90)" />
          <circle r="35" fill="none" stroke="url(#consultGradient4)" strokeWidth="8" strokeDasharray="35 185" strokeDashoffset="-100" transform="rotate(-90)" />
          <circle r="35" fill="none" stroke="url(#consultGradient1)" strokeWidth="8" strokeDasharray="85 135" strokeDashoffset="-135" transform="rotate(-90)" />
          <circle r="20" fill="rgba(255,255,255,0.1)" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10">100%</text>
        </g>

        {/* 차트 영역 2: 바 차트 */}
        <g transform="translate(100, 55)">
          <rect x="0" y="0" width="15" height="50" rx="2" fill="url(#consultGradient2)" opacity="0.7">
            <animate attributeName="height" values="30;50;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="20;0;20" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="10" width="15" height="40" rx="2" fill="url(#consultGradient3)" opacity="0.7">
            <animate attributeName="height" values="40;25;40" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="10;25;10" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="5" width="15" height="45" rx="2" fill="url(#consultGradient4)" opacity="0.7">
            <animate attributeName="height" values="45;35;45" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y" values="5;15;5" dur="1.8s" repeatCount="indefinite" />
          </rect>
          <rect x="60" y="15" width="15" height="35" rx="2" fill="url(#consultGradient1)" opacity="0.7">
            <animate attributeName="height" values="35;50;35" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="y" values="15;0;15" dur="2.2s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* 범례 */}
        <g transform="translate(20, 145)">
          <rect width="8" height="8" fill="url(#consultGradient2)" rx="2" />
          <text x="12" y="7" fill="white" fontSize="8" opacity="0.8">토지이용</text>

          <rect x="55" width="8" height="8" fill="url(#consultGradient3)" rx="2" />
          <text x="67" y="7" fill="white" fontSize="8" opacity="0.8">도로망</text>

          <rect x="105" width="8" height="8" fill="url(#consultGradient4)" rx="2" />
          <text x="117" y="7" fill="white" fontSize="8" opacity="0.8">인구</text>
        </g>

        {/* 라인 차트 */}
        <g transform="translate(20, 165)">
          <polyline
            points="0,25 30,15 60,20 90,5 120,10 140,0"
            fill="none"
            stroke="url(#consultGradient2)"
            strokeWidth="2"
          >
            <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2s" repeatCount="indefinite" />
          </polyline>
          <line x1="0" y1="25" x2="140" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>
      </g>

      {/* 왼쪽: 전문가/고객 아이콘 */}
      <g transform="translate(40, 100)">
        {/* 사람 아이콘 1 */}
        <circle cx="30" cy="20" r="18" fill="url(#consultGradient1)" opacity="0.3" />
        <circle cx="30" cy="15" r="10" fill="url(#consultGradient2)" />
        <path d="M15,45 Q15,30 30,30 Q45,30 45,45" fill="url(#consultGradient2)" />

        {/* 말풍선 */}
        <g transform="translate(55, 0)">
          <rect width="50" height="25" rx="5" fill="rgba(255,255,255,0.2)" />
          <polygon points="0,12 -8,8 -8,16" fill="rgba(255,255,255,0.2)" />
          <text x="25" y="16" textAnchor="middle" fill="white" fontSize="8">분석요청</text>
        </g>

        {/* 사람 아이콘 2 */}
        <g transform="translate(0, 80)">
          <circle cx="30" cy="20" r="18" fill="url(#consultGradient3)" opacity="0.3" />
          <circle cx="30" cy="15" r="10" fill="url(#consultGradient3)" />
          <path d="M15,45 Q15,30 30,30 Q45,30 45,45" fill="url(#consultGradient3)" />

          {/* 말풍선 */}
          <g transform="translate(55, 0)">
            <rect width="50" height="25" rx="5" fill="rgba(255,255,255,0.2)" />
            <polygon points="0,12 -8,8 -8,16" fill="rgba(255,255,255,0.2)" />
            <text x="25" y="16" textAnchor="middle" fill="white" fontSize="8">데이터</text>
          </g>
        </g>
      </g>

      {/* 오른쪽: 결과물 */}
      <g transform="translate(320, 80)">
        {/* 문서 아이콘 */}
        <g transform="translate(0, 0)">
          <rect width="60" height="70" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#consultGradient1)" strokeWidth="1" />
          <rect x="8" y="10" width="44" height="3" fill="white" opacity="0.5" />
          <rect x="8" y="18" width="35" height="3" fill="white" opacity="0.4" />
          <rect x="8" y="26" width="40" height="3" fill="white" opacity="0.4" />
          <rect x="8" y="40" width="44" height="20" fill="url(#consultGradient2)" opacity="0.3" />
          <text x="30" y="65" textAnchor="middle" fill="white" fontSize="7" opacity="0.7">분석보고서</text>
        </g>

        {/* 체크리스트 */}
        <g transform="translate(0, 90)">
          <rect width="60" height="70" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#consultGradient3)" strokeWidth="1" />
          <g transform="translate(8, 12)">
            <circle cx="5" cy="0" r="4" fill="url(#consultGradient3)" />
            <path d="M3,0 L5,2 L8,-2" stroke="white" strokeWidth="1.5" fill="none" />
            <rect x="15" y="-2" width="30" height="4" fill="white" opacity="0.4" />
          </g>
          <g transform="translate(8, 27)">
            <circle cx="5" cy="0" r="4" fill="url(#consultGradient3)" />
            <path d="M3,0 L5,2 L8,-2" stroke="white" strokeWidth="1.5" fill="none" />
            <rect x="15" y="-2" width="25" height="4" fill="white" opacity="0.4" />
          </g>
          <g transform="translate(8, 42)">
            <circle cx="5" cy="0" r="4" fill="url(#consultGradient3)" />
            <path d="M3,0 L5,2 L8,-2" stroke="white" strokeWidth="1.5" fill="none" />
            <rect x="15" y="-2" width="35" height="4" fill="white" opacity="0.4" />
          </g>
          <text x="30" y="65" textAnchor="middle" fill="white" fontSize="7" opacity="0.7">실행계획</text>
        </g>
      </g>

      {/* 연결 화살표 */}
      <g stroke="url(#consultGradient2)" strokeWidth="2" fill="none" opacity="0.5">
        <path d="M105,130 L130,130" markerEnd="url(#arrowhead)">
          <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M310,150 L320,150">
          <animate attributeName="stroke-dasharray" values="0,50;50,0" dur="1.5s" repeatCount="indefinite" />
        </path>
      </g>

      {/* 하단 프로세스 표시 */}
      <g transform="translate(100, 265)">
        <g>
          <circle cx="0" cy="0" r="12" fill="url(#consultGradient1)" />
          <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8">1</text>
          <text x="0" y="25" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">요구분석</text>
        </g>
        <line x1="15" y1="0" x2="55" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <g transform="translate(70, 0)">
          <circle cx="0" cy="0" r="12" fill="url(#consultGradient2)" />
          <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8">2</text>
          <text x="0" y="25" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">데이터분석</text>
        </g>
        <line x1="85" y1="0" x2="125" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <g transform="translate(140, 0)">
          <circle cx="0" cy="0" r="12" fill="url(#consultGradient3)" />
          <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8">3</text>
          <text x="0" y="25" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">전략수립</text>
        </g>
      </g>
    </svg>
  );
}
