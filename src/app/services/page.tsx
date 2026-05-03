import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../components/dahangis/data';

type DetailItem = {
  title: string;
  description: string;
  meta?: string;
};

type DetailTable = {
  headers: string[];
  rows: string[][];
  note?: string;
};

type DetailGroup = {
  title: string;
  description?: string;
  items?: DetailItem[];
  table?: DetailTable;
  wide?: boolean;
};

type ServiceDetail = {
  mono: string;
  headline: [string, string];
  lead: string;
  ctaLabel: string;
  badge?: string;
  visualLabel: string;
  visualStatus: string;
  visualTags: string[];
  specs: DetailItem[];
  features: DetailItem[];
  groups: DetailGroup[];
};

const serviceDetails: Record<string, ServiceDetail> = {
  ortho: {
    mono: 'Drone · Aerial · Satellite',
    headline: ['고해상도 정사영상을', '더 빠르고, 더 정확하게.'],
    lead:
      '드론·항공·위성 영상을 지상기준점 기준으로 보정해 지도급 정밀도의 정사영상을 제공합니다. 대단위 모자이킹부터 COG·WMTS 배포까지 사업 조건에 맞춰 지원합니다.',
    ctaLabel: '정사영상 견적 요청',
    visualLabel: 'ortho preview · GCP / UAV path',
    visualStatus: '고해상도',
    visualTags: ['GCP 보정', 'UAV path', '대상 영역'],
    specs: [
      { title: '고해상도', description: '정사영상 · GCP 보정 적용' },
      { title: '정밀', description: '국가 좌표계 기반 후처리' },
      { title: '대단위', description: '자동 모자이킹 · QA 리포트' },
    ],
    features: [
      { title: 'RTK/PPK 기반 정밀 측량', description: '실시간·후처리 보정으로 기준점 기반 정확도를 확보합니다.' },
      { title: '대단위 자동 모자이킹', description: '다수 프레임을 번들링·색보정·이음매 편집까지 연결해 처리합니다.' },
      { title: '표준 포맷 제공', description: 'GeoTIFF, COG, MBTiles, WMTS, XYZ 등 활용 목적에 맞는 포맷으로 납품합니다.' },
      { title: '품질 리포트 생성', description: '중첩률, 정확도 검증, 좌표계, 산출물 구성 정보를 보고서로 정리합니다.' },
    ],
    groups: [
      {
        title: '서비스 소개',
        description:
          '항공 사진과 드론 촬영 데이터를 전문 후처리 공정으로 정사보정해 오차를 줄이고, 도시계획·건설·환경 모니터링 등 업무에서 바로 활용할 수 있는 공간 정보를 제공합니다.',
        items: [
          { title: '주요 특징', description: '높은 정확도와 해상도, 최신 촬영 장비와 처리 기술, 고객 맞춤형 데이터 포맷 제공' },
          { title: '활용 분야', description: '도시 계획, 건설 및 토목, 환경 모니터링, 재난 피해 분석, 시설물 관리' },
        ],
      },
      {
        title: '제작 프로세스',
        items: [
          { title: '촬영 계획 수립', description: '대상 지역을 분석하고 비행 경로, 촬영 고도, 기준점 배치 계획을 수립합니다.' },
          { title: '데이터 취득', description: '항공·드론 촬영과 지상기준점 측량을 수행해 원천 데이터를 확보합니다.' },
          { title: '데이터 처리', description: '항공삼각측량, DEM·DSM 생성, 정사보정, 좌표계 변환을 수행합니다.' },
          { title: '후처리 및 편집', description: '색상 보정, 모자이크, 구조물 편집, 이음매 품질을 정리합니다.' },
          { title: '품질 검수 및 납품', description: '정확도 검증 후 요구 포맷으로 변환하고 최종 산출물을 납품합니다.' },
        ],
      },
      {
        title: '활용 기술 및 장비',
        items: [
          { title: '고정밀 항공삼각측량', description: '다중 영상 기하 보정과 번들 조정 기반으로 영상 위치를 정합합니다.' },
          { title: 'DEM·DSM·DTM 생성', description: '스테레오 매칭과 LiDAR 융합 데이터를 활용해 지형 모델을 구축합니다.' },
          { title: '심리스 모자이크', description: '방사 보정과 솔기선 탐색으로 대면적 영상의 색상과 경계를 정리합니다.' },
          { title: '측량 장비', description: '고해상도 항공 카메라, 측량용 UAV, GNSS/INS 통합 시스템, 전문 후처리 소프트웨어' },
        ],
      },
      {
        title: '정확도 및 품질 기준',
        description: '공공측량 작업규정과 발주 요구사항을 기준으로 프로젝트별 품질 기준을 협의합니다.',
        table: {
          headers: ['항목', '기준 예시', '비고'],
          rows: [
            ['공간 해상도(GSD)', '5cm ~ 50cm', '촬영 조건과 요구사항에 따라 협의'],
            ['수평 위치 정확도', '1 GSD 이하', 'GCP 측량 및 AT 정확도 기반'],
            ['수직 위치 정확도', '1.5 GSD 이하', 'DEM·DSM 정확도 기반'],
            ['데이터 포맷', 'GeoTIFF, ECW, JPG 등', '고객 요구 포맷 지원'],
            ['좌표계', 'GRS80, UTM-K 등', '국가 표준 및 요구 좌표계 지원'],
          ],
          note: '상기 기준은 일반 예시이며 실제 기준은 프로젝트별 조건에 따라 확정됩니다.',
        },
        wide: true,
      },
      {
        title: '주요 활용 사례',
        items: [
          { title: '국토 및 도시 계획', description: '도시 변화 모니터링, 토지 이용 계획, 시설물 관리, 3D 도시 모델 구축' },
          { title: '건설 및 토목', description: '공사 진척 관리, 토공량 산출, 구조물 안전 진단, 준공 도면 제작' },
          { title: '환경 및 재난 관리', description: '식생 변화 분석, 환경 오염 모니터링, 피해 지역 분석, 복구 계획 수립' },
        ],
      },
    ],
  },
  data: {
    mono: 'Vector · Attribute · QA',
    headline: ['정확한 속성,', '표준화된 구조.'],
    lead:
      '지형·지물·시설물 데이터를 발주 요구사항과 표준 코드체계에 맞춰 구축합니다. 수집, 입력, 구조화, 품질검수, DB 설계까지 데이터 생애주기를 함께 정리합니다.',
    ctaLabel: '데이터 구축 문의',
    visualLabel: 'data layer · QA / CRS',
    visualStatus: 'QA OK',
    visualTags: ['EPSG:5179', 'Topology', 'Attribute'],
    specs: [
      { title: '표준', description: '국가 좌표계 · 코드체계 적용' },
      { title: 'QA/QC', description: '자동 검사 · 전문가 검수 병행' },
      { title: 'DB', description: 'PostGIS · Oracle Spatial 등 지원' },
    ],
    features: [
      { title: '지형·지물 벡터화', description: '건물, 도로, 수계, 식생 등 레이어별 공간 객체를 정밀하게 구축합니다.' },
      { title: '속성 데이터 정비', description: '현장조사 자료와 기존 DB를 매칭해 속성 완결성과 일관성을 확보합니다.' },
      { title: '좌표계·포맷 변환', description: '국가 좌표계와 고객 시스템 환경에 맞게 공간 데이터를 변환합니다.' },
      { title: '공간 데이터 QA', description: '위상 오류, 중복, 누락, 코드 불일치, 메타데이터 품질을 점검합니다.' },
    ],
    groups: [
      {
        title: '서비스 소개',
        description:
          '프로젝트 초기에 인터뷰와 현장 진단을 진행해 데이터 활용 목표와 업무 흐름을 구체화하고, 좌표계·속성 체계·품질 기준을 설계합니다. 납품 단계에서는 표준 포맷 데이터와 품질 보고서, 운영 가이드를 함께 제공합니다.',
        items: [
          { title: '구축 분야', description: '수치지형도, 지적도, 도로·건물·시설물 주제도, 3D 공간 데이터, 실내 지도, 특수 목적 데이터' },
          { title: '원천 자료', description: '정사영상, 수치지도, 현장 조사 자료, 시설물 대장, 공공 및 민간 원천 DB' },
        ],
      },
      {
        title: '데이터 구축 방법론',
        items: [
          { title: '요구사항 분석 및 설계', description: '데이터 모델링, 속성 정보 설계, 작업 지침서 작성, 품질 기준 정의' },
          { title: '데이터 수집 및 입력', description: '벡터·래스터 공간 정보와 속성 정보를 수집하고 입력합니다.' },
          { title: '편집 및 구조화', description: '위상 관계를 정립하고 레이어 구조와 속성 체계를 표준화합니다.' },
          { title: '품질 검수', description: '정확성, 완전성, 일관성, 표준 준수 여부를 자동 검사와 육안 검수로 확인합니다.' },
          { title: '최종 산출물 제작', description: 'Shapefile, Geodatabase, GeoJSON 등 요구 포맷으로 변환해 납품합니다.' },
        ],
      },
      {
        title: '품질 관리(QA/QC)',
        items: [
          { title: '데이터 검토', description: '누락, 중복, 형식 오류 등 기본 품질을 확인합니다.' },
          { title: '정확도 검증', description: '위치 정확도와 속성 정확도를 기준에 따라 검증합니다.' },
          { title: '논리적 일관성 검증', description: '위상 오류와 데이터 간 모순을 검사합니다.' },
          { title: '완전성 검증', description: '구축 대상 범위 내 객체와 속성의 누락 여부를 확인합니다.' },
          { title: '표준 준수 검증', description: '데이터 모델, 속성 코드, 메타데이터 표준 준수 여부를 검토합니다.' },
          { title: '최종 검수', description: '전문가가 최종 산출물을 종합적으로 검토합니다.' },
        ],
      },
      {
        title: '구축 가능 데이터 종류',
        items: [
          { title: '기본 공간 데이터', description: '수치지형도, 지적도, 정사영상 기반 데이터, 위성영상 기반 데이터' },
          { title: '주제도 데이터', description: '도로망, 교통 시설물, 하천망, 건물, 행정 경계, 토지 이용, 지하시설물' },
          { title: '3D 및 특수 데이터', description: '3D 건물 모델, DEM·DSM·DTM, 실내 공간 데이터, LiDAR 처리, 고객 맞춤 데이터' },
        ],
      },
      {
        title: '분야별 구축 사례',
        items: [
          { title: '공공 행정', description: '스마트시티 플랫폼 데이터, 국토·도시 계획 지원 데이터, 시설물 관리 대장 전산화' },
          { title: '민간 기업', description: '물류망 분석 데이터, 상권 분석·입지 선정 데이터, 통신망 관리 데이터' },
          { title: '환경 및 에너지', description: '환경 영향 평가 데이터, 신재생 에너지 입지 분석 데이터, 산림 자원 관리 데이터' },
          { title: '교통 및 국방', description: 'ITS 데이터, 자율주행 지원 정밀 도로 지도, 국방 지형 정보 데이터' },
        ],
      },
      {
        title: '데이터베이스 설계 및 관리',
        items: [
          { title: '공간 DB 설계', description: '개념·논리·물리 모델을 설계하고 OGC 등 국제 표준을 반영합니다.' },
          { title: '다양한 DBMS 지원', description: 'PostgreSQL/PostGIS, Oracle Spatial, MS SQL Server, MySQL 등 고객 환경에 맞춰 구축합니다.' },
          { title: 'ETL 및 마이그레이션', description: 'FME, GDAL/OGR 등 도구를 활용해 대용량 데이터를 안정적으로 로딩합니다.' },
          { title: '튜닝 및 유지관리', description: '공간 인덱스, 쿼리 성능, 백업·복구, 변경 이력 관리 체계를 정리합니다.' },
        ],
        wide: true,
      },
    ],
  },
  consult: {
    mono: 'Planning · ISP · Architecture',
    headline: ['문제를 풀기 전,', '먼저 구조를 설계합니다.'],
    lead:
      '사업 기획, ISP 수립, 시스템 아키텍처 설계까지. 공공 발주 RFP 검토부터 장기 로드맵 수립, 기술 스택 선정, 운영 체계 설계까지 함께 합니다.',
    ctaLabel: '컨설팅 일정 잡기',
    visualLabel: 'consulting engagement · phase map',
    visualStatus: '전략 설계',
    visualTags: ['진단', '요구정의', '로드맵'],
    specs: [
      { title: 'ISP', description: '중장기 비전 · 로드맵 수립' },
      { title: 'BPR', description: '업무 프로세스 진단 및 개선' },
      { title: 'TO-BE', description: '아키텍처 · 운영 체계 설계' },
    ],
    features: [
      { title: '현황 분석 · 요구 정의', description: '이해관계자 인터뷰, 데이터 현황 조사, 요구사항 명세를 수행합니다.' },
      { title: '정보화전략계획(ISP)', description: '중장기 비전, 로드맵, 예산, KPI, 단계별 추진 체계를 수립합니다.' },
      { title: '아키텍처 · 스택 설계', description: '클라우드, 오픈소스, 상용 솔루션 간 균형 잡힌 기술 구성을 제안합니다.' },
      { title: '거버넌스 · 운영 체계', description: '조직, 프로세스, 역할, 운영 기준, 유지관리 체계를 설계합니다.' },
    ],
    groups: [
      {
        title: '서비스 소개',
        description:
          '공간 정보 시스템 구축 및 운영에 대한 전문 컨설팅을 제공합니다. 고객 맞춤형 전략, 검증된 방법론, 실행 가능한 로드맵을 통해 시스템 효율성과 투자 효과를 높이는 방향을 제시합니다.',
        items: [
          { title: '컨설팅 분야', description: 'GIS 시스템 도입 전략, 공간 데이터 활용 방안, 업무 프로세스 개선, 최신 GIS 기술 적용' },
          { title: '지원 범위', description: 'RFP 검토, 예산 산정, 단계별 추진 전략, 기술 검증, 운영 안정화 방안' },
        ],
      },
      {
        title: '컨설팅 방법론 및 절차',
        items: [
          { title: '현황 분석 및 요구사항 정의', description: '비즈니스 환경, 기존 시스템, 데이터 현황을 진단하고 목표를 설정합니다.' },
          { title: '전략 수립 및 로드맵 설계', description: 'GIS 도입·활용 전략과 단계별 실행 계획을 수립합니다.' },
          { title: '솔루션 설계 및 기술 검증', description: '요구 기능, 시스템 설계, 필요 기술 검토, PoC 방향을 정리합니다.' },
          { title: '시스템 구축 및 통합 지원', description: '개발·구축 관리, 기존 시스템 연계, 데이터 마이그레이션을 지원합니다.' },
          { title: '성과 측정 및 안정화 지원', description: '도입 효과 분석, 사용자 교육, 운영 최적화 방안을 제시합니다.' },
        ],
      },
      {
        title: '컨설턴트 전문성',
        items: [
          { title: '실무 경험', description: '공공 및 민간 분야의 다양한 GIS 프로젝트 컨설팅과 수행 경험을 바탕으로 판단합니다.' },
          { title: '전문 자격과 방법론', description: 'GIS, 정보시스템, 데이터베이스, 프로젝트 관리 영역의 전문 지식을 결합합니다.' },
          { title: '기술 통찰력', description: 'AI, 빅데이터, 클라우드, 오픈소스 GIS와 기존 업무 시스템의 접점을 검토합니다.' },
        ],
      },
      {
        title: '컨설팅 사례 유형',
        items: [
          { title: '공공 시설물 관리', description: '분산 데이터 통합, 모바일 현장 점검, GIS 기반 분석·시각화 기능 강화 전략' },
          { title: '상권·입지 분석', description: '상권 데이터, 유동 인구, 경쟁 환경을 결합한 공간 분석 모델 설계' },
          { title: '신재생에너지 입지 분석', description: '일사량, 풍속, 지형, 계통 연계, 환경 규제 데이터를 중첩 분석하는 모델링' },
        ],
      },
      {
        title: '전문 컨설팅 영역',
        items: [
          { title: '산업별 특화', description: '스마트시티, 디지털 트윈, 국토·도시 계획, 교통, 환경·재난, 에너지, 물류, 국방' },
          { title: '기술 기반', description: 'GIS 아키텍처, 공간 빅데이터 분석 플랫폼, AI 기반 공간 예측, 오픈소스 GIS, 실내 공간 정보' },
          { title: '데이터 체계', description: 'GIS 데이터 표준화, 품질 관리 체계, 운영 거버넌스, 메타데이터 관리' },
        ],
        wide: true,
      },
    ],
  },
  software: {
    mono: 'Web · Mobile · API · Analytics',
    headline: ['맞춤형 GIS 플랫폼을,', '프로덕션 품질로.'],
    lead:
      '웹·모바일 GIS 플랫폼, 공간분석 엔진, REST·벡터 타일 API, 대시보드까지 구현합니다. 검증된 GIS 엔진과 모듈형 아키텍처로 운영 가능한 시스템을 만듭니다.',
    ctaLabel: '개발 프로젝트 문의',
    visualLabel: 'platform dashboard · concept',
    visualStatus: '자체 플랫폼 개발 중',
    visualTags: ['MapLibre', 'PostGIS', 'API'],
    specs: [
      { title: 'MapLibre', description: '지도 렌더링 · 벡터 타일' },
      { title: 'PostGIS', description: '공간 DB · 분석 쿼리' },
      { title: 'React/Next', description: '웹 프론트엔드 · 대시보드' },
    ],
    features: [
      { title: '웹/모바일 GIS 플랫폼', description: '반응형 지도 UI, 벡터 타일, 현장 업무 흐름, 오프라인 지원을 설계합니다.' },
      { title: '공간분석 엔진', description: '버퍼, 교차, 접근성, 가시권, 혼잡도 등 업무 분석 기능을 구현합니다.' },
      { title: 'REST/Tile API', description: 'WMS, WFS, WMTS, 벡터 타일, 공간 검색 API를 시스템 요구에 맞게 제공합니다.' },
      { title: '실시간 대시보드', description: 'IoT, 센서, CCTV, 현장 이벤트 데이터를 지도와 지표로 시각화합니다.' },
    ],
    groups: [
      {
        title: '서비스 소개',
        description:
          '현업 인터뷰와 로그 분석으로 업무 목표, KPI, 연계 시스템 요건을 정리하고 명확한 요구사항 명세를 작성합니다. 보안 진단, 코드 리뷰, 단계별 시연으로 기능과 품질을 검증하며 구축 이후 유지관리 프로그램까지 연결합니다.',
        items: [
          { title: '개발 분야', description: '웹 GIS, 모바일 GIS 앱, 데스크톱 GIS 솔루션, 공간 분석 및 시각화 도구' },
          { title: '운영 지원', description: '성능 모니터링, 사용자 교육, 장애 대응, 기능 개선과 보안 패치' },
        ],
      },
      {
        title: '소프트웨어 개발 프로세스',
        items: [
          { title: '요구사항 분석 및 기획', description: '고객 요구사항, 기능 정의, 화면 설계, 업무 흐름을 정리합니다.' },
          { title: '시스템 설계 및 아키텍처', description: '데이터 모델, 기술 스택, 연계 방식, 배포 구조를 설계합니다.' },
          { title: '개발 및 구현', description: '설계 기반 구현, 단위 테스트, 코드 리뷰, 지도 컴포넌트 통합을 수행합니다.' },
          { title: '통합 테스트 및 품질 보증', description: '기능, 성능, 보안, 사용자 인수 테스트를 통해 품질을 확인합니다.' },
          { title: '배포 및 안정화', description: '운영 환경 배포, 모니터링, 업데이트, 기술 지원 체계를 마련합니다.' },
        ],
      },
      {
        title: '활용 기술 스택',
        items: [
          { title: '프론트엔드', description: 'TypeScript, React, Vue, Angular, OpenLayers, Leaflet, Mapbox GL JS, CesiumJS' },
          { title: '백엔드', description: 'Java Spring Boot, Python Django·Flask, Node.js Express, .NET, GDAL/OGR, JTS/GEOS' },
          { title: '데이터베이스 및 인프라', description: 'PostgreSQL/PostGIS, Oracle Spatial, GeoServer, MapServer, AWS, Azure, GCP, Docker, Kubernetes' },
        ],
      },
      {
        title: '개발 포트폴리오 유형',
        items: [
          { title: '웹 기반 시설물 관리 시스템', description: '시설물 조회·편집, 공간 분석, 통계 리포팅 기능을 제공하는 웹 GIS 시스템' },
          { title: '모바일 현장 조사 앱', description: '사진 촬영, GPS 위치 기록, 오프라인 지도, 현장 데이터 수집 기능' },
          { title: '데스크톱 공간 분석 도구', description: '환경·교통 등 특정 산업을 위한 고급 공간 분석과 시뮬레이션 도구' },
        ],
      },
      {
        title: '커스터마이징 및 시스템 통합',
        items: [
          { title: '기능 커스터마이징', description: '기존 GIS 솔루션에 업무별 기능을 추가하거나 수정합니다.' },
          { title: 'UI/UX 맞춤 설계', description: '반복 업무와 현장 사용성을 고려해 화면 흐름을 설계합니다.' },
          { title: '워크플로우 자동화', description: '반복적인 GIS 업무와 데이터 처리 절차를 자동화합니다.' },
          { title: '기간계 연동', description: 'ERP, CRM, 그룹웨어 등 기존 시스템과 데이터를 연계합니다.' },
          { title: '데이터 포맷 지원', description: '특수 데이터 포맷 입출력 기능과 변환 파이프라인을 구현합니다.' },
        ],
        wide: true,
      },
      {
        title: '기술 지원 및 유지보수',
        items: [
          { title: '기술 지원', description: '운영 중 발생하는 기술 문의, 원격 지원, 장애 처리 절차를 지원합니다.' },
          { title: '업데이트 및 패치', description: '기능 개선, 버그 수정, 보안 패치를 운영 계획에 맞게 제공합니다.' },
          { title: '성능 최적화', description: '성능 모니터링, 병목 분석, 데이터 백업·복구 지원을 수행합니다.' },
        ],
      },
    ],
  },
  edu: {
    mono: 'Public · Enterprise · Online',
    headline: ['실무에서 바로 쓰는,', 'GIS 교육을 준비 중입니다.'],
    lead:
      'QGIS, ArcGIS, 드론 측량, 공간분석, Python 실무 커리큘럼을 공공기관·기업 맞춤형 트랙과 온·오프라인 워크숍 형태로 준비하고 있습니다.',
    ctaLabel: '사전 등록 · 문의',
    badge: 'Coming Soon',
    visualLabel: 'curriculum · draft',
    visualStatus: 'preparing',
    visualTags: ['QGIS', 'ArcGIS Pro', 'Python'],
    specs: [
      { title: '입문', description: 'GIS 기본 원리 · QGIS' },
      { title: '중급', description: 'ArcGIS Pro · 드론 측량' },
      { title: '고급', description: 'Python · 공간분석 자동화' },
    ],
    features: [
      { title: '기초 · QGIS / ArcGIS', description: '입문자를 위한 지도 제작, 레이어 관리, 기본 공간 분석 과정을 준비합니다.' },
      { title: '드론 측량 실무', description: '촬영 계획, GCP, 후처리, 정확도 검증, 정사영상 생성 워크숍을 구성합니다.' },
      { title: '공간분석 with Python', description: 'GeoPandas, Rasterio, Folium 기반 실전 데이터 분석 과정을 준비합니다.' },
      { title: '맞춤형 기업/기관 연수', description: '조직의 실제 과제와 데이터를 기반으로 커리큘럼을 조정합니다.' },
    ],
    groups: [
      {
        title: '서비스 소개',
        description:
          'GIS 전문가 양성을 위한 실무 중심 교육 프로그램입니다. 기본 원리부터 주요 소프트웨어 활용, 공간 데이터 분석, 분야별 활용 사례, 맞춤형 기업 교육까지 단계적으로 구성할 예정입니다.',
        items: [
          { title: '교육 과정', description: 'GIS 기본 원리, ArcGIS·QGIS 활용, 공간 데이터 분석, 도시·환경·재난 분야 활용, 맞춤형 기업 교육' },
          { title: '교육 방향', description: '실제 프로젝트 기반 실습, 최신 GIS 기술 반영, 기관별 데이터와 업무 과제 기반 워크숍' },
        ],
      },
      {
        title: '상세 교육 과정 예시',
        items: [
          { title: 'GIS 기본 원리 및 활용 과정', description: 'GIS 개념, 벡터·래스터 데이터, 좌표계, QGIS 기본 조작, 지도 제작, 기본 공간 분석' },
          { title: 'ArcGIS 활용 실무 과정', description: 'ArcGIS Pro 프로젝트 관리, Geodatabase 설계, 데이터 편집, 위상 검증, 분석 자동화' },
          { title: 'Python 기반 공간 데이터 분석 과정', description: 'Python 환경, GeoPandas, Rasterio, Folium, 공간 통계, 데이터 분석 프로젝트' },
        ],
      },
      {
        title: '최적의 교육 환경',
        items: [
          { title: '강의 환경', description: '실습 중심 강의를 위한 PC, 듀얼 모니터, 최신 GIS 소프트웨어 환경을 준비합니다.' },
          { title: '실습 데이터', description: '실무와 유사한 다양한 공간 데이터와 과제를 제공합니다.' },
          { title: '온·오프라인 지원', description: '조직 상황에 맞는 현장 교육, 온라인 강의, 워크숍 형태를 검토합니다.' },
        ],
      },
      {
        title: '교육 방식 특징',
        items: [
          { title: '실무 중심', description: '실제 프로젝트 기반 실습과 사례 연구로 구성합니다.' },
          { title: '소수 정예', description: '강사와 수강생 간 상호작용과 피드백을 고려한 운영 방식을 준비합니다.' },
          { title: '맞춤형 교육', description: '기업과 기관의 업무 목적, 보유 데이터, 시스템 환경에 맞춰 커리큘럼을 조정합니다.' },
          { title: '수료 및 인증', description: '정규 과정 개설 시 공식 수료 기준과 인증 방식을 함께 안내할 예정입니다.' },
        ],
        wide: true,
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main className="dg-shell">
      <section className="dg-page-head dg-services-head">
        <div className="dg-wrap">
          <div>
            <div className="dg-eyebrow">Services · 다섯 가지 역량</div>
            <h1 className="dg-page-title" data-reveal>공간을<br /><i>만드는 법.</i></h1>
          </div>
          <p className="dg-lead" data-reveal data-reveal-delay="1">
            수집부터 구축, 분석, 배포, 교육까지. 각 서비스는 독립 발주도, 통합 패키지도 가능합니다.
          </p>
        </div>
      </section>

      <nav className="dg-service-nav" aria-label="서비스 바로가기">
        <div className="dg-service-nav-inner">
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`}>
              <span>{service.no}</span> {service.title}
            </a>
          ))}
        </div>
      </nav>

      {services.map((service, index) => {
        const detail = serviceDetails[service.id];

        if (!detail) {
          return null;
        }

        return (
          <section
            className={`dg-section dg-service-detail ${index % 2 ? 'dg-alt' : ''}`}
            id={service.id}
            key={service.id}
          >
            <div className={`dg-wrap dg-detail-grid ${index % 2 ? 'dg-flip' : ''}`}>
              <div>
                {detail.badge ? <div className="dg-soon-badge">{detail.badge}</div> : null}
                <span className="dg-big-num">{service.no}</span>
                <div className="dg-eyebrow">{service.meta} · {service.title}</div>
                <div className="dg-mono dg-service-mono">{detail.mono}</div>
                <h2 className="dg-section-title" data-reveal>
                  {detail.headline[0]}<br /><i>{detail.headline[1]}</i>
                </h2>
                <p className="dg-lead" data-reveal data-reveal-delay="1">{detail.lead}</p>

                <div className="dg-spec-row" data-reveal data-reveal-delay="2">
                  {detail.specs.map((spec) => (
                    <div className="dg-spec" key={spec.title}>
                      <strong>{spec.title}</strong>
                      <span>{spec.description}</span>
                    </div>
                  ))}
                </div>

                <ul className="dg-feature-list" data-reveal data-reveal-delay="3">
                  {detail.features.map((feature, featureIndex) => (
                    <li key={feature.title}>
                      <span className="dg-mono">{String(featureIndex + 1).padStart(2, '0')}</span>
                      <div><b>{feature.title}</b><br /><span>{feature.description}</span></div>
                    </li>
                  ))}
                </ul>

                <div className="dg-chip-row">
                  {service.tags.map((tag) => <span className="dg-tag" key={tag}>{tag}</span>)}
                </div>
                <Link href="/contact" className="dg-button dg-primary" style={{ marginTop: 26 }}>
                  {detail.ctaLabel} <span>↗</span>
                </Link>
              </div>

              <div className="dg-service-visual" data-reveal data-reveal-delay="2">
                <div className="dg-panel-top">
                  <span>● {detail.visualLabel}</span>
                  <span>{detail.visualStatus}</span>
                </div>
                <div className="dg-service-visual-image">
                  <Image
                    src={service.detailImage}
                    width={900}
                    height={1100}
                    alt={`${service.title} 상세 이미지`}
                    priority={index === 0}
                    sizes="(max-width: 980px) 100vw, 42vw"
                  />
                </div>
                <div className="dg-visual-tags">
                  {detail.visualTags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>

              <div className="dg-service-extended">
                <div className="dg-detail-block-grid">
                  {detail.groups.map((group) => (
                    <article className={`dg-detail-block ${group.wide ? 'dg-wide' : ''}`} key={group.title}>
                      <h3>{group.title}</h3>
                      {group.description ? <p className="dg-detail-copy">{group.description}</p> : null}

                      {group.items ? (
                        <div className="dg-detail-items">
                          {group.items.map((item) => (
                            <div className="dg-detail-item" key={item.title}>
                              {item.meta ? <span className="dg-mono">{item.meta}</span> : null}
                              <strong>{item.title}</strong>
                              <p>{item.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {group.table ? (
                        <div className="dg-detail-table-wrap">
                          <table className="dg-detail-table">
                            <thead>
                              <tr>
                                {group.table.headers.map((header) => <th key={header}>{header}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {group.table.rows.map((row) => (
                                <tr key={row.join('-')}>
                                  {row.map((cell) => <td key={cell}>{cell}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {group.table.note ? <p className="dg-detail-note">{group.table.note}</p> : null}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="dg-section dg-service-disclosure">
        <div className="dg-wrap">
          <div className="dg-disclosure-box">
            <div className="dg-eyebrow">Note · 표기 안내</div>
            <p>
              GIS 교육은 현재 준비 중이며, 정식 개강 시점·트랙별 운영 방식·정원은 추후 확정됩니다.
              사전 문의를 남기시면 확정되는 범위부터 우선 안내드립니다.
            </p>
            <p>
              일부 화면과 대시보드는 자체 개발 중인 도구·플랫폼의 컨셉 시각화입니다.
              실제 화면과 기능은 프로젝트 조건, 발주 요건, 개발 진행 상황에 따라 달라질 수 있습니다.
            </p>
            <p>
              본 페이지에 표기된 기술 사양·납품 포맷·정확도 기준은 일반 기준이며,
              실제 산출물의 구체 사양은 대상 지역, 원천 자료, 요구 품질 기준을 확인한 뒤 협의합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="dg-section">
        <div className="dg-wrap dg-section-head">
          <div>
            <div className="dg-eyebrow">Next · 프로젝트 문의</div>
            <h2 className="dg-section-title" data-reveal>필요한 범위를<br /><i>함께 정리합니다.</i></h2>
          </div>
          <div>
            <p className="dg-lead">정확한 견적을 위해 서비스 범위, 대상 지역, 일정, 보유 자료를 함께 확인합니다.</p>
            <Link href="/contact" className="dg-button dg-primary">문의하기 <span>↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
