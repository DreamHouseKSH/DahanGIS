/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // GitHub Pages 배포(gh-pages 브랜치) 및 커스텀 도메인 환경 대응
  basePath: '', // 커스텀 도메인(dahangis.co.kr)에서는 ''
  assetPrefix: '', // 커스텀 도메인(dahangis.co.kr)에서는 ''
  // 만약 /DahanGIS 등 서브디렉토리 배포시에는 '/DahanGIS'로 변경 필요
  trailingSlash: true, // 정적 export 시 폴더 구조 호환성
  images: {
    unoptimized: true, // next export 대응 (이미지 최적화 비활성화)
  },
  output: 'export', // 최신 next.js 정적 export 방식 대응
};
