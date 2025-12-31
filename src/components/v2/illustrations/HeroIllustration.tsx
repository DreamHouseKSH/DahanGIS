'use client';

/**
 * Hero 일러스트레이션 - 지구본과 데이터 연결 네트워크
 * 글로벌 GIS 네트워크를 표현하는 SVG 일러스트
 */
interface HeroIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function HeroIllustration({
  className = '',
  width = 500,
  height = 400,
}: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      width={width}
      height={height}
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 그라디언트 정의 */}
        <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="heroGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#f5576c" />
        </linearGradient>

        {/* 글로우 필터 */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 배경 원형 글로우 */}
      <circle cx="250" cy="200" r="150" fill="url(#heroGradient1)" opacity="0.1" />
      <circle cx="250" cy="200" r="120" fill="url(#heroGradient1)" opacity="0.1" />

      {/* 지구본 (중앙) */}
      <g transform="translate(250, 200)">
        {/* 지구 외곽 */}
        <circle r="90" fill="none" stroke="url(#heroGradient2)" strokeWidth="2" opacity="0.8" />
        <circle r="85" fill="rgba(79, 172, 254, 0.1)" />

        {/* 위도선 */}
        <ellipse rx="85" ry="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse rx="85" ry="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <ellipse rx="85" ry="85" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* 경도선 */}
        <ellipse rx="30" ry="85" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse rx="60" ry="85" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* 대륙 형태 (단순화) */}
        <path
          d="M-40,-30 Q-30,-50 -10,-40 Q10,-45 30,-35 Q45,-30 50,-15 Q55,5 45,20 Q35,40 15,45 Q-10,50 -30,35 Q-45,20 -50,0 Q-50,-20 -40,-30"
          fill="url(#heroGradient1)"
          opacity="0.4"
        />
        <path
          d="M-70,10 Q-60,-5 -50,5 Q-40,15 -55,25 Q-65,30 -70,10"
          fill="url(#heroGradient1)"
          opacity="0.4"
        />
      </g>

      {/* 데이터 포인트 (노드) */}
      <g filter="url(#glow)">
        {/* 노드 1 */}
        <circle cx="180" cy="120" r="12" fill="url(#heroGradient2)">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* 노드 2 */}
        <circle cx="320" cy="100" r="10" fill="url(#heroGradient3)">
          <animate attributeName="opacity" values="1;0.7;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* 노드 3 */}
        <circle cx="350" cy="220" r="14" fill="url(#heroGradient2)">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* 노드 4 */}
        <circle cx="140" cy="250" r="11" fill="url(#heroGradient1)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite" />
        </circle>
        {/* 노드 5 */}
        <circle cx="280" cy="300" r="9" fill="url(#heroGradient3)">
          <animate attributeName="opacity" values="1;0.8;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 연결선 */}
      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none">
        <line x1="180" y1="120" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="320" y1="100" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="350" y1="220" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1.8s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="250" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="280" y1="300" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 작은 파티클 효과 */}
      <g fill="white" opacity="0.6">
        <circle cx="100" cy="80" r="2">
          <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="150" r="2">
          <animate attributeName="cy" values="150;140;150" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="320" r="2">
          <animate attributeName="cy" values="320;310;320" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="320" r="2">
          <animate attributeName="cy" values="320;330;320" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 궤도 링 */}
      <ellipse
        cx="250"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke="url(#heroGradient2)"
        strokeWidth="1"
        opacity="0.3"
        transform="rotate(-20, 250, 200)"
      />
      <ellipse
        cx="250"
        cy="200"
        rx="180"
        ry="50"
        fill="none"
        stroke="url(#heroGradient3)"
        strokeWidth="1"
        opacity="0.2"
        transform="rotate(15, 250, 200)"
      />
    </svg>
  );
}
