import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">제품 및 서비스 개요</h1>
      <p className="lead mb-5 text-center">
        다한지리정보(주)는 고객의 다양한 요구에 부응하는 포괄적인 GIS 솔루션을 제공합니다.
      </p>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <div className="card h-100 shadow">
            {' '}
            {/* shadow-sm -> shadow */}
            <Image
              src="/images/gis_ortho_01.jpg"
              width={500}
              height={300}
              className="card-img-top"
              alt="정밀 정사영상 제작"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">정밀 정사영상 제작</h5>
              <p className="card-text flex-grow-1">
                최신 항공/드론 기술과 정밀 보정 기술을 통해 고해상도, 고정밀 정사영상을 제작합니다.
                상세 제작 프로세스, 기술, 품질 기준을 확인해보세요.
              </p>
              <Link href="/service-ortho" className="btn btn-outline-primary mt-auto">
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow">
            {' '}
            {/* shadow-sm -> shadow */}
            <Image
              src="/images/gis_data_01.jpg"
              width={500}
              height={300}
              className="card-img-top"
              alt="GIS 데이터 구축"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">GIS 데이터 구축</h5>
              <p className="card-text flex-grow-1">
                체계적인 방법론과 엄격한 품질 관리를 통해 신뢰성 높은 GIS 데이터를 구축합니다.
                다양한 구축 분야와 데이터베이스 설계 역량을 확인해보세요.
              </p>
              <Link href="/service-data" className="btn btn-outline-primary mt-auto">
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow">
            {' '}
            {/* shadow-sm -> shadow */}
            <Image
              src="/images/gis_consulting_01.jpg"
              width={500}
              height={300}
              className="card-img-top"
              alt="GIS 컨설팅"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">GIS 컨설팅</h5>
              <p className="card-text flex-grow-1">
                풍부한 경험의 전문 컨설턴트가 검증된 방법론을 통해 최적의 GIS 도입 및 활용 전략을
                수립하고 성공적인 실행을 지원합니다.
              </p>
              <Link href="/service-consulting" className="btn btn-outline-primary mt-auto">
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow">
            {' '}
            {/* shadow-sm -> shadow */}
            <Image
              src="/images/gis_software_dev_01.jpg"
              width={500}
              height={300}
              className="card-img-top"
              alt="GIS 소프트웨어 개발"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">GIS 소프트웨어 개발</h5>
              <p className="card-text flex-grow-1">
                최신 기술 스택과 표준 개발 프로세스를 통해 웹, 모바일, 데스크톱 환경의 맞춤형 GIS
                솔루션을 개발하고 안정적인 운영을 지원합니다.
              </p>
              <Link href="/service-software" className="btn btn-outline-primary mt-auto">
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow">
            {' '}
            {/* shadow-sm -> shadow */}
            <Image
              src="/images/gis_education_01.jpg"
              width={500}
              height={300}
              className="card-img-top"
              alt="GIS 교육"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">GIS 교육 (준비중)</h5>
              <p className="card-text flex-grow-1">
                실무 중심의 체계적인 커리큘럼과 전문 강사진, 최적의 교육 환경을 통해 차세대 GIS
                전문가를 양성합니다.
              </p>
              <Link href="/service-education" className="btn btn-outline-primary mt-auto">
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
