'use client';

import type { ImageLoaderProps } from 'next/image';

/** Must stay in sync with scripts/optimize-images.mjs and next.config.js. */
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith('/images/') || !/\.(png|jpe?g)$/i.test(src)) return src;
  return `/images/optimized/${src.slice('/images/'.length)}.${width}.webp`;
}
