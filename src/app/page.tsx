import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="main-content-area">
        {/* 설명 섹션 (Hero Section) */}
        <div className="hero-section">
          <section id="description-section" className="text-center pt-5">
            <div className="container">
              <h1 className="display-4 fw-bold mb-3">최첨단 GIS 기술로 미래를 그리다</h1>
              <p className="lead mb-0">최첨단 항공 및 드론 기술을 활용한 정밀 정사영상 제작, 신뢰성 높은 GIS 데이터 구축, 맞춤형 소프트웨어 개발, 전문 컨설팅 및 실무 중심 교육까지.<br />다한지리정보(주)는 공간정보 분야의 전 과정을 아우르는 통합 솔루션을 제공하여 고객의 비즈니스 가치를 극대화합니다.</p>
            </div>
          </section>
        </div>

        {/* 핵심 강점 섹션 */}
        <section id="strengths-section" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">다한지리정보의 핵심 역량</h2>
            <div className="row text-center g-4">
              <div className="col-md-4">
                <div className="shadow-sm rounded h-100 bg-light">
                  <div className="p-4">
                    <i className="bi bi-gem fs-2 text-primary mb-3" aria-hidden="true"></i>
                    <h5 className="fw-bold">최첨단 기술력</h5>
                    <p className="mb-0">최신 항공/드론 측량 기술과 자체 개발 솔루션을 통해 최고 수준의 정밀도와 효율성을 보장합니다.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="shadow-sm rounded h-100 bg-light">
                  <div className="p-4">
                    <i className="bi bi-people-fill fs-2 text-primary mb-3" aria-hidden="true"></i>
                    <h5 className="fw-bold">분야별 전문가</h5>
                    <p className="mb-0">GIS, 측량, IT 등 각 분야 최고의 전문가들이 고객 맞춤형 솔루션을 제공합니다.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="shadow-sm rounded h-100 bg-light">
                  <div className="p-4">
                    <i className="bi bi-graph-up-arrow fs-2 text-primary mb-3" aria-hidden="true"></i>
                    <h5 className="fw-bold">풍부한 사업 경험</h5>
                    <p className="mb-0">공공 및 민간 분야의 다양한 프로젝트 수행 경험을 바탕으로 신뢰성 높은 서비스를 제공합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 이미지 섹션 */}
        <section id="image-section" className="mb-5" style={{ position: 'relative', width: '100%', height: '35vh' }}>
          <Image src="/images/main_gis_concept_01.jpg" alt="GIS 개념 이미지" layout="fill" objectFit="contain" className="concept-image" style={{ borderRadius: '.25rem' }} />
        </section>

        {/* 서비스 카드 섹션 */}
        <section id="services-section" className="pb-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
              <div className="col">
                <div className="card h-100 shadow">
                  <Image src="/images/gis_ortho_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="정밀 정사영상 제작" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link href="/service-ortho" className="stretched-link text-decoration-none text-dark">정밀 정사영상 제작</Link></h5>
                    <p className="card-text flex-grow-1">최신 항공/드론 기술과 정밀 보정 기술로 고해상도, 고정밀 정사영상을 제작하여 정확한 공간 분석 기반을 제공합니다.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow">
                  <Image src="/images/gis_data_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 데이터 구축" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link href="/service-data" className="stretched-link text-decoration-none text-dark">GIS 데이터 구축</Link></h5>
                    <p className="card-text flex-grow-1">정확하고 신뢰성 높은 GIS 데이터 구축으로 고객의 비즈니스 경쟁력을 높입니다.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow">
                  <Image src="/images/gis_software_dev_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="맞춤형 소프트웨어 개발" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link href="/service-software" className="stretched-link text-decoration-none text-dark">맞춤형 소프트웨어 개발</Link></h5>
                    <p className="card-text flex-grow-1">고객의 요구에 최적화된 GIS 소프트웨어 및 플랫폼을 설계·개발합니다.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow">
                  <Image src="/images/gis_consulting_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="전문 컨설팅" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link href="/service-consulting" className="stretched-link text-decoration-none text-dark">전문 컨설팅</Link></h5>
                    <p className="card-text flex-grow-1">공간정보 사업 기획, 데이터 분석, 시스템 구축 등 전 과정에 걸친 전문 컨설팅을 제공합니다.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow">
                  <Image src="/images/gis_education_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="실무 중심 교육" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link href="/service-education" className="stretched-link text-decoration-none text-dark">실무 중심 교육</Link></h5>
                    <p className="card-text flex-grow-1">최신 GIS 기술과 실무 노하우를 바탕으로 한 맞춤형 교육 프로그램을 제공합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
