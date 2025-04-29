/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // 정적 자산 설정
  basePath: '', // 커스텀 도메인/루트 미리보기용으로 빈 문자열로 고정
  assetPrefix: '', // 커스텀 도메인/루트 미리보기용으로 빈 문자열로 고정

  // GitHub Pages 배포를 위한 설정
  trailingSlash: true,

  // 이미지 최적화 설정
  images: {
    unoptimized: true, // 정적 export에서 이미지 정상 노출을 위해 true로 변경
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loaderFile: undefined,
    // assetPrefix를 자동 적용
    path: '/_next/image', // basePath 없는 상태로 고정
  },

  // 정적 파일 처리 최적화
  compress: true,
  poweredByHeader: false,
  
  // 빌드 최적화
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  
  // 성능 최적화
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://dahangis.co.kr',
  },
};

module.exports = nextConfig;
