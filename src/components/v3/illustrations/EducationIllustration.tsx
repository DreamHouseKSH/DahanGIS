'use client';

/**
 * Education 일러스트레이션 - Cloud Dancer 테마
 * GIS 교육을 표현하는 차분한 SVG 일러스트
 */
interface EducationIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function EducationIllustration({
  className = '',
  width = 400,
  height = 300,
}: EducationIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      width={width}
      height={height}
      className={`v3-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3EduGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9A8B" />
          <stop offset="100%" stopColor="#7B9B9B" />
        </linearGradient>
        <linearGradient id="v3EduGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B9B9B" />
          <stop offset="100%" stopColor="#8A9199" />
        </linearGradient>
        <linearGradient id="v3EduGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A99F94" />
          <stop offset="100%" stopColor="#9B8B7D" />
        </linearGradient>
      </defs>

      {/* 칠판/화이트보드 */}
      <g transform="translate(200, 100)">
        <rect x="-140" y="-50" width="280" height="100" rx="6" fill="#3A3835" stroke="url(#v3EduGradient1)" strokeWidth="2" />

        {/* 칠판 내용 - GIS 개념 */}
        <g opacity="0.8">
          {/* 제목 */}
          <text x="-120" y="-25" fill="#E8E6E1" fontSize="14" fontWeight="600">GIS Fundamentals</text>

          {/* 다이어그램 */}
          <g transform="translate(-80, 10)">
            <circle r="20" fill="none" stroke="url(#v3EduGradient1)" strokeWidth="1.5" />
            <text y="4" textAnchor="middle" fill="#8B9A8B" fontSize="8">Layer</text>
          </g>
          <g transform="translate(0, 10)">
            <circle r="20" fill="none" stroke="url(#v3EduGradient2)" strokeWidth="1.5" />
            <text y="4" textAnchor="middle" fill="#7B9B9B" fontSize="8">Data</text>
          </g>
          <g transform="translate(80, 10)">
            <circle r="20" fill="none" stroke="url(#v3EduGradient3)" strokeWidth="1.5" />
            <text y="4" textAnchor="middle" fill="#A99F94" fontSize="8">Map</text>
          </g>

          {/* 화살표 */}
          <path d="M -55,10 L -25,10" fill="none" stroke="#B8B4AC" strokeWidth="1" markerEnd="url(#arrow)" />
          <path d="M 25,10 L 55,10" fill="none" stroke="#B8B4AC" strokeWidth="1" markerEnd="url(#arrow)" />
        </g>
      </g>

      {/* 학생 책상들 */}
      <g transform="translate(200, 220)">
        {/* 왼쪽 책상 */}
        <g transform="translate(-90, 0)">
          <rect x="-35" y="0" width="70" height="40" rx="4" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3EduGradient1)" strokeWidth="1" />
          {/* 노트북 */}
          <rect x="-25" y="8" width="50" height="30" rx="3" fill="#3A3835" />
          <rect x="-20" y="12" width="40" height="20" rx="2" fill="#2A2826" />
          {/* 화면 내용 */}
          <rect x="-15" y="16" width="20" height="3" rx="1" fill="#8B9A8B" opacity="0.6" />
          <rect x="-15" y="22" width="15" height="3" rx="1" fill="#7B9B9B" opacity="0.6" />
          {/* 학생 (단순화) */}
          <circle cx="0" cy="-20" r="12" fill="url(#v3EduGradient2)" opacity="0.6" />
        </g>

        {/* 중앙 책상 */}
        <g transform="translate(0, 0)">
          <rect x="-35" y="0" width="70" height="40" rx="4" fill="rgba(123, 155, 155, 0.1)" stroke="url(#v3EduGradient2)" strokeWidth="1" />
          <rect x="-25" y="8" width="50" height="30" rx="3" fill="#3A3835" />
          <rect x="-20" y="12" width="40" height="20" rx="2" fill="#2A2826" />
          <rect x="-15" y="16" width="25" height="3" rx="1" fill="#8B9A8B" opacity="0.6" />
          <rect x="-15" y="22" width="18" height="3" rx="1" fill="#A99F94" opacity="0.6" />
          <circle cx="0" cy="-20" r="12" fill="url(#v3EduGradient1)" opacity="0.6" />
        </g>

        {/* 오른쪽 책상 */}
        <g transform="translate(90, 0)">
          <rect x="-35" y="0" width="70" height="40" rx="4" fill="rgba(169, 159, 148, 0.1)" stroke="url(#v3EduGradient3)" strokeWidth="1" />
          <rect x="-25" y="8" width="50" height="30" rx="3" fill="#3A3835" />
          <rect x="-20" y="12" width="40" height="20" rx="2" fill="#2A2826" />
          <rect x="-15" y="16" width="22" height="3" rx="1" fill="#7B9B9B" opacity="0.6" />
          <rect x="-15" y="22" width="12" height="3" rx="1" fill="#8B9A8B" opacity="0.6" />
          <circle cx="0" cy="-20" r="12" fill="url(#v3EduGradient3)" opacity="0.6" />
        </g>
      </g>

      {/* 강사 포인터 */}
      <g transform="translate(60, 120)" opacity="0.5">
        <line x1="0" y1="0" x2="40" y2="-30" stroke="url(#v3EduGradient1)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="-30" r="3" fill="url(#v3EduGradient1)" />
      </g>

      {/* 커리큘럼 아이콘 */}
      <g transform="translate(350, 100)" opacity="0.5">
        <rect x="-25" y="-35" width="50" height="70" rx="4" fill="rgba(139, 154, 139, 0.1)" stroke="url(#v3EduGradient1)" strokeWidth="1" />
        {/* 목록 아이템들 */}
        <g fill="#8B9A8B">
          <circle cx="-15" cy="-20" r="3" />
          <rect x="-8" y="-22" width="25" height="4" rx="1" />
          <circle cx="-15" cy="-5" r="3" />
          <rect x="-8" y="-7" width="20" height="4" rx="1" />
          <circle cx="-15" cy="10" r="3" />
          <rect x="-8" y="8" width="28" height="4" rx="1" />
          <circle cx="-15" cy="25" r="3" />
          <rect x="-8" y="23" width="18" height="4" rx="1" />
        </g>
      </g>

      {/* 수료증/인증 아이콘 */}
      <g transform="translate(50, 100)" opacity="0.5">
        <rect x="-25" y="-30" width="50" height="60" rx="4" fill="rgba(169, 159, 148, 0.1)" stroke="url(#v3EduGradient3)" strokeWidth="1" />
        {/* 메달/인증 */}
        <circle cx="0" cy="-5" r="15" fill="none" stroke="url(#v3EduGradient3)" strokeWidth="1.5" />
        <path d="M 0,-12 L 3,-5 L 10,-5 L 4,0 L 6,8 L 0,4 L -6,8 L -4,0 L -10,-5 L -3,-5 Z" fill="url(#v3EduGradient3)" opacity="0.6" />
        <rect x="-15" y="18" width="30" height="4" rx="1" fill="#A99F94" opacity="0.6" />
      </g>
    </svg>
  );
}
