import type { NextConfig } from "next";

// 프로덕션 여부
const isProd = process.env.NODE_ENV === 'production';

const repoName = "dahangis-nextjs";


const nextConfig: NextConfig = {
  // 1) 정적 export 설정
  output: 'export',

  // 커스텀 도메인을 사용하므로 basePath와 assetPrefix는 빈 문자열로 설정
  basePath: '',
  assetPrefix: '',
  
  // GitHub Pages 배포를 위한 설정
  trailingSlash: true,

  // 이미지 최적화 활성화
  images: {
    unoptimized: true,
    domains: ['dahangis.co.kr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dahangis.co.kr',
        pathname: '/**',
      },
    ],
  },

  // 정적 파일 처리 최적화
  compress: true,
  poweredByHeader: false,
  
  // 빌드 최적화
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
