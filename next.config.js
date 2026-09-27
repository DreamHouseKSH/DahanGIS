/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // All variants are generated at build time. There is no /_next/image server.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/static-image-loader.ts',
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [320],
  },
};
