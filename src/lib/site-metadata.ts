import type { Metadata } from 'next';

export const SITE_URL = 'https://dahangis.co.kr';
export const SITE_NAME = '다한지리정보(주)';
export const SITE_DESCRIPTION = '정밀 정사영상, GIS 데이터 구축, 맞춤형 소프트웨어, 컨설팅 및 교육을 위한 다한지리정보의 공간정보 서비스';
export const pageDefinitions = [
  { path: '/', title: '다한지리정보(주) | DahanGIS', description: SITE_DESCRIPTION },
  { path: '/services/', title: '정사영상·GIS 서비스', description: '정사영상 제작, 공간 데이터 구축, GIS 컨설팅, 소프트웨어 개발 및 교육 서비스의 범위를 확인하세요.' },
  { path: '/contact/', title: '프로젝트 문의', description: '정사영상·GIS 데이터·소프트웨어 프로젝트의 범위, 일정 및 견적을 다한지리정보에 문의하세요.' },
  { path: '/about/', title: '회사 소개', description: '다한지리정보의 공간정보 기술, 업무 접근 방식과 회사 비전을 소개합니다.' },
  { path: '/service-ortho/', title: '정밀 정사영상 제작', description: '항공·드론 영상 정사보정, 모자이킹, 품질 검수와 납품 서비스 안내' },
  { path: '/service-data/', title: 'GIS 데이터 구축', description: '공간 데이터베이스 설계, 벡터화, 속성 정비와 품질관리 서비스 안내' },
  { path: '/service-consulting/', title: 'GIS 컨설팅', description: '공간정보 사업 기획, 요구사항 분석과 시스템 설계 컨설팅 안내' },
  { path: '/service-software/', title: 'GIS 소프트웨어 개발', description: '웹·모바일 GIS와 공간 데이터 활용을 위한 맞춤형 소프트웨어 개발 안내' },
  { path: '/service-education/', title: 'GIS 교육 안내', description: '준비 중인 GIS 교육 과정과 기관 맞춤형 실무 교육 문의 안내' },
] as const;

export function pageMetadata(path: string): Metadata {
  const page = pageDefinitions.find((item) => item.path === path);
  if (!page) throw new Error(`Unknown public page: ${path}`);
  const url = new URL(page.path, SITE_URL).href;
  const title = page.path === '/' ? page.title : `${page.title} | ${SITE_NAME}`;
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'ko_KR', url, title, description: page.description, images: [`${SITE_URL}/images/DAHAN_logo_v01.png`] },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [`${SITE_URL}/images/DAHAN_logo_v01.png`] },
  };
}
