/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath, assetPrefix 등은 커스텀 도메인 환경에서 ''(빈 문자열)로 유지
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
