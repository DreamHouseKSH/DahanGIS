export const assetPath = '/images/dahangis-2026';
export const companyLogoSrc = '/images/DAHAN_logo_v01.png';

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
  {
    no: '01',
    title: '최첨단 기술력',
    desc: '드론 정사영상, LiDAR, RTK/PPK, 공간 데이터베이스, 웹 GIS를 프로젝트 목적에 맞게 조합합니다.',
    meta: 'Technology',
    points: ['GCP 기반 정밀 보정', '대용량 영상 모자이킹', 'PostGIS·GeoServer·MapLibre 활용'],
    outcome: '정확도 검증 자료와 운영 가능한 공간 데이터 산출물',
  },
  {
    no: '02',
    title: '분야별 전문가',
    desc: '측량, 지적, GIS 데이터, 소프트웨어 개발, 프로젝트 관리 담당자가 역할을 나눠 품질을 관리합니다.',
    meta: 'People',
    points: ['현장 조사와 데이터 구축 분리 운영', '개발·DB·지도 UI 통합 대응', '공공 발주 문서와 납품 체계 이해'],
    outcome: '요구사항 정의부터 납품 문서까지 이어지는 책임 체계',
  },
  {
    no: '03',
    title: '풍부한 사업 경험',
    desc: '공공기관, 지자체, 민간 기업의 서로 다른 데이터 기준과 업무 흐름을 빠르게 파악해 실행 계획으로 바꿉니다.',
    meta: 'Experience',
    points: ['도시·시설물·환경·교통 데이터 구축', '시스템 고도화와 데이터 마이그레이션', '현장 업무 기반 기능 설계'],
    outcome: '사업 조건에 맞춘 일정, 범위, 품질 기준 제안',
  },
  {
    no: '04',
    title: '엔드투엔드 책임',
    desc: '수집, 처리, 구축, 분석, 배포, 교육까지 한 흐름에서 관리해 단계 사이의 품질 손실을 줄입니다.',
    meta: 'Ownership',
    points: ['원천 데이터부터 서비스 화면까지 추적', '품질 검수와 수정 이력 관리', '운영 전환과 사용자 교육 지원'],
    outcome: '납품 이후 활용까지 고려한 통합 프로젝트 수행',
  },
];

export const processSteps = [
  {
    meta: '01 · Capture',
    title: '수집',
    desc: '대상 지역, 원천 자료, 정확도 기준을 확인하고 드론·항공·위성 영상과 현장 조사 자료를 확보합니다.',
    checks: ['촬영 계획', 'GCP 기준점', '원천 자료 검토'],
    deliverable: '수집 계획서 · 원천 데이터 목록',
  },
  {
    meta: '02 · Process',
    title: '처리',
    desc: '영상 정합, 정사보정, 모자이킹, 좌표계 변환을 수행하고 품질 검수 기준에 맞춰 오류를 정리합니다.',
    checks: ['정사보정', '모자이크', '정확도 검수'],
    deliverable: '정사영상 · 품질 검수표',
  },
  {
    meta: '03 · Build',
    title: '구축',
    desc: '벡터화, 속성 입력, 코드체계 적용, 공간 DB 설계를 통해 업무에서 사용할 수 있는 데이터 구조를 만듭니다.',
    checks: ['레이어 설계', '속성 정비', '위상 검사'],
    deliverable: 'GIS 데이터셋 · DB 스키마',
  },
  {
    meta: '04 · Analyse',
    title: '분석',
    desc: '공간 중첩, 접근성, 입지, 변화 탐지 등 의사결정에 필요한 분석 모델과 시각화 지표를 구성합니다.',
    checks: ['분석 모델', '지도 시각화', '결과 검토'],
    deliverable: '분석 결과 · 지도 리포트',
  },
  {
    meta: '05 · Deliver',
    title: '배포',
    desc: '웹 GIS, API, 대시보드, 표준 파일 형태로 납품하고 운영 전환과 사용자 교육까지 지원합니다.',
    checks: ['웹/API 배포', '운영 가이드', '사용자 교육'],
    deliverable: '납품 패키지 · 운영 문서',
  },
];
