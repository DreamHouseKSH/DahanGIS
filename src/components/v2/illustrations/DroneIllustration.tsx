'use client';

/**
 * Drone 일러스트레이션 - 정밀 정사영상 제작
 * 드론 항공촬영을 표현하는 SVG 일러스트
 */
interface DroneIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function DroneIllustration({
  className = '',
  width = 400,
  height = 300,
}: DroneIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="droneGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="droneGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="droneGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#f5576c" />
        </linearGradient>
        <filter id="droneShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* 배경 구름 */}
      <g opacity="0.3">
        <ellipse cx="80" cy="60" rx="40" ry="20" fill="white" />
        <ellipse cx="100" cy="55" rx="30" ry="15" fill="white" />
        <ellipse cx="320" cy="80" rx="50" ry="25" fill="white" />
        <ellipse cx="350" cy="75" rx="35" ry="18" fill="white" />
      </g>

      {/* 드론 본체 */}
      <g transform="translate(200, 100)" filter="url(#droneShadow)">
        {/* 메인 바디 */}
        <rect x="-30" y="-12" width="60" height="24" rx="8" fill="url(#droneGradient1)" />

        {/* 프로펠러 암 */}
        <g stroke="url(#droneGradient2)" strokeWidth="4" strokeLinecap="round">
          <line x1="-30" y1="0" x2="-60" y2="-30" />
          <line x1="30" y1="0" x2="60" y2="-30" />
          <line x1="-30" y1="0" x2="-60" y2="30" />
          <line x1="30" y1="0" x2="60" y2="30" />
        </g>

        {/* 프로펠러 모터 하우징 */}
        <circle cx="-60" cy="-30" r="8" fill="url(#droneGradient1)" />
        <circle cx="60" cy="-30" r="8" fill="url(#droneGradient1)" />
        <circle cx="-60" cy="30" r="8" fill="url(#droneGradient1)" />
        <circle cx="60" cy="30" r="8" fill="url(#droneGradient1)" />

        {/* 프로펠러 (회전 애니메이션) */}
        <g opacity="0.6">
          <ellipse cx="-60" cy="-30" rx="20" ry="4" fill="url(#droneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 -60 -30" to="360 -60 -30" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="-30" rx="20" ry="4" fill="url(#droneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 60 -30" to="360 60 -30" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="-60" cy="30" rx="20" ry="4" fill="url(#droneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 -60 30" to="360 -60 30" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="30" rx="20" ry="4" fill="url(#droneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 60 30" to="360 60 30" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* 카메라/짐벌 */}
        <g transform="translate(0, 20)">
          <rect x="-12" y="0" width="24" height="15" rx="3" fill="url(#droneGradient2)" />
          <circle cx="0" cy="7" r="6" fill="#1a1a2e" />
          <circle cx="0" cy="7" r="4" fill="url(#droneGradient3)" />
        </g>

        {/* LED 표시등 */}
        <circle cx="-25" cy="-8" r="3" fill="#00ff00">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="-8" r="3" fill="#ff0000">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 촬영 범위 표시 (카메라 시야각) */}
      <g opacity="0.4">
        <polygon
          points="200,135 120,250 280,250"
          fill="url(#droneGradient2)"
          opacity="0.2"
        />
        <line x1="200" y1="135" x2="120" y2="250" stroke="url(#droneGradient2)" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="200" y1="135" x2="280" y2="250" stroke="url(#droneGradient2)" strokeWidth="1" strokeDasharray="5,5" />
      </g>

      {/* 지표면 (촬영 대상) */}
      <g transform="translate(0, 250)">
        {/* 지면 */}
        <rect x="80" y="0" width="240" height="40" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#droneGradient3)" strokeWidth="1" />

        {/* 그리드 (정사영상 타일) */}
        <g stroke="rgba(255,255,255,0.2)" strokeWidth="1">
          <line x1="120" y1="0" x2="120" y2="40" />
          <line x1="160" y1="0" x2="160" y2="40" />
          <line x1="200" y1="0" x2="200" y2="40" />
          <line x1="240" y1="0" x2="240" y2="40" />
          <line x1="280" y1="0" x2="280" y2="40" />
          <line x1="80" y1="20" x2="320" y2="20" />
        </g>

        {/* 촬영 진행 표시 */}
        <rect x="80" y="0" width="120" height="40" fill="url(#droneGradient2)" opacity="0.3">
          <animate attributeName="width" values="0;240;0" dur="4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* 데이터 전송 표시 */}
      <g transform="translate(320, 150)">
        <rect x="0" y="0" width="60" height="80" rx="5" fill="rgba(255,255,255,0.1)" stroke="url(#droneGradient1)" strokeWidth="1" />
        {/* 신호 아이콘 */}
        <g transform="translate(30, 25)">
          <path d="M-15,10 Q0,-10 15,10" fill="none" stroke="url(#droneGradient2)" strokeWidth="2" opacity="0.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
          </path>
          <path d="M-10,5 Q0,-5 10,5" fill="none" stroke="url(#droneGradient2)" strokeWidth="2" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </path>
          <path d="M-5,0 Q0,0 5,0" fill="none" stroke="url(#droneGradient2)" strokeWidth="2">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </g>
        {/* 데이터 아이콘 */}
        <g transform="translate(15, 50)" fill="white" opacity="0.7">
          <rect x="0" y="0" width="8" height="20" rx="2" />
          <rect x="12" y="5" width="8" height="15" rx="2" />
          <rect x="24" y="10" width="8" height="10" rx="2" />
        </g>
      </g>

      {/* GPS 위성 신호 */}
      <g transform="translate(50, 50)" opacity="0.5">
        <circle cx="0" cy="0" r="15" fill="none" stroke="url(#droneGradient2)" strokeWidth="1">
          <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="5" fill="url(#droneGradient2)" />
        <text x="20" y="5" fill="white" fontSize="10">GPS</text>
      </g>
    </svg>
  );
}
