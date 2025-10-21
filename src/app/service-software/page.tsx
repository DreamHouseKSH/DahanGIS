import Image from 'next/image';
import Link from 'next/link';

export default function ServiceSoftwarePage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">GIS 소프트웨어 개발</h1>
      <p className="lead mb-5 text-center">사용자 맞춤형 솔루션으로 업무 효율성을 극대화합니다.</p>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <Image src="/images/gis_software_dev_01.jpg" width={700} height={500} alt="GIS 소프트웨어 개발 화면" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">서비스 소개</h2>
          <p>다한지리정보는 현업 인터뷰와 로그 분석으로 업무 목표, KPI, 연계 시스템 요건을 정리하고 명확한 요구사항 명세를 작성합니다.</p>
          <p>이 명세를 토대로 검증된 GIS 엔진과 모듈형 아키텍처를 구현하며, 보안 진단과 코드 리뷰, 단계별 시연으로 기능과 품질을 검증합니다.</p>
          <p>구축 이후에는 성능 모니터링과 사용자 교육, 장애 대응을 포함한 유지관리 프로그램을 운영해 안정적인 시스템을 유지합니다.</p>
          <h3 className="h5 mt-4 mb-2">개발 분야</h3>
          <ul>
            <li>웹 기반 GIS 시스템 개발</li>
            <li>모바일 GIS 애플리케이션 개발</li>
            <li>데스크톱 GIS 솔루션 개발</li>
            <li>공간 분석 및 시각화 도구 개발</li>
          </ul>
        </div>
      </div>

      {/* 개발 프로세스 */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">소프트웨어 개발 프로세스</h2>
        <p className="text-center mb-4">다한지리정보는 고객의 요구사항을 정확히 반영하고 고품질의 소프트웨어를 개발하기 위해 표준화된 개발 프로세스를 따릅니다. (예: Agile, Waterfall 등 프로젝트 특성에 맞는 방법론 적용)</p>
        <div className="row justify-content-center text-center g-4">
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-clipboard-check fs-3 text-primary mb-2"></i>
              <h6>1. 요구사항 분석<br />&amp; 기획</h6>
              <p className="small mb-0">고객 요구사항 심층 분석, 기능 정의, 화면 설계(UI/UX)</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-palette fs-3 text-primary mb-2"></i>
              <h6>2. 시스템 설계<br />&amp; 아키텍처</h6>
              <p className="small mb-0">최적 시스템 아키텍처 설계, 데이터 모델링, 기술 스택 선정</p>
            </div>
          </div>
          <div className="col-md-2">
             <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-code-slash fs-3 text-primary mb-2"></i>
              <h6>3. 소프트웨어 개발<br />&amp; 구현</h6>
              <p className="small mb-0">설계 기반 코딩, 단위 테스트, 코드 리뷰</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-bug fs-3 text-primary mb-2"></i>
              <h6>4. 통합 테스트<br />&amp; 품질 보증</h6>
              <p className="small mb-0">기능/성능/보안 테스트, 사용자 인수 테스트(UAT)</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-server fs-3 text-primary mb-2"></i>
              <h6>5. 배포 및 안정화<br />&amp; 유지보수</h6>
              <p className="small mb-0">시스템 배포, 운영 지원, 업데이트 및 기술 지원</p>
            </div>
          </div>
        </div>
      </section>
      {/* // 개발 프로세스 끝 */}

      {/* 활용 기술 스택 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">활용 기술 스택</h2>
         <p className="text-center mb-4">다한지리정보는 최신 기술 트렌드를 반영하여 안정적이고 확장 가능한 GIS 소프트웨어를 개발합니다.</p>
        <div className="row g-4">
          <div className="col-md-4">
            <h5>프론트엔드</h5>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
              <li>React, Vue.js, Angular</li>
              <li>HTML5, CSS3 (Bootstrap, Tailwind CSS)</li>
              <li>GIS Libraries: OpenLayers, Leaflet, Mapbox GL JS, CesiumJS</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>백엔드</h5>
            <ul>
              <li>Java (Spring Boot)</li>
              <li>Python (Django, Flask)</li>
              <li>Node.js (Express)</li>
              <li>C# (.NET)</li>
              <li>GIS Libraries: GDAL/OGR, JTS/GEOS</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>데이터베이스 & 기타</h5>
            <ul>
              <li>PostgreSQL + PostGIS</li>
              <li>Oracle Spatial</li>
              <li>MS SQL Server</li>
              <li>MySQL / MariaDB</li>
              <li>GIS Server: GeoServer, MapServer</li>
              <li>Cloud: AWS, Azure, GCP</li>
              <li>DevOps: Docker, Kubernetes, Jenkins</li>
            </ul>
          </div>
        </div>
         <p className="small text-muted text-center mt-3">※ 프로젝트 요구사항 및 특성에 따라 최적의 기술 스택을 조합하여 사용합니다.</p>
      </section>
      {/* // 활용 기술 스택 끝 */}

      {/* 개발 포트폴리오/사례 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">개발 포트폴리오 (예시)</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <Image src="/images/portfolio_webgis_placeholder.jpg" width={500} height={300} className="card-img-top" alt="웹 GIS 시스템" />
                <div className="card-body">
                  <h5 className="card-title">웹 기반 시설물 관리 시스템</h5>
                  <p className="card-text">시설물 정보 조회, 편집, 공간 분석, 통계 리포팅 기능을 제공하는 웹 GIS 시스템.</p>
                  <span className="badge bg-primary me-1">React</span> <span className="badge bg-success me-1">Spring Boot</span> <span className="badge bg-info me-1">PostGIS</span> <span className="badge bg-warning text-dark">OpenLayers</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <Image src="/images/portfolio_mobile_placeholder.jpg" width={500} height={300} className="card-img-top" alt="모바일 GIS 앱" />
                <div className="card-body">
                  <h5 className="card-title">모바일 현장 조사 앱</h5>
                  <p className="card-text">스마트폰을 이용한 현장 데이터 수집, 사진 촬영, GPS 위치 기록, 오프라인 지도 지원.</p>
                   <span className="badge bg-primary me-1">Flutter</span> <span className="badge bg-success me-1">Node.js</span> <span className="badge bg-info me-1">SQLite</span> <span className="badge bg-warning text-dark">Leaflet</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <Image src="/images/portfolio_analysis_placeholder.jpg" width={500} height={300} className="card-img-top" alt="공간 분석 도구" />
                <div className="card-body">
                  <h5 className="card-title">데스크톱 공간 분석 도구</h5>
                  <p className="card-text">특정 산업 분야(예: 환경, 교통)를 위한 고급 공간 분석 및 시뮬레이션 기능 제공.</p>
                   <span className="badge bg-primary me-1">Python</span> <span className="badge bg-success me-1">Qt/PyQt</span> <span className="badge bg-info me-1">GDAL</span> <span className="badge bg-warning text-dark">QGIS Plugin</span>
                </div>
              </div>
            </div>
          </div>
          <p className="small text-muted text-center mt-3">※ 상기 포트폴리오는 이해를 돕기 위한 예시입니다.</p>
        </div>
      </section>
      {/* // 개발 포트폴리오/사례 끝 */}

      {/* 커스터마이징 및 시스템 통합 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">커스터마이징 및 시스템 통합</h2>
         <div className="row align-items-center">
           <div className="col-md-7">
             <p>다한지리정보는 고객의 고유한 업무 환경과 요구사항에 완벽하게 부합하는 맞춤형 솔루션 개발에 강점을 가지고 있습니다.</p>
             <ul>
               <li><strong>기능 커스터마이징:</strong> 기존 GIS 솔루션에 특정 기능 추가 또는 수정</li>
               <li><strong>UI/UX 맞춤 설계:</strong> 사용자 편의성을 고려한 인터페이스 맞춤 설계</li>
               <li><strong>워크플로우 자동화:</strong> 반복적인 GIS 업무 자동화 기능 개발</li>
               <li><strong>기존 시스템 연동:</strong> ERP, CRM, 그룹웨어 등 기간계 시스템과의 원활한 데이터 연동 및 통합</li>
               <li><strong>다양한 데이터 포맷 지원:</strong> 특수 데이터 포맷 입출력 기능 개발</li>
             </ul>
             <p>고객의 비즈니스 프로세스에 최적화된 유연하고 확장 가능한 시스템을 구축하여 투자 효과를 극대화합니다.</p>
           </div>
           <div className="col-md-5">
             <Image src="/images/system_integration_placeholder.jpg" width={700} height={500} alt="시스템 통합 이미지" className="img-fluid rounded shadow" />
           </div>
         </div>
       </section>
       {/* // 커스터마이징 및 시스템 통합 끝 */}

       {/* 기술 지원 및 유지보수 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">기술 지원 및 유지보수</h2>
          <p className="text-center mb-4">소프트웨어 개발 완료 후에도 안정적인 시스템 운영과 지속적인 가치 창출을 위해 체계적인 기술 지원 및 유지보수 서비스를 제공합니다.</p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-3 h-100">
                <i className="bi bi-headset fs-3 text-primary mb-2"></i>
                <h5>기술 지원</h5>
                <p className="small">시스템 운영 중 발생하는 기술 문의 응대, 원격 지원, 장애 처리</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 h-100">
                <i className="bi bi-arrow-up-circle fs-3 text-primary mb-2"></i>
                <h5>업데이트 및 패치</h5>
                <p className="small">기능 개선, 버그 수정, 보안 패치 등 정기/비정기 업데이트 제공</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 h-100">
                <i className="bi bi-graph-up-arrow fs-3 text-primary mb-2"></i>
                <h5>성능 모니터링 및 최적화</h5>
                <p className="small">시스템 성능 모니터링, 병목 현상 분석 및 개선, 데이터 백업/복구 지원</p>
              </div>
            </div>
          </div>
          <p className="text-center mt-4">고객과의 긴밀한 협력을 통해 시스템을 최적의 상태로 유지하고, 변화하는 비즈니스 환경에 능동적으로 대응할 수 있도록 지원합니다. (별도 유지보수 계약 필요)</p>
        </div>
      </section>
      {/* // 기술 지원 및 유지보수 끝 */}

      {/* 관련 서비스 */}
       <section className="mt-5 pt-5 border-top">
          <h2 className="text-center mb-4">관련 서비스</h2> {/* 제목 추가 */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div className="col">
              <div className="card h-100 shadow"> {/* shadow-sm -> shadow */}
                <Image src="/images/gis_ortho_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="정밀 정사영상 제작" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-ortho" className="stretched-link text-decoration-none text-dark">정밀 정사영상 제작</Link></h5>
               </div>
             </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow"> {/* shadow-sm -> shadow */}
                <Image src="/images/gis_data_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 데이터 구축" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-data" className="stretched-link text-decoration-none text-dark">GIS 데이터 구축</Link></h5>
               </div>
             </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow"> {/* shadow-sm -> shadow */}
                <Image src="/images/gis_consulting_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 컨설팅" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-consulting" className="stretched-link text-decoration-none text-dark">GIS 컨설팅</Link></h5>
               </div>
             </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow"> {/* shadow-sm -> shadow */}
                <Image src="/images/gis_education_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 교육" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-education" className="stretched-link text-decoration-none text-dark">GIS 교육</Link></h5>
               </div>
             </div>
           </div>
         </div>
       </section>
    </div>
  );
}
