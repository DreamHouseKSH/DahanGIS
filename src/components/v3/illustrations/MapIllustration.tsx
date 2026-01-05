'use client';

/**
 * Map 일러스트레이션 - Cloud Dancer 테마
 * 지도/정사영상을 표현하는 차분한 SVG 일러스트
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
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3MapGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3MapGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3MapGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
      </defs>

      {/* 지도 프레임 */}
      <g transform="translate(200, 150)">
        <rect x="-150" y="-100" width="300" height="200" rx="12" fill="rgba(139, 154, 139, 0.06)" stroke="url(#v3MapGradient1)" strokeWidth="1.5" />

        {/* 지형 레이어 */}
        <g opacity="0.4">
          {/* 산악 지형 */}
          <path
            d="M -140,-50 L -100,-80 L -60,-40 L -20,-70 L 20,-30 L 60,-60 L 100,-20 L 140,-50 L 140,90 L -140,90 Z"
            fill="url(#v3MapGradient1)"
            opacity="0.3"
          />
          {/* 강/수계 */}
          <path
            d="M -140,20 Q -100,0 -60,30 Q -20,50 20,20 Q 60,-10 100,30 Q 120,50 140,40"
            fill="none"
            stroke="url(#v3MapGradient2)"
            strokeWidth="3"
            opacity="0.5"
          />
        </g>

        {/* 그리드 오버레이 */}
        <g stroke="#B8B4AC" strokeWidth="0.5" opacity="0.3">
          <line x1="-150" y1="-50" x2="150" y2="-50" />
          <line x1="-150" y1="0" x2="150" y2="0" />
          <line x1="-150" y1="50" x2="150" y2="50" />
          <line x1="-100" y1="-100" x2="-100" y2="100" />
          <line x1="-50" y1="-100" x2="-50" y2="100" />
          <line x1="0" y1="-100" x2="0" y2="100" />
          <line x1="50" y1="-100" x2="50" y2="100" />
          <line x1="100" y1="-100" x2="100" y2="100" />
        </g>

        {/* 마커들 */}
        <g>
          <g transform="translate(-80, -30)">
            <circle r="8" fill="url(#v3MapGradient1)" opacity="0.8" />
            <circle r="4" fill="#E8E6E1" />
          </g>
          <g transform="translate(30, 20)">
            <circle r="10" fill="url(#v3MapGradient2)" opacity="0.8" />
            <circle r="5" fill="#E8E6E1" />
          </g>
          <g transform="translate(100, -50)">
            <circle r="6" fill="url(#v3MapGradient3)" opacity="0.8" />
            <circle r="3" fill="#E8E6E1" />
          </g>
          <g transform="translate(-40, 60)">
            <circle r="7" fill="url(#v3MapGradient1)" opacity="0.8" />
            <circle r="3.5" fill="#E8E6E1" />
          </g>
        </g>

        {/* 경로선 */}
        <path
          d="M -80,-30 Q -40,10 30,20 Q 70,-20 100,-50"
          fill="none"
          stroke="url(#v3MapGradient3)"
          strokeWidth="2"
          strokeDasharray="5,3"
          opacity="0.6"
        />
      </g>

      {/* 레이어 패널 */}
      <g transform="translate(50, 80)" opacity="0.6">
        <rect x="-30" y="-30" width="60" height="80" rx="6" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3MapGradient1)" strokeWidth="1" />

        {/* 레이어 아이템들 */}
        <g transform="translate(-20, -18)">
          <rect x="0" y="0" width="8" height="8" rx="1" fill="url(#v3MapGradient1)" />
          <rect x="12" y="2" width="25" height="4" rx="1" fill="#9A958C" />
        </g>
        <g transform="translate(-20, -2)">
          <rect x="0" y="0" width="8" height="8" rx="1" fill="url(#v3MapGradient2)" />
          <rect x="12" y="2" width="20" height="4" rx="1" fill="#9A958C" />
        </g>
        <g transform="translate(-20, 14)">
          <rect x="0" y="0" width="8" height="8" rx="1" fill="url(#v3MapGradient3)" />
          <rect x="12" y="2" width="28" height="4" rx="1" fill="#9A958C" />
        </g>
        <g transform="translate(-20, 30)">
          <rect x="0" y="0" width="8" height="8" rx="1" fill="#B8B4AC" opacity="0.5" />
          <rect x="12" y="2" width="18" height="4" rx="1" fill="#9A958C" />
        </g>
      </g>

      {/* 줌 컨트롤 */}
      <g transform="translate(350, 220)" opacity="0.5">
        <rect x="-15" y="-30" width="30" height="60" rx="4" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3MapGradient1)" strokeWidth="1" />
        <line x1="-6" y1="-15" x2="6" y2="-15" stroke="#7A756C" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-21" x2="0" y2="-9" stroke="#7A756C" strokeWidth="2" strokeLinecap="round" />
        <line x1="-6" y1="15" x2="6" y2="15" stroke="#7A756C" strokeWidth="2" strokeLinecap="round" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#B8B4AC" strokeWidth="1" />
      </g>

      {/* 스케일 바 */}
      <g transform="translate(200, 265)" opacity="0.5">
        <line x1="-50" y1="0" x2="50" y2="0" stroke="#7A756C" strokeWidth="1.5" />
        <line x1="-50" y1="-4" x2="-50" y2="4" stroke="#7A756C" strokeWidth="1.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#7A756C" strokeWidth="1" />
        <line x1="50" y1="-4" x2="50" y2="4" stroke="#7A756C" strokeWidth="1.5" />
        <text y="12" textAnchor="middle" fill="#7A756C" fontSize="9">1km</text>
      </g>
    </svg>
  );
}
