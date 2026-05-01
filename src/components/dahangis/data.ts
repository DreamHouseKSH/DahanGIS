export const assetPath = '/images/dahangis-2026';

export const navItems = [
  { href: '/', label: '홈' },
  { href: '/services', label: '서비스' },
  { href: '/#why', label: '강점' },
  { href: '/#process', label: '프로세스' },
  { href: '/contact', label: '문의' },
];

export const services = [
  {
    id: 'ortho',
    no: '01',
    meta: 'Imagery',
    title: '정밀 정사영상 제작',
    summary: '드론·항공사진 측량 기반 고해상도 정사영상. GCP 보정, 대단위 모자이킹, 표준 포맷 납품까지 지원합니다.',
    image: `${assetPath}/02-card-ortho.jpg`,
    detailImage: `${assetPath}/04-svc-ortho.jpg`,
    tags: ['GeoTIFF', 'COG', 'WMTS'],
    features: ['RTK/PPK 기반 정밀 측량', '대단위 자동 모자이킹', '표준 포맷 제공', '품질 리포트 자동 생성'],
  },
  {
    id: 'data',
    no: '02',
    meta: 'Data',
    title: 'GIS 데이터 구축',
    summary: '지형·지물·속성 데이터베이스 구축, 품질관리, 표준 코드체계 적용을 일원화합니다.',
    image: `${assetPath}/03-card-data.jpg`,
    detailImage: `${assetPath}/05-svc-data.jpg`,
    tags: ['Vector', 'PostGIS', 'K-GIS'],
    features: ['지형·지물 벡터화', '속성 데이터 정비', '좌표계·포맷 변환', '공간 데이터 QA'],
  },
  {
    id: 'consult',
    no: '03',
    meta: 'Consulting',
    title: 'GIS 컨설팅',
    summary: '사업 기획, ISP 수립, 시스템 아키텍처 설계와 운영 체계를 함께 설계합니다.',
    image: `${assetPath}/06-svc-consult.jpg`,
    detailImage: `${assetPath}/06-svc-consult.jpg`,
    tags: ['ISP', 'BPR', 'Roadmap'],
    features: ['현황 분석·요구 정의', '정보화전략계획', '아키텍처·스택 설계', '거버넌스·운영 체계'],
  },
  {
    id: 'software',
    no: '04',
    meta: 'Software',
    title: 'GIS 소프트웨어 개발',
    summary: '웹·모바일 GIS 플랫폼, 공간분석 엔진, REST/벡터 타일 API, 대시보드까지 구현합니다.',
    image: `${assetPath}/07-svc-software.jpg`,
    detailImage: `${assetPath}/07-svc-software.jpg`,
    tags: ['React', 'MapLibre', 'PostGIS'],
    features: ['웹/모바일 GIS 플랫폼', '공간분석 엔진', 'REST/Tile API', '실시간 대시보드'],
  },
  {
    id: 'edu',
    no: '05',
    meta: 'Education',
    title: '실무 중심 GIS 교육',
    summary: 'QGIS · ArcGIS · 드론 측량 · 공간분석 커리큘럼을 공공기관·기업 맞춤형으로 구성합니다.',
    image: `${assetPath}/08-svc-edu.jpg`,
    detailImage: `${assetPath}/08-svc-edu.jpg`,
    tags: ['QGIS', 'ArcGIS', '드론'],
    features: ['실무형 커리큘럼', '기관 맞춤 워크숍', '데이터 구축 실습', '공간분석 프로젝트'],
  },
];

export const strengths = [
  ['01', '최첨단 기술력', '드론 정사영상 · LiDAR · RTK · 공간 AI를 실제 프로젝트에 투입합니다.', 'Technology'],
  ['02', '분야별 전문가', '측량 · 지적 · GIS 개발 · 데이터 엔지니어링 전문 영역별 팀을 운영합니다.', 'People'],
  ['03', '풍부한 사업 경험', '공공기관·지자체·민간 기업과 협업한 경험을 기반으로 요구사항을 빠르게 이해합니다.', 'Experience'],
  ['04', '엔드투엔드 책임', '기획·구축·운영을 한 팀에서 일관된 품질로 끝까지 책임집니다.', 'Ownership'],
];

export const processSteps = [
  ['01 · Capture', '수집', '드론·항공·위성 이미지 촬영과 GCP 기준점 측량.'],
  ['02 · Process', '처리', '자동 정합·보정·모자이킹과 품질 검수.'],
  ['03 · Build', '구축', '벡터화·속성 입력·DB 설계와 표준 준수.'],
  ['04 · Analyse', '분석', '공간분석·시뮬레이션·의사결정 지원.'],
  ['05 · Deliver', '배포', '웹·API·대시보드 납품 및 교육·유지보수.'],
];
