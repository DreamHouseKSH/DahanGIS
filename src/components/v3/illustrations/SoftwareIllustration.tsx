'use client';

/**
 * Software 일러스트레이션 - Cloud Dancer 테마
 * GIS 소프트웨어 개발을 표현하는 차분한 SVG 일러스트
 */
interface SoftwareIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function SoftwareIllustration({
  className = '',
  width = 400,
  height = 300,
}: SoftwareIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3SoftGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3SoftGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3SoftGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
      </defs>

      {/* 모니터/노트북 */}
      <g transform="translate(200, 140)">
        {/* 화면 */}
        <rect x="-120" y="-80" width="240" height="150" rx="8" fill="rgba(58, 56, 53, 0.9)" stroke="url(#v3SoftGradient1)" strokeWidth="2" />
        <rect x="-110" y="-70" width="220" height="125" rx="4" fill="#2A2826" />

        {/* 코드 라인들 */}
        <g transform="translate(-100, -60)">
          {/* 코드 라인 애니메이션 */}
          <g fill="#8B9A8B" opacity="0.7">
            <rect x="0" y="0" width="60" height="6" rx="2">
              <animate attributeName="width" values="0;60" dur="0.5s" fill="freeze" />
            </rect>
            <rect x="10" y="14" width="80" height="6" rx="2">
              <animate attributeName="width" values="0;80" dur="0.5s" fill="freeze" begin="0.2s" />
            </rect>
            <rect x="10" y="28" width="50" height="6" rx="2">
              <animate attributeName="width" values="0;50" dur="0.5s" fill="freeze" begin="0.4s" />
            </rect>
          </g>
          <g fill="#7B9B9B" opacity="0.7">
            <rect x="0" y="42" width="70" height="6" rx="2">
              <animate attributeName="width" values="0;70" dur="0.5s" fill="freeze" begin="0.6s" />
            </rect>
            <rect x="10" y="56" width="90" height="6" rx="2">
              <animate attributeName="width" values="0;90" dur="0.5s" fill="freeze" begin="0.8s" />
            </rect>
            <rect x="10" y="70" width="40" height="6" rx="2">
              <animate attributeName="width" values="0;40" dur="0.5s" fill="freeze" begin="1s" />
            </rect>
          </g>
          <g fill="#A99F94" opacity="0.7">
            <rect x="0" y="84" width="55" height="6" rx="2">
              <animate attributeName="width" values="0;55" dur="0.5s" fill="freeze" begin="1.2s" />
            </rect>
            <rect x="10" y="98" width="75" height="6" rx="2">
              <animate attributeName="width" values="0;75" dur="0.5s" fill="freeze" begin="1.4s" />
            </rect>
          </g>

          {/* 지도 미리보기 */}
          <g transform="translate(120, 10)">
            <rect x="0" y="0" width="80" height="95" rx="4" fill="rgba(139, 154, 139, 0.15)" stroke="url(#v3SoftGradient1)" strokeWidth="0.8" />
            {/* 지도 요소들 */}
            <path d="M 10,20 L 30,15 L 50,30 L 70,25" fill="none" stroke="url(#v3SoftGradient2)" strokeWidth="1.5" />
            <path d="M 15,50 Q 40,40 60,55" fill="none" stroke="url(#v3SoftGradient3)" strokeWidth="1.5" />
            <circle cx="25" cy="35" r="4" fill="url(#v3SoftGradient1)" opacity="0.8" />
            <circle cx="55" cy="45" r="4" fill="url(#v3SoftGradient2)" opacity="0.8" />
            <rect x="10" y="65" width="60" height="20" rx="2" fill="rgba(169, 159, 148, 0.2)" />
          </g>
        </g>

        {/* 받침대 */}
        <rect x="-30" y="75" width="60" height="8" rx="2" fill="url(#v3SoftGradient1)" opacity="0.7" />
        <rect x="-50" y="83" width="100" height="6" rx="2" fill="url(#v3SoftGradient1)" opacity="0.5" />
      </g>

      {/* 기술 스택 아이콘들 */}
      <g opacity="0.5">
        {/* React 스타일 */}
        <g transform="translate(60, 70)">
          <circle r="18" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3SoftGradient1)" strokeWidth="1" />
          <circle r="4" fill="url(#v3SoftGradient1)" />
          <ellipse rx="12" ry="5" fill="none" stroke="url(#v3SoftGradient1)" strokeWidth="1" />
          <ellipse rx="12" ry="5" fill="none" stroke="url(#v3SoftGradient1)" strokeWidth="1" transform="rotate(60)" />
          <ellipse rx="12" ry="5" fill="none" stroke="url(#v3SoftGradient1)" strokeWidth="1" transform="rotate(-60)" />
        </g>

        {/* 지도 아이콘 */}
        <g transform="translate(340, 70)">
          <circle r="18" fill="rgba(123, 155, 155, 0.1)" stroke="url(#v3SoftGradient2)" strokeWidth="1" />
          <path d="M -8,-8 L -8,8 L 0,4 L 8,8 L 8,-8 L 0,-4 Z" fill="url(#v3SoftGradient2)" opacity="0.8" />
        </g>

        {/* API 아이콘 */}
        <g transform="translate(60, 230)">
          <circle r="18" fill="rgba(169, 159, 148, 0.1)" stroke="url(#v3SoftGradient3)" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#9B8B7D" fontSize="10" fontWeight="600">API</text>
        </g>

        {/* 데이터베이스 아이콘 */}
        <g transform="translate(340, 230)">
          <circle r="18" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3SoftGradient1)" strokeWidth="1" />
          <ellipse cx="0" cy="-5" rx="8" ry="3" fill="url(#v3SoftGradient1)" opacity="0.8" />
          <path d="M -8,-5 L -8,5 Q 0,10 8,5 L 8,-5" fill="none" stroke="url(#v3SoftGradient1)" strokeWidth="1.5" />
        </g>
      </g>

      {/* 연결선 */}
      <g stroke="#B8B4AC" strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="3,3">
        <path d="M 78,70 Q 120,100 140,120" />
        <path d="M 322,70 Q 280,100 260,120" />
        <path d="M 78,230 Q 120,200 140,190" />
        <path d="M 322,230 Q 280,200 260,190" />
      </g>
    </svg>
  );
}
