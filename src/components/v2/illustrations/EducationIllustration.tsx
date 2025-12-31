'use client';

/**
 * Education 일러스트레이션 - GIS 교육
 * 학습과 교육 환경을 표현하는 SVG 일러스트
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
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="eduGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="eduGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="eduGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
        <linearGradient id="eduGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fa709a" />
          <stop offset="100%" stopColor="#fee140" />
        </linearGradient>
      </defs>

      {/* 칠판/화이트보드 */}
      <g transform="translate(80, 30)">
        <rect width="240" height="150" rx="8" fill="rgba(30,40,50,0.8)" stroke="url(#eduGradient1)" strokeWidth="3" />

        {/* 칠판 내용 - GIS 개념도 */}
        <g transform="translate(20, 20)">
          {/* 타이틀 */}
          <text fill="white" fontSize="14" fontWeight="bold">GIS 기초 개념</text>

          {/* 레이어 다이어그램 */}
          <g transform="translate(10, 30)">
            {/* 레이어 스택 */}
            <rect x="0" y="0" width="80" height="15" rx="2" fill="url(#eduGradient2)" opacity="0.6" />
            <text x="40" y="11" textAnchor="middle" fill="white" fontSize="8">도로 레이어</text>

            <rect x="5" y="20" width="80" height="15" rx="2" fill="url(#eduGradient3)" opacity="0.6" />
            <text x="45" y="31" textAnchor="middle" fill="white" fontSize="8">건물 레이어</text>

            <rect x="10" y="40" width="80" height="15" rx="2" fill="url(#eduGradient4)" opacity="0.6" />
            <text x="50" y="51" textAnchor="middle" fill="white" fontSize="8">지형 레이어</text>

            {/* 화살표 */}
            <path d="M100,30 L115,30" stroke="white" strokeWidth="1" fill="none" />
            <polygon points="115,27 120,30 115,33" fill="white" />
          </g>

          {/* 결과 지도 */}
          <g transform="translate(130, 30)">
            <rect width="70" height="60" rx="4" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" />
            <text x="35" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">통합 지도</text>

            {/* 미니 지도 표현 */}
            <path d="M10,20 Q25,10 40,25 Q55,35 60,20" fill="none" stroke="url(#eduGradient4)" strokeWidth="2" />
            <line x1="15" y1="35" x2="55" y2="35" stroke="url(#eduGradient2)" strokeWidth="2" />
            <rect x="25" y="25" width="10" height="15" fill="url(#eduGradient3)" opacity="0.5" />
            <rect x="45" y="30" width="8" height="10" fill="url(#eduGradient3)" opacity="0.5" />
          </g>
        </g>

        {/* 진행 표시 */}
        <g transform="translate(20, 125)">
          <rect width="200" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
          <rect width="140" height="8" rx="4" fill="url(#eduGradient3)">
            <animate attributeName="width" values="0;140" dur="3s" repeatCount="indefinite" />
          </rect>
          <text x="210" y="7" fill="white" fontSize="8">70%</text>
        </g>
      </g>

      {/* 학생들 */}
      <g transform="translate(60, 200)">
        {/* 학생 1 */}
        <g transform="translate(0, 0)">
          <circle cx="25" cy="15" r="12" fill="url(#eduGradient2)" />
          <rect x="10" y="30" width="30" height="35" rx="5" fill="url(#eduGradient2)" opacity="0.7" />
          {/* 노트북 */}
          <rect x="5" y="55" width="40" height="25" rx="3" fill="rgba(50,50,60,0.9)" stroke="url(#eduGradient1)" strokeWidth="1" />
          <rect x="8" y="58" width="34" height="18" fill="rgba(30,30,40,1)" />
        </g>

        {/* 학생 2 */}
        <g transform="translate(80, 0)">
          <circle cx="25" cy="15" r="12" fill="url(#eduGradient3)" />
          <rect x="10" y="30" width="30" height="35" rx="5" fill="url(#eduGradient3)" opacity="0.7" />
          {/* 노트북 */}
          <rect x="5" y="55" width="40" height="25" rx="3" fill="rgba(50,50,60,0.9)" stroke="url(#eduGradient1)" strokeWidth="1" />
          <rect x="8" y="58" width="34" height="18" fill="rgba(30,30,40,1)" />
          {/* 손 들기 */}
          <line x1="40" y1="35" x2="50" y2="15" stroke="url(#eduGradient3)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 학생 3 */}
        <g transform="translate(160, 0)">
          <circle cx="25" cy="15" r="12" fill="url(#eduGradient4)" />
          <rect x="10" y="30" width="30" height="35" rx="5" fill="url(#eduGradient4)" opacity="0.7" />
          {/* 노트북 */}
          <rect x="5" y="55" width="40" height="25" rx="3" fill="rgba(50,50,60,0.9)" stroke="url(#eduGradient1)" strokeWidth="1" />
          <rect x="8" y="58" width="34" height="18" fill="rgba(30,30,40,1)" />
        </g>

        {/* 학생 4 */}
        <g transform="translate(240, 0)">
          <circle cx="25" cy="15" r="12" fill="url(#eduGradient1)" />
          <rect x="10" y="30" width="30" height="35" rx="5" fill="url(#eduGradient1)" opacity="0.7" />
          {/* 노트북 */}
          <rect x="5" y="55" width="40" height="25" rx="3" fill="rgba(50,50,60,0.9)" stroke="url(#eduGradient1)" strokeWidth="1" />
          <rect x="8" y="58" width="34" height="18" fill="rgba(30,30,40,1)" />
        </g>
      </g>

      {/* 강사 */}
      <g transform="translate(340, 100)">
        <circle cx="20" cy="15" r="15" fill="url(#eduGradient1)" />
        <rect x="5" y="35" width="30" height="45" rx="5" fill="url(#eduGradient1)" opacity="0.8" />
        {/* 포인터 */}
        <line x1="0" y1="50" x2="-20" y2="30" stroke="url(#eduGradient2)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="y2" values="30;25;30" dur="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 학습 아이콘들 (상단) */}
      <g transform="translate(30, 40)">
        {/* 책 아이콘 */}
        <g transform="translate(0, 0)">
          <rect width="35" height="45" rx="3" fill="url(#eduGradient1)" opacity="0.3" />
          <rect x="3" y="3" width="29" height="39" fill="rgba(255,255,255,0.1)" />
          <line x1="17" y1="3" x2="17" y2="42" stroke="white" strokeWidth="1" opacity="0.3" />
          <text x="17" y="60" textAnchor="middle" fill="white" fontSize="7" opacity="0.7">교재</text>
        </g>
      </g>

      {/* 인증서/수료증 */}
      <g transform="translate(340, 200)">
        <rect width="50" height="65" rx="3" fill="rgba(255,255,255,0.1)" stroke="url(#eduGradient3)" strokeWidth="1" />
        <rect x="5" y="5" width="40" height="8" fill="url(#eduGradient3)" opacity="0.5" />
        <line x1="8" y1="20" x2="42" y2="20" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="8" y1="28" x2="35" y2="28" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="8" y1="36" x2="40" y2="36" stroke="white" strokeWidth="1" opacity="0.3" />
        {/* 스탬프 */}
        <circle cx="35" cy="52" r="8" fill="none" stroke="url(#eduGradient3)" strokeWidth="2" />
        <text x="35" y="55" textAnchor="middle" fill="url(#eduGradient3)" fontSize="6">✓</text>
        <text x="25" y="78" textAnchor="middle" fill="white" fontSize="7" opacity="0.7">수료증</text>
      </g>

      {/* 말풍선 (질문) */}
      <g transform="translate(170, 170)">
        <rect width="60" height="25" rx="5" fill="rgba(255,255,255,0.2)" />
        <polygon points="10,25 15,35 20,25" fill="rgba(255,255,255,0.2)" />
        <text x="30" y="17" textAnchor="middle" fill="white" fontSize="9">질문이요!</text>
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </g>

      {/* 커리큘럼 진행 표시 */}
      <g transform="translate(30, 120)">
        <text fill="white" fontSize="8" opacity="0.7">커리큘럼</text>
        <g transform="translate(0, 10)">
          <circle cx="5" cy="5" r="5" fill="url(#eduGradient3)" />
          <text x="5" y="7" textAnchor="middle" fill="white" fontSize="6">✓</text>
          <text x="15" y="8" fill="white" fontSize="7" opacity="0.8">기초</text>
        </g>
        <g transform="translate(0, 25)">
          <circle cx="5" cy="5" r="5" fill="url(#eduGradient3)" />
          <text x="5" y="7" textAnchor="middle" fill="white" fontSize="6">✓</text>
          <text x="15" y="8" fill="white" fontSize="7" opacity="0.8">중급</text>
        </g>
        <g transform="translate(0, 40)">
          <circle cx="5" cy="5" r="5" fill="url(#eduGradient2)" />
          <circle cx="5" cy="5" r="3" fill="white">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="15" y="8" fill="white" fontSize="7" opacity="0.8">고급</text>
        </g>
        <g transform="translate(0, 55)">
          <circle cx="5" cy="5" r="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="15" y="8" fill="white" fontSize="7" opacity="0.5">실무</text>
        </g>
        {/* 연결선 */}
        <line x1="5" y1="15" x2="5" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </g>

      {/* 온라인 표시 */}
      <g transform="translate(335, 30)">
        <rect width="55" height="20" rx="10" fill="url(#eduGradient3)" opacity="0.3" />
        <circle cx="12" cy="10" r="4" fill="#00ff00">
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="35" y="14" textAnchor="middle" fill="white" fontSize="8">LIVE</text>
      </g>
    </svg>
  );
}
