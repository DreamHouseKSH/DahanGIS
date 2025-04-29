import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="main-content-area">
      {/* Hero Section */}
      <section id="description-section" className="text-center pt-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">최첨단 GIS 기술로 미래를 그리다</h1>
          <p className="lead mb-0">최첨단 항공 및 드론 기술을 활용한 정밀 정사영상 제작, 신뢰성 높은 GIS 데이터 구축, 맞춤형 소프트웨어 개발, 전문 컨설팅 및 실무 중심 교육까지.<br />다한지리정보(주)는 공간정보 분야의 전 과정을 아우르는 통합 솔루션을 제공하여 고객의 비즈니스 가치를 극대화합니다.</p>
        </div>
      </section>
      {/* Strengths Section */}
      <section id="strengths-section" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">다한지리정보의 핵심 역량</h2>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="shadow-sm rounded h-100 bg-light">
                <div className="p-4">
                  <i className="bi bi-gem fs-2 text-primary mb-3"></i>
                  <h5 className="fw-bold">최첨단 기술력</h5>
                  <p className="mb-0">최신 항공/드론 측량 기술과 자체 개발 솔루션을 통해 최고 수준의 정밀도와 효율성을 보장합니다.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-sm rounded h-100 bg-light">
                <div className="p-4">
                  <i className="bi bi-people-fill fs-2 text-primary mb-3"></i>
                  <h5 className="fw-bold">분야별 전문가</h5>
                  <p className="mb-0">GIS, 측량, IT 등 각 분야 최고의 전문가들이 고객 맞춤형 솔루션을 제공합니다.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="shadow-sm rounded h-100 bg-light">
                <div className="p-4">
                  <i className="bi bi-graph-up-arrow fs-2 text-primary mb-3"></i>
                  <h5 className="fw-bold">풍부한 사업 경험</h5>
                  <p className="mb-0">공공 및 민간 분야의 다양한 프로젝트 수행 경험을 바탕으로 신뢰성 높은 서비스를 제공합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Image Section */}
      <section id="image-section" className="mb-5" style={{ position: 'relative', width: '100%', height: '35vh' }}>
        <Image src="/images/main_gis_concept_01.jpg" alt="GIS 개념 이미지" layout="fill" objectFit="contain" className="concept-image" style={{ borderRadius: '.25rem' }} />
      </section>
      {/* Services Section */}
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
                  <p className="card-text flex-grow-1">다양한 소스로부터 정확하고 표준화된 GIS 데이터를 구축하여 효율적인 공간 정보 활용 및 의사결정을 지원합니다.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <Image src="/images/gis_consulting_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 컨설팅" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-consulting" className="stretched-link text-decoration-none text-dark">GIS 컨설팅</Link></h5>
                  <p className="card-text flex-grow-1">고객의 비즈니스 목표 달성을 위한 최적의 GIS 도입 전략 수립부터 시스템 구축, 운영까지 전 과정을 지원합니다.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <Image src="/images/gis_software_dev_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 소프트웨어 개발" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-software" className="stretched-link text-decoration-none text-dark">GIS 소프트웨어 개발</Link></h5>
                  <p className="card-text flex-grow-1">웹, 모바일, 데스크톱 환경에 최적화된 맞춤형 GIS 솔루션을 개발하여 업무 생산성 향상과 경쟁력 강화를 돕습니다.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <Image src="/images/gis_education_01.jpg" width={500} height={300} className="card-img-top shadow-sm" alt="GIS 교육" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"><Link href="/service-education" className="stretched-link text-decoration-none text-dark">GIS 교육</Link></h5>
                  <p className="card-text flex-grow-1">최신 GIS 기술 트렌드와 실무 노하우를 반영한 체계적인 교육 과정을 통해 미래를 이끌어갈 GIS 전문가를 양성합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
