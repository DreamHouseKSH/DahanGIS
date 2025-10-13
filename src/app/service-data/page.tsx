import Image from 'next/image';
import Link from 'next/link';

export default function ServiceDataPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">GIS 데이터 구축</h1>
      <p className="lead mb-5 text-center">정확하고 신뢰성 있는 공간 정보의 기반을 마련합니다.</p>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <Image src="/images/gis_data_01.jpg" width={700} height={500} alt="GIS 데이터 구축 예시" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">서비스 소개</h2>
          <p>다한지리정보는 프로젝트 초기에 인터뷰와 현장 진단을 진행해 데이터 활용 목표와 업무 흐름을 구체화하고, 그 결과를 반영해 좌표계·속성 체계·품질 기준을 설계합니다. 공공 및 민간 원천 데이터는 상호 검증 절차를 거치며 자동화 검사와 전문가 리뷰를 병행하여 좌표 보정, 위상 오류, 메타데이터 품질을 관리합니다. 납품 단계에서는 표준 포맷 데이터와 품질 보고서, 운영 가이드를 함께 제공해 고객이 곧바로 업무에 활용할 수 있도록 돕습니다.</p>
          <h3 className="h5 mt-4 mb-2">구축 분야</h3>
          <ul>
            <li>수치지형도, 지적도 등 기본 공간 데이터</li>
            <li>도로, 건물, 시설물 등 주제도 데이터</li>
            <li>3D 공간 데이터 및 실내 지도 데이터</li>
            <li>고객 맞춤형 특수 목적 데이터</li>
          </ul>
        </div>
      </div>

      {/* 데이터 구축 방법론 */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">데이터 구축 방법론</h2>
        <p className="text-center mb-4">다한지리정보는 체계적인 방법론과 최신 기술을 적용하여 정확하고 효율적인 GIS 데이터 구축을 수행합니다.</p>
        <div className="accordion" id="methodologyAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <strong>1단계: 요구사항 분석 및 설계</strong>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#methodologyAccordion">
              <div className="accordion-body">
                고객의 요구사항을 명확히 파악하고, 데이터 모델링, 속성 정보 설계, 작업 지침서 작성 등 데이터 구축을 위한 상세 계획을 수립합니다. 활용 목적에 맞는 최적의 데이터 구조와 표준을 정의합니다.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <strong>2단계: 데이터 수집 및 입력</strong>
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#methodologyAccordion">
              <div className="accordion-body">
                정사영상, 수치지도, 현장 조사 자료, 각종 대장 등 다양한 데이터 소스를 활용하여 공간 정보(벡터/래스터) 및 속성 정보를 정확하게 입력합니다. 필요시 데이터 변환 및 좌표 변환 작업을 수행합니다.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <strong>3단계: 편집 및 구조화</strong>
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#methodologyAccordion">
              <div className="accordion-body">
                입력된 데이터의 오류를 수정하고, 위상 관계(Topology)를 정립하여 데이터의 논리적 일관성을 확보합니다. 표준화된 레이어 구조 및 속성 체계에 따라 데이터를 체계적으로 정리합니다.
              </div>
            </div>
          </div>
           <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                <strong>4단계: 품질 검수 (QA/QC)</strong>
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#methodologyAccordion">
              <div className="accordion-body">
                엄격한 품질 관리 기준에 따라 데이터의 정확성, 완전성, 일관성 등을 검증합니다. 자동화된 검수 도구와 전문가의 육안 검사를 병행하여 오류를 최소화합니다. (상세 내용은 아래 QA/QC 프로세스 참조)
              </div>
            </div>
          </div>
           <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                <strong>5단계: 최종 산출물 제작 및 납품</strong>
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#methodologyAccordion">
              <div className="accordion-body">
                검수가 완료된 데이터를 고객 요구 포맷(Shapefile, Geodatabase, GeoJSON 등)으로 변환하고, 메타데이터 및 최종 보고서와 함께 안전하게 납품합니다.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* // 데이터 구축 방법론 끝 */}

      {/* 품질 관리 (QA/QC) 프로세스 */}
      <section className="mt-5 py-5">
           <div className="container">
            <h2 className="text-center mb-4">품질 관리 (QA/QC) 프로세스</h2>
            <p className="text-center mb-4">체계적인 품질 관리 프로세스를 통해 데이터의 신뢰성을 보장합니다.</p>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center p-3 border rounded shadow-sm h-100">
                  <i className="bi bi-clipboard-data fs-3 text-primary mb-2"></i>
                  <h5>데이터 검토</h5>
                  <p className="small">입력 데이터의 누락, 중복, 형식 오류 등 기본적인 사항을 검토합니다.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 border rounded shadow-sm h-100">
                  <i className="bi bi-rulers fs-3 text-primary mb-2"></i>
                  <h5>정확도 검증</h5>
                  <p className="small">위치 정확도, 속성 정보 정확성 등을 관련 규정 및 작업 지침에 따라 검증합니다.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 border rounded shadow-sm h-100">
                  <i className="bi bi-diagram-3 fs-3 text-primary mb-2"></i>
                  <h5>논리적 일관성 검증</h5>
                  <p className="small">위상 오류(Topology Error) 검사 등을 통해 데이터 간의 논리적 모순이 없는지 확인합니다.</p>
                </div>
              </div>
              <div className="col-md-4">
                   <div className="text-center p-3 border rounded shadow-sm h-100">
                    <i className="bi bi-check2-all fs-3 text-primary mb-2"></i>
                    <h5>완전성 검증</h5>
                    <p className="small">구축 대상 범위 내 모든 객체와 속성이 누락 없이 반영되었는지 확인합니다.</p>
                  </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 border rounded shadow-sm h-100">
                  <i className="bi bi-file-earmark-text fs-3 text-primary mb-2"></i>
                  <h5>표준 준수 검증</h5>
                  <p className="small">데이터 모델, 속성 코드, 메타데이터 등이 관련 표준 및 규정을 준수하는지 검토합니다.</p>
                </div>
              </div>
               <div className="col-md-4">
                <div className="text-center p-3 border rounded shadow-sm h-100">
                  <i className="bi bi-person-check fs-3 text-primary mb-2"></i>
                  <h5>최종 검수</h5>
                  <p className="small">전문가가 최종 산출물을 종합적으로 검토하고 승인합니다.</p>
                </div>
              </div>
            </div>
          </div>
      </section>
      {/* // 품질 관리 (QA/QC) 프로세스 끝 */}

      {/* 구축 가능 데이터 종류 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">구축 가능 데이터 종류</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <h5>기본 공간 데이터</h5>
            <ul>
              <li>수치지형도 (1:1,000, 1:5,000 등)</li>
              <li>지적도 (연속지적도 포함)</li>
              <li>정사영상 기반 데이터</li>
              <li>위성영상 기반 데이터</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>주제도 데이터</h5>
            <ul>
              <li>도로망, 교통 시설물</li>
              <li>하천망, 수자원 시설물</li>
              <li>건물, 행정 경계</li>
              <li>토지 이용, 식생</li>
              <li>지하시설물 (상수, 하수, 가스 등)</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>3D 및 특수 데이터</h5>
            <ul>
              <li>3D 건물 모델링 (LOD 1~4)</li>
              <li>수치표고모델 (DEM/DSM/DTM)</li>
              <li>실내 공간 데이터 (Indoor Mapping)</li>
              <li>LiDAR 데이터 처리 및 가공</li>
              <li>고객 맞춤형 특수 목적 데이터</li>
            </ul>
          </div>
        </div>
      </section>
      {/* // 구축 가능 데이터 종류 끝 */}

      {/* 분야별 구축 사례 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">분야별 구축 사례</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">공공 행정</h5>
                  <p className="card-text">스마트시티 통합 플랫폼 데이터 구축, 국토/도시 계획 지원 데이터, 재난/안전 관리 시스템용 데이터, 시설물 관리 대장 전산화 등</p>
                  <small className="text-muted">예: OO시 스마트시티 플랫폼 데이터 구축 사업</small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
               <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">민간 기업</h5>
                  <p className="card-text">물류/유통망 분석 데이터, 상권 분석 및 입지 선정 데이터, 통신망 관리 데이터, 부동산 개발 정보 시스템 구축 등</p>
                   <small className="text-muted">예: XX 유통사 전국 배송망 최적화 데이터 구축</small>
                </div>
              </div>
            </div>
             <div className="col-md-6">
               <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">환경 및 에너지</h5>
                  <p className="card-text">환경 영향 평가 데이터, 신재생 에너지 입지 분석 데이터, 산림 자원 관리 데이터, 송/배전 시설 관리 데이터 등</p>
                   <small className="text-muted">예: OO 에너지 기업 태양광 발전 최적 입지 분석</small>
                </div>
              </div>
            </div>
             <div className="col-md-6">
               <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">교통 및 국방</h5>
                  <p className="card-text">지능형 교통 시스템(ITS) 데이터, 자율주행 지원 정밀 도로 지도, 국방 지형 정보 데이터 구축 등</p>
                   <small className="text-muted">예: △△ 연구기관 자율주행 테스트베드 데이터 구축</small>
                </div>
              </div>
            </div>
          </div>
           <p className="small text-muted text-center mt-3">※ 상기 사례는 예시이며, 실제 수행 프로젝트와 다를 수 있습니다.</p>
        </div>
      </section>
      {/* // 분야별 구축 사례 끝 */}

      {/* 데이터베이스 설계 및 관리 */}
       <section className="mt-5">
        <h2 className="text-center mb-4">데이터베이스 설계 및 관리</h2>
        <p className="text-center mb-4">구축된 GIS 데이터를 효율적으로 활용하고 관리할 수 있도록 최적의 데이터베이스 환경을 제공합니다.</p>
         <div className="row align-items-center">
           {/* 컬럼 너비 조정: 이미지 5, 텍스트 7 */}
           <div className="col-md-5">
             <Image src="/images/database_design_placeholder.jpg" width={700} height={500} alt="데이터베이스 설계 이미지" className="img-fluid rounded shadow mb-3" />
           </div>
           <div className="col-md-7">
             {/* 상세 설명 추가 */}
             <ul>
               <li><strong>체계적인 공간 데이터베이스 설계:</strong> 고객의 요구사항과 데이터 특성을 분석하여 최적의 데이터 모델(Conceptual/Logical/Physical)을 설계하고, OGC 등 국제 표준을 준수하는 효율적인 스키마를 정의합니다.</li>
               <li><strong>다양한 DBMS 기반 구축 지원:</strong> PostgreSQL/PostGIS, Oracle Spatial, MS SQL Server, MySQL 등 고객 환경에 맞는 다양한 관계형 및 객체 관계형 데이터베이스 시스템 구축을 지원합니다.</li>
               <li><strong>안정적인 데이터 로딩 및 마이그레이션:</strong> FME, GDAL/OGR 등 전문 ETL 도구를 활용하여 대용량 공간 데이터를 정확하고 안정적으로 로딩하며, 기존 시스템과의 데이터 마이그레이션 전략을 수립하고 실행합니다.</li>
               <li><strong>고성능 데이터베이스 튜닝 및 최적화:</strong> 공간 인덱스(R-Tree, Quadtree 등) 최적화, SQL 쿼리 튜닝, 서버 파라미터 조정 등을 통해 대용량 데이터 처리 및 공간 분석 성능을 극대화합니다.</li>
               <li><strong>신뢰성 있는 데이터 유지보수 및 관리:</strong> 데이터 변경 이력 관리, 정기적인 데이터 갱신 프로세스 수립, 자동화된 백업 및 복구 전략 구현 등 데이터의 최신성과 안정성을 보장하는 관리 방안을 제공합니다.</li>
             </ul>
           </div>
         </div>
       </section>
      {/* // 데이터베이스 설계 및 관리 끝 */}

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
                <Image src="/images/gis_consulting_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 컨설팅" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-consulting" className="stretched-link text-decoration-none text-dark">GIS 컨설팅</Link></h5>
               </div>
             </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow"> {/* shadow-sm -> shadow */}
                <Image src="/images/gis_software_dev_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 소프트웨어 개발" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-software" className="stretched-link text-decoration-none text-dark">GIS 소프트웨어 개발</Link></h5>
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
