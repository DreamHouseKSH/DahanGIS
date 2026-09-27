/** Approved one-page copy. Do not infer company facts from generated imagery. */
export const chapters = [
  { id: 'start', label: '시작', english: 'Overview' },
  { id: 'about', label: '다한', english: 'Our philosophy' },
  { id: 'services', label: '서비스', english: 'Capabilities' },
  { id: 'why', label: '강점', english: 'Our standards' },
  { id: 'process', label: '프로세스', english: 'How we work' },
  { id: 'contact', label: '문의', english: 'Start a project' },
] as const;
export type Chapter = typeof chapters[number]['id'];
export const pillars = [
  { id: 'ortho', title: '정사영상 제작·후처리', heading: '경계는 자연스럽게. 정보는 더 선명하게.', copy: '영상의 색상과 밝기, 연결 경계와 구조물의 표현을 세밀하게 살핍니다. 모자이크와 편집, 품질 검수를 통해 활용 목적에 맞는 정사영상으로 다듬습니다.', image: '04-svc-ortho.jpg', icon: 'bounding-box', tags: '정사영상 · 모자이크 · 색상 보정 · 영상 편집' },
  { id: 'data', title: 'GIS 데이터 구축', heading: '보이는 공간을, 활용하는 데이터로.', copy: '위치와 형태, 속성 정보를 연결해 업무에서 사용할 수 있는 공간 데이터를 만듭니다. 자료마다 다른 구조와 형식을 정리하고, 목적에 맞는 데이터셋으로 구성합니다.', image: '05-svc-data.jpg', icon: 'layers', tags: '공간 데이터 · 속성 정비 · 좌표계 · 품질 점검' },
  { id: 'consult', title: 'GIS 컨설팅', heading: '무엇을 만들지보다, 무엇을 해결할지부터.', copy: '보유 자료와 업무 목표를 살피고, 필요한 데이터와 시스템의 범위를 함께 정리합니다. 기술을 나열하기보다 현장에서 실행할 수 있는 방법을 찾습니다.', image: '06-svc-consult.jpg', icon: 'diagram-3', tags: '요구사항 · 구축 방향 · 실행 계획 · 운영 검토' },
  { id: 'software', title: '공간정보 소프트웨어', heading: '반복은 줄이고, 업무에 집중하도록.', copy: '공간 데이터를 더 편리하게 확인하고 처리할 수 있도록 업무에 맞는 도구와 화면을 설계합니다. 영상과 지도, 데이터와 작업 흐름을 연결합니다.', image: '07-svc-software.jpg', icon: 'code-square', tags: '지도 시각화 · 작업 지원 · 업무 자동화 · 맞춤 개발' },
  { id: 'edu', title: '실무 중심 GIS 교육', heading: '아는 것을 넘어, 직접 활용할 수 있도록.', copy: '공간정보의 기본 개념부터 데이터 확인과 편집, 소프트웨어 활용까지. 업무에 연결되는 실습 중심의 교육을 준비하고 있습니다.', image: '08-svc-edu.jpg', icon: 'book', tags: 'GIS 기초 · 소프트웨어 활용 · 데이터 실습 · 맞춤 과정', status: '준비 중' },
] as const;
export const standards = [
  ['세밀하게 살핍니다.', '색상 차이와 연결 경계, 누락된 정보처럼 지나치기 쉬운 부분을 확인합니다.', 'crosshair'],
  ['기준을 먼저 맞춥니다.', '작업 목적과 납품 조건을 먼저 정리하고, 그 기준에 맞춰 결과를 점검합니다.', 'check2-square'],
  ['실제 쓰임을 생각합니다.', '받은 자료가 다음 업무에서 어떻게 사용될지 고려해 형식과 구성을 다듬습니다.', 'layers'],
  ['끝까지 소통합니다.', '진행 중 확인이 필요한 사항을 공유하고, 합의한 범위 안에서 수정과 납품을 이어갑니다.', 'chat-square-text'],
] as const;
export const workflow = [
  ['요구사항 확인', '대상 지역, 활용 목적, 희망 일정과 납품 조건을 함께 정리합니다.', '목적 · 범위 · 일정', '06-svc-consult.jpg'],
  ['자료 검토', '제공된 영상과 관련 성과의 구성·상태를 확인하고 작업 범위를 정합니다.', '원천 자료 · 구성 확인', '01-hero-bg.jpg'],
  ['처리·편집', '협의한 범위에 따라 영상 후처리, 모자이크, 색상 보정과 편집을 진행합니다.', '색상 · 경계 · 표현', '04-svc-ortho.jpg'],
  ['데이터 정리', '필요한 데이터 구성과 속성, 파일 형식을 정리해 산출물을 준비합니다.', '속성 · 형식 · 구성', '05-svc-data.jpg'],
  ['품질 검수', '누락, 경계, 표현과 파일 구성을 점검하고 협의한 품질 기준을 확인합니다.', '기준 확인 · 품질 검수', '02-card-ortho.jpg'],
  ['납품·활용 지원', '산출물과 필요한 안내를 전달하고, 합의된 범위의 후속 확인을 진행합니다.', '산출물 · 안내 · 후속 확인', '07-svc-software.jpg'],
] as const;
export const sceneImage = (name: string) => `/images/dahangis-2026/${name}`;
