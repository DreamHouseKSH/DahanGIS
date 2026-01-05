'use client';

/**
 * Hero 일러스트레이션 - Cloud Dancer 테마
 * 차분하고 평온한 느낌의 지구본과 데이터 연결 네트워크
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
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cloud Dancer 테마 그라디언트 */}
        <linearGradient id="v3HeroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3HeroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3HeroGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>

        {/* 부드러운 글로우 필터 */}
        <filter id="v3Glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 배경 원형 - 부드러운 글로우 */}
      <circle cx="250" cy="200" r="150" fill="url(#v3HeroGradient1)" opacity="0.06" />
      <circle cx="250" cy="200" r="120" fill="url(#v3HeroGradient1)" opacity="0.06" />

      {/* 지구본 (중앙) */}
      <g transform="translate(250, 200)">
        {/* 지구 외곽 */}
        <circle r="90" fill="none" stroke="url(#v3HeroGradient2)" strokeWidth="1.5" opacity="0.6" />
        <circle r="85" fill="rgba(123, 155, 155, 0.08)" />

        {/* 위도선 */}
        <ellipse rx="85" ry="30" fill="none" stroke="#8B9A8B" strokeWidth="0.8" opacity="0.3" />
        <ellipse rx="85" ry="60" fill="none" stroke="#8B9A8B" strokeWidth="0.6" opacity="0.2" />

        {/* 경도선 */}
        <ellipse rx="30" ry="85" fill="none" stroke="#8B9A8B" strokeWidth="0.8" opacity="0.3" />
        <ellipse rx="60" ry="85" fill="none" stroke="#8B9A8B" strokeWidth="0.6" opacity="0.2" />

        {/* 대륙 형태 (단순화) */}
        <path
          d="M-40,-30 Q-30,-50 -10,-40 Q10,-45 30,-35 Q45,-30 50,-15 Q55,5 45,20 Q35,40 15,45 Q-10,50 -30,35 Q-45,20 -50,0 Q-50,-20 -40,-30"
          fill="url(#v3HeroGradient1)"
          opacity="0.35"
        />
        <path
          d="M-70,10 Q-60,-5 -50,5 Q-40,15 -55,25 Q-65,30 -70,10"
          fill="url(#v3HeroGradient1)"
          opacity="0.35"
        />
      </g>

      {/* 데이터 포인트 (노드) - 부드러운 펄스 */}
      <g filter="url(#v3Glow)">
        <circle cx="180" cy="120" r="10" fill="url(#v3HeroGradient2)">
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="100" r="8" fill="url(#v3HeroGradient3)">
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="220" r="12" fill="url(#v3HeroGradient2)">
          <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="250" r="9" fill="url(#v3HeroGradient1)">
          <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="300" r="7" fill="url(#v3HeroGradient3)">
          <animate attributeName="opacity" values="0.75;0.6;0.75" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 연결선 - 부드러운 라인 */}
      <g stroke="#8B9A8B" strokeWidth="0.8" fill="none" opacity="0.35">
        <line x1="180" y1="120" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="320" y1="100" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3.2s" repeatCount="indefinite" />
        </line>
        <line x1="350" y1="220" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.8s" repeatCount="indefinite" />
        </line>
        <line x1="140" y1="250" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="280" y1="300" x2="250" y2="200">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 작은 파티클 효과 - 부드럽게 */}
      <g fill="#A99F94" opacity="0.4">
        <circle cx="100" cy="80" r="2">
          <animate attributeName="cy" values="80;72;80" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="150" r="2">
          <animate attributeName="cy" values="150;142;150" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="320" r="2">
          <animate attributeName="cy" values="320;312;320" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="320" r="2">
          <animate attributeName="cy" values="320;328;320" dur="4.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 궤도 링 - 미묘하게 */}
      <ellipse
        cx="250"
        cy="200"
        rx="160"
        ry="40"
        fill="none"
        stroke="url(#v3HeroGradient2)"
        strokeWidth="0.8"
        opacity="0.2"
        transform="rotate(-20, 250, 200)"
      />
      <ellipse
        cx="250"
        cy="200"
        rx="180"
        ry="50"
        fill="none"
        stroke="url(#v3HeroGradient3)"
        strokeWidth="0.6"
        opacity="0.15"
        transform="rotate(15, 250, 200)"
      />
    </svg>
  );
}
