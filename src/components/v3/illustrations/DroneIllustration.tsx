'use client';

/**
 * Drone 일러스트레이션 - Cloud Dancer 테마
 * 차분한 색조의 드론 항공촬영 SVG 일러스트
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
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3DroneGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3DroneGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3DroneGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
        <filter id="v3DroneShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3A3835" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 배경 구름 */}
      <g opacity="0.25">
        <ellipse cx="80" cy="60" rx="40" ry="20" fill="#D4D1CA" />
        <ellipse cx="100" cy="55" rx="30" ry="15" fill="#D4D1CA" />
        <ellipse cx="320" cy="80" rx="50" ry="25" fill="#D4D1CA" />
        <ellipse cx="350" cy="75" rx="35" ry="18" fill="#D4D1CA" />
      </g>

      {/* 드론 본체 */}
      <g transform="translate(200, 100)" filter="url(#v3DroneShadow)">
        {/* 메인 바디 */}
        <rect x="-30" y="-12" width="60" height="24" rx="8" fill="url(#v3DroneGradient1)" />

        {/* 프로펠러 암 */}
        <g stroke="url(#v3DroneGradient2)" strokeWidth="3.5" strokeLinecap="round">
          <line x1="-30" y1="0" x2="-60" y2="-30" />
          <line x1="30" y1="0" x2="60" y2="-30" />
          <line x1="-30" y1="0" x2="-60" y2="30" />
          <line x1="30" y1="0" x2="60" y2="30" />
        </g>

        {/* 프로펠러 모터 하우징 */}
        <circle cx="-60" cy="-30" r="7" fill="url(#v3DroneGradient1)" />
        <circle cx="60" cy="-30" r="7" fill="url(#v3DroneGradient1)" />
        <circle cx="-60" cy="30" r="7" fill="url(#v3DroneGradient1)" />
        <circle cx="60" cy="30" r="7" fill="url(#v3DroneGradient1)" />

        {/* 프로펠러 (회전 애니메이션) */}
        <g opacity="0.5">
          <ellipse cx="-60" cy="-30" rx="18" ry="3.5" fill="url(#v3DroneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 -60 -30" to="360 -60 -30" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="-30" rx="18" ry="3.5" fill="url(#v3DroneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 60 -30" to="360 60 -30" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="-60" cy="30" rx="18" ry="3.5" fill="url(#v3DroneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 -60 30" to="360 -60 30" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="30" rx="18" ry="3.5" fill="url(#v3DroneGradient2)">
            <animateTransform attributeName="transform" type="rotate" from="0 60 30" to="360 60 30" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* 카메라/짐벌 */}
        <g transform="translate(0, 20)">
          <rect x="-12" y="0" width="24" height="14" rx="3" fill="url(#v3DroneGradient2)" />
          <circle cx="0" cy="7" r="5" fill="#3A3835" />
          <circle cx="0" cy="7" r="3.5" fill="url(#v3DroneGradient3)" />
        </g>

        {/* LED 표시등 */}
        <circle cx="-25" cy="-8" r="2.5" fill="#8B9A8B">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="-8" r="2.5" fill="#A99F94">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* 촬영 범위 표시 (카메라 시야각) */}
      <g opacity="0.25">
        <polygon
          points="200,135 120,250 280,250"
          fill="url(#v3DroneGradient2)"
          opacity="0.2"
        />
        <line x1="200" y1="135" x2="120" y2="250" stroke="url(#v3DroneGradient2)" strokeWidth="0.8" strokeDasharray="5,5" />
        <line x1="200" y1="135" x2="280" y2="250" stroke="url(#v3DroneGradient2)" strokeWidth="0.8" strokeDasharray="5,5" />
      </g>

      {/* 지표면 (촬영 대상) */}
      <g transform="translate(0, 250)">
        {/* 지면 */}
        <rect x="80" y="0" width="240" height="35" rx="5" fill="rgba(139, 154, 139, 0.08)" stroke="url(#v3DroneGradient3)" strokeWidth="0.8" />

        {/* 그리드 (정사영상 타일) */}
        <g stroke="#B8B4AC" strokeWidth="0.6" opacity="0.4">
          <line x1="120" y1="0" x2="120" y2="35" />
          <line x1="160" y1="0" x2="160" y2="35" />
          <line x1="200" y1="0" x2="200" y2="35" />
          <line x1="240" y1="0" x2="240" y2="35" />
          <line x1="280" y1="0" x2="280" y2="35" />
          <line x1="80" y1="17" x2="320" y2="17" />
        </g>

        {/* 촬영 진행 표시 */}
        <rect x="80" y="0" width="120" height="35" fill="url(#v3DroneGradient2)" opacity="0.15">
          <animate attributeName="width" values="0;240;0" dur="5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* 데이터 전송 표시 */}
      <g transform="translate(320, 150)">
        <rect x="0" y="0" width="55" height="75" rx="5" fill="rgba(139, 154, 139, 0.06)" stroke="url(#v3DroneGradient1)" strokeWidth="0.8" />
        {/* 신호 아이콘 */}
        <g transform="translate(27, 22)">
          <path d="M-12,8 Q0,-8 12,8" fill="none" stroke="url(#v3DroneGradient2)" strokeWidth="1.5" opacity="0.35">
            <animate attributeName="opacity" values="0.35;0.8;0.35" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M-8,4 Q0,-4 8,4" fill="none" stroke="url(#v3DroneGradient2)" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.85;0.5" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
          </path>
          <path d="M-4,0 Q0,0 4,0" fill="none" stroke="url(#v3DroneGradient2)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
          </path>
        </g>
        {/* 데이터 아이콘 */}
        <g transform="translate(12, 45)" fill="#9A958C" opacity="0.6">
          <rect x="0" y="0" width="7" height="18" rx="2" />
          <rect x="11" y="4" width="7" height="14" rx="2" />
          <rect x="22" y="8" width="7" height="10" rx="2" />
        </g>
      </g>

      {/* GPS 위성 신호 */}
      <g transform="translate(50, 50)" opacity="0.4">
        <circle cx="0" cy="0" r="12" fill="none" stroke="url(#v3DroneGradient2)" strokeWidth="0.8">
          <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="4" fill="url(#v3DroneGradient2)" />
        <text x="18" y="4" fill="#7A756C" fontSize="9">GPS</text>
      </g>
    </svg>
  );
}
