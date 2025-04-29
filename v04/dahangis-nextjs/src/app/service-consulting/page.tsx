import Image from 'next/image';
import Link from 'next/link';

export default function ServiceConsultingPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">GIS 컨설팅</h1>
      <p className="lead mb-5 text-center">전문가의 통찰력으로 최적의 GIS 활용 전략을 수립합니다.</p>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <Image src="/images/gis_consulting_01.jpg" width={700} height={500} alt="GIS 컨설팅 장면" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">서비스 소개</h2>
          <p>공간 정보 시스템 구축 및 운영에 대한 전문적인 컨설팅을 제공합니다. 고객 맞춤형 컨설팅, 풍부한 경험과 노하우, 최적의 솔루션 제시를 통해 시스템 효율성을 향상시키고 투자 효과를 극대화하며 경쟁력을 강화합니다.</p>
          <h3 className="h5 mt-4 mb-2">컨설팅 분야</h3>
          <ul>
            <li>GIS 시스템 도입 및 구축 전략 수립</li>
            <li>공간 데이터 분석 및 활용 방안 제시</li>
            <li>GIS 기반 업무 프로세스 개선</li>
            <li>최신 GIS 기술 동향 및 적용 컨설팅</li>
          </ul>
        </div>
      </div>

      {/* 컨설팅 방법론 및 절차 */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">컨설팅 방법론 및 절차</h2>
        <p className="text-center mb-4">다한지리정보는 고객의 성공적인 GIS 도입 및 활용을 위해 검증된 방법론과 체계적인 절차에 따라 컨설팅을 수행합니다.</p>
        <div className="row justify-content-center text-center g-4">
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-search fs-3 text-primary mb-2"></i>
              <h6>1. 현황 분석<br />& 요구사항 정의</h6>
              <p className="small mb-0">고객 비즈니스 환경, 기존 시스템, 데이터 현황 분석 및 명확한 목표 설정</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-map fs-3 text-primary mb-2"></i>
              <h6>2. 전략 수립<br />& 로드맵 설계</h6>
              <p className="small mb-0">최적의 GIS 도입/활용 전략, 기술 아키텍처, 단계별 실행 계획 수립</p>
            </div>
          </div>
          <div className="col-md-2">
             <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-lightbulb fs-3 text-primary mb-2"></i>
              <h6>3. 솔루션 설계<br />& 기술 검증</h6>
              <p className="small mb-0">요구 기능 정의, 시스템 설계, 필요 기술 검토 및 PoC(개념 증명) 수행</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-gear fs-3 text-primary mb-2"></i>
              <h6>4. 시스템 구축<br />& 통합 지원</h6>
              <p className="small mb-0">솔루션 개발/구축 관리, 기존 시스템 연계, 데이터 마이그레이션 지원</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-graph-up fs-3 text-primary mb-2"></i>
              <h6>5. 성과 측정<br />& 안정화 지원</h6>
              <p className="small mb-0">도입 효과 분석, 사용자 교육, 시스템 안정화 및 운영 최적화 지원</p>
            </div>
          </div>
        </div>
      </section>
      {/* // 컨설팅 방법론 및 절차 끝 */}

      {/* 컨설턴트 전문성 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">최고 수준의 컨설턴트</h2>
        <p className="text-center mb-4">다한지리정보의 컨설턴트들은 풍부한 실무 경험과 깊이 있는 전문 지식을 바탕으로 고객에게 최상의 가치를 제공합니다.</p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center p-3 border rounded shadow-sm h-100">
              <i className="bi bi-person-badge fs-3 text-primary mb-2"></i>
              <h5>다년간의 실무 경험</h5>
              <p className="small">공공 및 민간 분야의 다양한 GIS 프로젝트 컨설팅 및 수행 경험 보유</p>
            </div>
          </div>
          <div className="col-md-4">
             <div className="text-center p-3 border rounded shadow-sm h-100">
              <i className="bi bi-mortarboard fs-3 text-primary mb-2"></i>
              <h5>전문 자격 보유</h5>
              <p className="small">GIS 기술사, 정보처리기술사 등 관련 분야 최고 수준의 자격 보유</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-3 border rounded shadow-sm h-100">
              <i className="bi bi-lightbulb-fill fs-3 text-primary mb-2"></i>
              <h5>최신 기술 통찰력</h5>
              <p className="small">AI, 빅데이터, 클라우드 등 최신 IT 기술과 GIS 융합에 대한 깊은 이해</p>
            </div>
          </div>
        </div>
      </section>
      {/* // 컨설턴트 전문성 끝 */}

      {/* 성공적인 컨설팅 사례 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">성공적인 컨설팅 사례 (예시)</h2>
          <div id="consultingCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">A 공공기관: 노후 시설물 관리 시스템 고도화 컨설팅</h5>
                    <p className="card-text"><strong>문제점:</strong> 분산된 데이터, 비효율적인 현장 점검 프로세스, 데이터 기반 의사결정 어려움</p>
                    <p className="card-text"><strong>컨설팅 내용:</strong> 통합 데이터베이스 모델 설계, 모바일 현장 점검 시스템 도입 방안 제시, GIS 기반 분석 및 시각화 기능 강화 전략 수립</p>
                    <p className="card-text"><strong>기대 효과:</strong> 업무 효율성 30% 향상, 데이터 정확도 개선, 예방적 유지보수 체계 구축</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                 <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">B 유통 기업: 신규 매장 입지 분석 컨설팅</h5>
                    <p className="card-text"><strong>문제점:</strong> 주관적인 판단에 의존한 입지 선정, 높은 실패율, 경쟁사 분석 미흡</p>
                    <p className="card-text"><strong>컨설팅 내용:</strong> 상권 데이터, 유동 인구 데이터, 경쟁사 데이터 등 공간 빅데이터 분석 모델 구축, 최적 입지 추천 알고리즘 개발, GIS 기반 시각화 대시보드 제공</p>
                    <p className="card-text"><strong>기대 효과:</strong> 데이터 기반의 객관적인 입지 선정, 매장 오픈 성공률 증대, 경쟁 우위 확보</p>
                  </div>
                </div>
              </div>
               <div className="carousel-item">
                 <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">C 에너지 기업: 신재생에너지 발전 최적 입지 분석 컨설팅</h5>
                    <p className="card-text"><strong>문제점:</strong> 방대한 후보지 탐색의 어려움, 복잡한 규제 및 환경 요인 고려 필요</p>
                    <p className="card-text"><strong>컨설팅 내용:</strong> 일사량, 풍속, 지형, 계통 연계, 환경 규제 등 다양한 공간 데이터를 중첩 분석하는 GIS 모델링 수행, 최적 후보지 도출 및 경제성 분석 지원</p>
                    <p className="card-text"><strong>기대 효과:</strong> 발전 효율 극대화, 사업 타당성 검토 시간 단축, 인허가 리스크 감소</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#consultingCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#consultingCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
           <p className="small text-muted text-center mt-3">※ 상기 사례는 이해를 돕기 위한 예시이며, 실제 컨설팅 내용과 다를 수 있습니다.</p>
        </div>
      </section>
      {/* // 성공적인 컨설팅 사례 끝 */}

      {/* 전문 컨설팅 영역 상세화 */}
      <section className="mt-5">
           <h2 className="text-center mb-4">전문 컨설팅 영역</h2>
           <div className="row">
             <div className="col-md-6">
               <h5>산업별 특화 컨설팅</h5>
               <ul>
                 <li>스마트 시티 / 디지털 트윈 구축 전략</li>
                 <li>국토/도시 계획 및 관리</li>
                 <li>교통 (ITS, 자율주행)</li>
                 <li>환경 및 재난/안전 관리</li>
                 <li>에너지 및 자원 관리</li>
                 <li>물류 및 유통</li>
                 <li>국방 및 공공 안전</li>
               </ul>
             </div>
             <div className="col-md-6">
               <h5>기술 기반 컨설팅</h5>
               <ul>
                 <li>GIS 시스템 아키텍처 설계 (클라우드/온프레미스)</li>
                 <li>공간 빅데이터 분석 플랫폼 구축</li>
                 <li>AI/머신러닝 기반 공간 예측 및 분석</li>
                 <li>오픈소스 GIS 도입 및 활용 전략</li>
                 <li>실내 공간 정보 시스템 구축</li>
                 <li>GIS 데이터 표준화 및 품질 관리 체계 수립</li>
               </ul>
             </div>
           </div>
       </section>
      {/* // 전문 컨설팅 영역 상세화 끝 */}

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
