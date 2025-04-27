import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  noindex = false,
}: SEOProps): Metadata {
  const baseTitle = '다한지리정보(주)';
  const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const defaultDescription = '다한지리정보(주)는 정밀 정사영상 제작, GIS 데이터 구축 및 컨설팅을 제공하는 GIS 전문 기업입니다.';
  const defaultKeywords = ['GIS', '정사영상', '데이터 구축', 'GIS 컨설팅', '공간정보'];
  const defaultOgImage = '/images/og-image.jpg';

  return {
    title: finalTitle,
    description: description || defaultDescription,
    keywords: [...defaultKeywords, ...keywords],
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: finalTitle,
      description: description || defaultDescription,
      images: [{
        url: ogImage || defaultOgImage,
        width: 1200,
        height: 630,
        alt: finalTitle,
      }],
      locale: 'ko_KR',
      type: 'website',
      siteName: baseTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: description || defaultDescription,
      images: [ogImage || defaultOgImage],
    },
    alternates: {
      canonical: `https://dahangis.com${window?.location?.pathname || ''}`,
    },
  };
}
