import Image from 'next/image';
import Link from 'next/link';

export default function ServiceEducationPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">GIS 교육 (준비중)</h1>
      <p className="lead mb-5 text-center">실무 중심 교육으로 차세대 GIS 전문가를 양성합니다.</p>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <Image src="/images/gis_education_01.jpg" width={700} height={500} alt="GIS 교육 현장" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">서비스 소개</h2>
          <p>GIS 전문가 양성을 위한 체계적인 교육 프로그램을 제공합니다. 실무 중심 교육, 전문가 강사진, 최신 교육 시설을 통해 전문 인력 양성, 기술 경쟁력 강화 및 취업 기회 확대를 지원합니다.</p>
          <h3 className="h5 mt-4 mb-2">교육 과정</h3>
          <ul>
            <li>GIS 기본 원리 및 활용</li>
            <li>ArcGIS, QGIS 등 주요 S/W 활용</li>
            <li>공간 데이터 분석 및 시각화</li>
            <li>분야별 GIS 활용 사례 (도시, 환경, 재난 등)</li>
            <li>맞춤형 기업 교육 프로그램</li>
          </ul>
        </div>
      </div>

      {/* 상세 교육 과정 (아코디언 예시) */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">상세 교육 과정 (예시)</h2>
        <div className="accordion" id="educationAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="eduHeadingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#eduCollapseOne" aria-expanded="false" aria-controls="eduCollapseOne">
                <strong>GIS 기본 원리 및 활용 과정 (입문)</strong>
              </button>
            </h2>
            <div id="eduCollapseOne" className="accordion-collapse collapse" aria-labelledby="eduHeadingOne" data-bs-parent="#educationAccordion">
              <div className="accordion-body">
                <p><strong>교육 목표:</strong> GIS 기본 개념 이해, 주요 GIS S/W(예: QGIS) 기본 기능 습득, 간단한 공간 데이터 제작 및 분석 능력 함양</p>
                <p><strong>교육 대상:</strong> GIS 비전공자, 입문자, 관련 분야 실무자</p>
                <p><strong>주요 내용:</strong></p>
                <ul>
                  <li>GIS 개요 및 공간 데이터 이해 (벡터, 래스터)</li>
                  <li>좌표계 및 투영법 기초</li>
                  <li>QGIS 인터페이스 및 기본 조작법</li>
                  <li>데이터 시각화 및 지도 제작 기초</li>
                  <li>기본 공간 분석 (버퍼, 중첩 분석 등)</li>
                  <li>간단한 실무 프로젝트 실습</li>
                </ul>
                <p><strong>교육 기간:</strong> 총 24시간 (예: 3일)</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="eduHeadingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#eduCollapseTwo" aria-expanded="false" aria-controls="eduCollapseTwo">
                <strong>ArcGIS 활용 실무 과정 (중급)</strong>
              </button>
            </h2>
            <div id="eduCollapseTwo" className="accordion-collapse collapse" aria-labelledby="eduHeadingTwo" data-bs-parent="#educationAccordion">
              <div className="accordion-body">
                <p><strong>교육 목표:</strong> ArcGIS 플랫폼(ArcMap/ArcGIS Pro) 심화 기능 활용 능력 배양, 공간 데이터 편집 및 관리, 고급 공간 분석 기법 습득</p>
                <p><strong>교육 대상:</strong> GIS 기본 과정 이수자, ArcGIS 활용 능력 향상 희망자</p>
                <p><strong>주요 내용:</strong></p>
                <ul>
                  <li>ArcGIS Pro 인터페이스 및 프로젝트 관리</li>
                  <li>Geodatabase 설계 및 구축</li>
                  <li>고급 데이터 편집 및 위상 검증</li>
                  <li>다양한 공간 분석 도구 활용 (Network Analyst, Spatial Analyst 등)</li>
                  <li>ModelBuilder를 이용한 분석 자동화</li>
                  <li>실무 데이터 기반 프로젝트 실습</li>
                </ul>
                 <p><strong>교육 기간:</strong> 총 32시간 (예: 4일)</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="eduHeadingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#eduCollapseThree" aria-expanded="false" aria-controls="eduCollapseThree">
                <strong>Python 기반 공간 데이터 분석 과정 (고급)</strong>
              </button>
            </h2>
            <div id="eduCollapseThree" className="accordion-collapse collapse" aria-labelledby="eduHeadingThree" data-bs-parent="#educationAccordion">
              <div className="accordion-body">
                <p><strong>교육 목표:</strong> Python 프로그래밍 언어와 관련 라이브러리(예: Geopandas, Rasterio, Folium)를 활용한 공간 데이터 처리, 분석, 시각화 능력 습득</p>
                <p><strong>교육 대상:</strong> Python 기본 문법 이해자, GIS 데이터 분석 자동화 및 심화 분석 희망자</p>
                <p><strong>주요 내용:</strong></p>
                <ul>
                  <li>Python 개발 환경 설정 및 기본 문법 복습</li>
                  <li>Geopandas를 이용한 벡터 데이터 처리 및 분석</li>
                  <li>Rasterio를 이용한 래스터 데이터 처리 및 분석</li>
                  <li>Folium, Matplotlib 등을 이용한 공간 데이터 시각화</li>
                  <li>공간 통계 및 머신러닝 기초 적용</li>
                  <li>실제 데이터 분석 프로젝트 수행</li>
                </ul>
                 <p><strong>교육 기간:</strong> 총 40시간 (예: 5일)</p>
              </div>
            </div>
          </div>
           {/* 추가 교육 과정 필요시 여기에 추가 */}
        </div>
         <p className="small text-muted text-center mt-3">※ 상기 커리큘럼은 예시이며, 실제 교육 과정과 다를 수 있습니다. 맞춤형 기업 교육도 가능합니다.</p>
      </section>
      {/* // 상세 교육 과정 끝 */}

      {/* 강사진 소개 섹션 삭제됨 */}

      {/* 교육 환경 및 시설 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">최적의 교육 환경</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <Image src="/images/education_facility_placeholder.jpg" width={700} height={500} alt="교육 시설 이미지" className="img-fluid rounded shadow mb-3" />
            </div>
            <div className="col-md-6">
              <ul>
                <li><strong>쾌적한 강의실:</strong> 최신 PC 및 듀얼 모니터 제공</li>
                <li><strong>최신 GIS 소프트웨어:</strong> ArcGIS Pro, QGIS 등 최신 버전 S/W 설치</li>
                <li><strong>다양한 실습 데이터:</strong> 실무와 유사한 환경에서 학습할 수 있도록 다양한 종류의 실습 데이터 제공</li>
                <li><strong>온라인 학습 지원:</strong> (선택 사항) 온라인 강의 플랫폼 및 VOD 복습 지원</li>
                <li><strong>편의 시설:</strong> 휴게 공간, 다과 제공 등</li>
              </ul>
              <p>수강생들이 학습에만 집중할 수 있도록 최고의 교육 환경을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>
      {/* // 교육 환경 및 시설 끝 */}

      {/* 수강생 후기 (예시) */}
      <section className="mt-5">
        <h2 className="text-center mb-4">수강생 후기 (예시)</h2>
         <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-quote fs-1 text-muted"></i>
                    <p className="card-text mt-2">&quot;비전공자도 쉽게 따라갈 수 있도록 기초부터 탄탄하게 알려주셔서 좋았습니다. 실습 위주의 수업 덕분에 실무 능력이 많이 향상되었어요.&quot;</p>
                    <footer className="blockquote-footer mt-3">김OO <cite title="Source Title"> (GIS 기본 과정 수료생)</cite></footer>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                 <div className="card shadow-sm">
                   <div className="card-body text-center">
                    <i className="bi bi-quote fs-1 text-muted"></i>
                    <p className="card-text mt-2">&quot;ArcGIS Pro의 다양한 기능을 실무 데이터로 직접 다뤄볼 수 있어서 유익했습니다. 강사님의 꼼꼼한 피드백 덕분에 어려운 부분도 잘 해결할 수 있었습니다.&quot;</p>
                    <footer className="blockquote-footer mt-3">이△△ <cite title="Source Title">(ArcGIS 활용 실무 과정 수료생)</cite></footer>
                  </div>
                </div>
              </div>
               <div className="carousel-item">
                 <div className="card shadow-sm">
                   <div className="card-body text-center">
                    <i className="bi bi-quote fs-1 text-muted"></i>
                    <p className="card-text mt-2">&quot;Python으로 GIS 데이터를 다루는 방법을 체계적으로 배울 수 있었습니다. 복잡한 분석 작업을 자동화할 수 있게 되어 업무 효율이 크게 올랐습니다.&quot;</p>
                    <footer className="blockquote-footer mt-3">박XX <cite title="Source Title">(Python 기반 공간 데이터 분석 과정 수료생)</cite></footer>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
      </section>
      {/* // 수강생 후기 끝 */}

      {/* 교육 방식 특징 및 수료증 */}
      <section className="mt-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-3">교육 방식 특징</h3>
              <ul>
                <li><strong>실무 중심:</strong> 실제 프로젝트 기반의 실습과 사례 연구</li>
                <li><strong>소수 정예:</strong> 강사와의 긴밀한 상호작용 및 1:1 피드백</li>
                <li><strong>최신 기술 반영:</strong> 최신 GIS 기술 동향 및 S/W 버전 교육</li>
                <li><strong>맞춤형 교육:</strong> 기업 및 기관 대상 맞춤형 커리큘럼 제공</li>
              </ul>
            </div>
            <div className="col-md-6">
               <h3 className="mb-3">수료증 및 인증</h3>
               <p>다한지리정보(주)의 모든 정규 교육 과정을 성공적으로 이수한 수강생에게는 공식 수료증이 발급됩니다.</p>
               <p>(선택 사항) 또한, 관련 GIS 자격증(예: GIS 기술사, ArcGIS Certification 등) 취득을 위한 정보 제공 및 스터디 그룹 운영 등을 지원합니다.</p>
               <div className="text-center">
                 <i className="bi bi-patch-check-fill fs-1 text-success"></i>
                 <p className="mt-2"><strong>다한지리정보(주) 공식 수료증 발급</strong></p>
               </div>
            </div>
          </div>
        </div>
      </section>
      {/* // 교육 방식 특징 및 수료증 끝 */}

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
                <Image src="/images/gis_software_dev_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 소프트웨어 개발" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-software" className="stretched-link text-decoration-none text-dark">GIS 소프트웨어 개발</Link></h5>
               </div>
             </div>
           </div>
         </div>
       </section>
    </div>
  );
}
