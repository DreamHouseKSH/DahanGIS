'use client';

/**
 * Software 일러스트레이션 - GIS 소프트웨어 개발
 * 코딩과 개발 환경을 표현하는 SVG 일러스트
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
      className={`v2-illustration ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="softGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="softGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="softGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
        <linearGradient id="softGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fa709a" />
          <stop offset="100%" stopColor="#fee140" />
        </linearGradient>
      </defs>

      {/* 모니터 */}
      <g transform="translate(100, 30)">
        {/* 모니터 프레임 */}
        <rect width="200" height="140" rx="8" fill="rgba(30,30,40,0.9)" stroke="url(#softGradient1)" strokeWidth="2" />

        {/* 화면 영역 */}
        <rect x="8" y="8" width="184" height="110" rx="4" fill="rgba(20,20,30,1)" />

        {/* 코드 에디터 UI */}
        {/* 사이드바 */}
        <rect x="8" y="8" width="35" height="110" fill="rgba(255,255,255,0.05)" />

        {/* 파일 트리 */}
        <g transform="translate(12, 15)" fill="white" opacity="0.5" fontSize="6">
          <text y="0">📁 src</text>
          <text x="8" y="10">📁 components</text>
          <text x="8" y="20">📁 utils</text>
          <text x="8" y="30">📄 map.tsx</text>
          <text x="8" y="40">📄 data.ts</text>
        </g>

        {/* 코드 영역 */}
        <g transform="translate(48, 15)">
          {/* 라인 넘버 */}
          <g fill="rgba(255,255,255,0.3)" fontSize="7">
            <text x="0" y="8">1</text>
            <text x="0" y="18">2</text>
            <text x="0" y="28">3</text>
            <text x="0" y="38">4</text>
            <text x="0" y="48">5</text>
            <text x="0" y="58">6</text>
            <text x="0" y="68">7</text>
            <text x="0" y="78">8</text>
          </g>

          {/* 코드 */}
          <g transform="translate(15, 0)" fontSize="7">
            <text y="8" fill="#c678dd">import</text>
            <text x="35" y="8" fill="white">{'{'} Map {'}'}</text>
            <text x="60" y="8" fill="#c678dd">from</text>
            <text x="80" y="8" fill="#98c379">&apos;mapbox&apos;</text>

            <text y="18" fill="#c678dd">const</text>
            <text x="30" y="18" fill="#61afef">GISLayer</text>
            <text x="72" y="18" fill="white">= () =&gt; {'{'}</text>

            <text x="10" y="28" fill="#c678dd">const</text>
            <text x="40" y="28" fill="white">[data, setData]</text>

            <text x="10" y="38" fill="#c678dd">return</text>
            <text x="40" y="38" fill="white">(</text>

            <text x="20" y="48" fill="#e06c75">&lt;Map</text>
            <text x="45" y="48" fill="#d19a66">center</text>
            <text x="70" y="48" fill="white">=</text>

            <text x="30" y="58" fill="#d19a66">zoom</text>
            <text x="50" y="58" fill="white">=</text>
            <text x="55" y="58" fill="#d19a66">{'{'}12{'}'}</text>

            <text x="20" y="68" fill="#e06c75">/&gt;</text>

            <text x="10" y="78" fill="white">)</text>
          </g>

          {/* 커서 깜빡임 */}
          <rect x="100" y="50" width="2" height="10" fill="url(#softGradient2)">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* 터미널 영역 */}
        <rect x="8" y="95" width="184" height="23" fill="rgba(0,0,0,0.5)" />
        <g transform="translate(12, 102)" fontSize="6">
          <text fill="#43e97b">$</text>
          <text x="10" fill="white" opacity="0.8">npm run build</text>
          <text x="10" y="10" fill="#43e97b">✓ Compiled successfully</text>
        </g>

        {/* 모니터 버튼들 */}
        <g transform="translate(15, 125)">
          <circle r="4" fill="#ff5f56" />
          <circle cx="12" r="4" fill="#ffbd2e" />
          <circle cx="24" r="4" fill="#27c93f" />
        </g>

        {/* 모니터 스탠드 */}
        <rect x="85" y="140" width="30" height="20" fill="url(#softGradient1)" opacity="0.5" />
        <rect x="70" y="155" width="60" height="8" rx="2" fill="url(#softGradient1)" opacity="0.3" />
      </g>

      {/* 좌측: 기술 스택 아이콘들 */}
      <g transform="translate(30, 80)">
        <g transform="translate(0, 0)">
          <rect width="50" height="50" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient2)" strokeWidth="1" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="18">🗺️</text>
          <text x="25" y="65" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">MapBox</text>
        </g>
        <g transform="translate(0, 80)">
          <rect width="50" height="50" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient3)" strokeWidth="1" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="18">⚛️</text>
          <text x="25" y="65" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">React</text>
        </g>
      </g>

      {/* 우측: API/서비스 아이콘 */}
      <g transform="translate(320, 80)">
        <g transform="translate(0, 0)">
          <rect width="50" height="50" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient4)" strokeWidth="1" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="18">🔗</text>
          <text x="25" y="65" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">REST API</text>
        </g>
        <g transform="translate(0, 80)">
          <rect width="50" height="50" rx="10" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient1)" strokeWidth="1" />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="18">☁️</text>
          <text x="25" y="65" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">Cloud</text>
        </g>
      </g>

      {/* 연결선 */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5">
        <line x1="80" y1="105" x2="100" y2="100">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="185" x2="100" y2="150">
          <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="300" y1="100" x2="320" y2="105">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="300" y1="150" x2="320" y2="185">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* 하단: 개발 프로세스 */}
      <g transform="translate(80, 220)">
        {/* 단계 1: 설계 */}
        <g transform="translate(0, 0)">
          <rect width="70" height="50" rx="8" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient1)" strokeWidth="1" />
          <g transform="translate(35, 18)">
            <rect x="-15" y="-8" width="30" height="16" fill="none" stroke="url(#softGradient1)" strokeWidth="1" rx="2" />
            <line x1="-10" y1="-3" x2="10" y2="-3" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="-10" y1="2" x2="5" y2="2" stroke="white" strokeWidth="1" opacity="0.5" />
          </g>
          <text x="35" y="42" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">설계</text>
        </g>

        {/* 화살표 */}
        <path d="M75,25 L85,25" stroke="url(#softGradient2)" strokeWidth="2" fill="none" />

        {/* 단계 2: 개발 */}
        <g transform="translate(90, 0)">
          <rect width="70" height="50" rx="8" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient2)" strokeWidth="1" />
          <text x="35" y="22" textAnchor="middle" fill="white" fontSize="14">&lt;/&gt;</text>
          <text x="35" y="42" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">개발</text>
        </g>

        {/* 화살표 */}
        <path d="M165,25 L175,25" stroke="url(#softGradient3)" strokeWidth="2" fill="none" />

        {/* 단계 3: 배포 */}
        <g transform="translate(180, 0)">
          <rect width="70" height="50" rx="8" fill="rgba(255,255,255,0.1)" stroke="url(#softGradient3)" strokeWidth="1" />
          <g transform="translate(35, 18)">
            <circle r="10" fill="none" stroke="url(#softGradient3)" strokeWidth="1" />
            <path d="M0,-5 L0,5 M-4,1 L0,5 L4,1" stroke="white" strokeWidth="1.5" fill="none" />
          </g>
          <text x="35" y="42" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">배포</text>
        </g>
      </g>

      {/* 플로팅 코드 조각들 */}
      <g opacity="0.4">
        <text x="50" y="50" fill="url(#softGradient2)" fontSize="10" fontFamily="monospace">
          {'{ gis: true }'}
          <animate attributeName="y" values="50;45;50" dur="3s" repeatCount="indefinite" />
        </text>
        <text x="330" y="250" fill="url(#softGradient3)" fontSize="10" fontFamily="monospace">
          map.render()
          <animate attributeName="y" values="250;255;250" dur="2.5s" repeatCount="indefinite" />
        </text>
      </g>
    </svg>
  );
}
