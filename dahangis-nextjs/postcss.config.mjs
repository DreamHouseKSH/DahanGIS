export default {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    cssnano: {
      preset: 'default', // 'advanced'에서 'default'로 변경 (cssnano 7.x 이상 호환)
    },
  },
};
