import Image from 'next/image';
import Link from 'next/link';

export default function ServiceOrthoPage() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">정밀 정사영상 제작</h1>
      <p className="lead mb-5 text-center">최첨단 기술로 구현하는 가장 정확한 지리 정보</p>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <Image
            src="/images/gis_ortho_01.jpg"
            width={700}
            height={500}
            alt="정밀 정사영상 예시"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">서비스 소개</h2>
          <p>
            다한지리정보(주)는 최첨단 기술을 활용하여 고품질의 정밀 정사영상을 제작합니다. 항공
            사진, 드론 촬영 등 다양한 방법으로 데이터를 수집하고, 전문적인 기술력을 바탕으로 오차를
            최소화하여 정확한 지리 정보를 제공합니다.
          </p>
          <h3 className="h5 mt-4 mb-2">주요 특징</h3>
          <ul>
            <li>높은 정확도와 해상도</li>
            <li>최신 촬영 장비 및 처리 기술 사용</li>
            <li>다양한 활용 분야 (도시 계획, 건설, 환경 모니터링 등)</li>
            <li>고객 맞춤형 데이터 포맷 제공</li>
          </ul>
        </div>
      </div>

      {/* 제작 프로세스 */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">정밀 정사영상 제작 프로세스</h2>
        <div className="row justify-content-center text-center g-4">
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-airplane-engines fs-3 text-primary mb-2"></i>
              <h6>1. 촬영 계획 수립</h6>
              <p className="small mb-0">대상 지역 분석, 최적 비행 경로 및 촬영 고도 설정</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-camera-reels fs-3 text-primary mb-2"></i>
              <h6>2. 데이터 취득</h6>
              <p className="small mb-0">항공/드론 촬영, 지상기준점(GCP) 측량</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-cpu fs-3 text-primary mb-2"></i>
              <h6>3. 데이터 처리</h6>
              <p className="small mb-0">항공삼각측량(AT), DEM/DSM 생성, 정사보정</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-palette fs-3 text-primary mb-2"></i>
              <h6>4. 후처리 및 편집</h6>
              <p className="small mb-0">색상 보정, 모자이크, 구조물 편집</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="p-3 border rounded shadow-sm h-100">
              <i className="bi bi-check-circle fs-3 text-primary mb-2"></i>
              <h6>5. 품질 검수 및 납품</h6>
              <p className="small mb-0">정확도 검증, 최종 데이터 포맷 변환 및 납품</p>
            </div>
          </div>
        </div>
      </section>
      {/* // 제작 프로세스 끝 */}

      {/* 활용 기술 및 장비 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">활용 기술 및 장비</h2>
        <div className="row g-4 justify-content-center">
          {' '}
          {/* justify-content-center 추가 */}
          <div className="col-md-6 text-center">
            {' '}
            {/* text-center 추가 */}
            <h5>주요 활용 기술</h5>
            <ul className="text-start">
              {' '}
              {/* 리스트 항목은 왼쪽 정렬 유지 */}
              <li>
                <strong>고정밀 항공삼각측량(AT):</strong> 다중 영상 기하 보정 및 번들 조정(Bundle
                Adjustment) 기술
              </li>
              <li>
                <strong>정밀 DEM/DSM/DTM 생성:</strong> 스테레오 매칭, LiDAR 데이터 융합 기술
              </li>
              <li>
                <strong>자동화된 정사보정 알고리즘:</strong> 자체 개발 또는 상용 S/W(예: Trimble
                Inpho, Agisoft Metashape) 활용
              </li>
              <li>
                <strong>심리스 모자이크 및 색상 균일화:</strong> 방사 보정 및 최적 솔기선 탐색 기술
              </li>
              <li>
                <strong>AI 기반 객체 탐지 및 분류:</strong> (선택 사항) 영상 내 특정 객체 자동 인식
                기술
              </li>
            </ul>
          </div>
          <div className="col-md-6 text-center">
            {' '}
            {/* text-center 추가 */}
            <h5>최신 측량 장비</h5> {/* 제목 변경 */}
            <ul className="text-start">
              {' '}
              {/* 리스트 항목은 왼쪽 정렬 유지 */}
              {/* 일반적인 장비 종류로 변경 */}
              <li>고해상도 디지털 항공 카메라</li>
              <li>정밀 측량용 드론(UAV) 시스템</li>
              <li>고정밀 GNSS/INS 통합 시스템</li>
              <li>전문 항공사진 처리 및 정사영상 제작 소프트웨어</li>
            </ul>
          </div>
        </div>
      </section>
      {/* // 활용 기술 및 장비 끝 */}

      {/* 정확도 및 품질 기준 */}
      <section className="mt-5 py-5">
        <div className="container">
          <h2 className="text-center mb-4">정확도 및 품질 기준</h2>
          <p className="text-center mb-4">
            다한지리정보는 국토교통부 공공측량 작업규정 및 고객 요구사항을 준수하여 최고 품질의
            정사영상을 제공합니다.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>항목</th>
                    <th>기준 (예시)</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>공간 해상도 (GSD)</td>
                    <td>5cm ~ 50cm</td>
                    <td>고객 요구 및 촬영 조건에 따라 협의</td>
                  </tr>
                  <tr>
                    <td>수평 위치 정확도 (RMSE)</td>
                    <td>1 GSD 이하</td>
                    <td>지상기준점(GCP) 측량 및 AT 정확도 기반</td>
                  </tr>
                  <tr>
                    <td>수직 위치 정확도 (RMSE)</td>
                    <td>1.5 GSD 이하</td>
                    <td>DEM/DSM 정확도 기반</td>
                  </tr>
                  <tr>
                    <td>데이터 포맷</td>
                    <td>GeoTIFF, ECW, JPG 등</td>
                    <td>고객 요구 포맷 지원</td>
                  </tr>
                  <tr>
                    <td>좌표계</td>
                    <td>GRS80 / UTM-K 등</td>
                    <td>국가 표준 좌표계 및 고객 요구 좌표계 지원</td>
                  </tr>
                </tbody>
              </table>
              <p className="small text-muted text-center">
                ※ 상기 기준은 일반적인 예시이며, 프로젝트별 요구사항에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* // 정확도 및 품질 기준 끝 */}

      {/* 활용 사례 */}
      <section className="mt-5">
        <h2 className="text-center mb-4">주요 활용 사례</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/images/ortho_use_case_1_placeholder.jpg"
                width={500}
                height={300}
                className="card-img-top"
                alt="도시 계획 활용"
              />
              <div className="card-body">
                <h5 className="card-title">국토 및 도시 계획</h5>
                <p className="card-text">
                  도시 변화 모니터링, 토지 이용 계획 수립, 시설물 관리, 3D 도시 모델 구축 등
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/images/ortho_use_case_2_placeholder.jpg"
                width={500}
                height={300}
                className="card-img-top"
                alt="건설 및 토목 활용"
              />
              <div className="card-body">
                <h5 className="card-title">건설 및 토목</h5>
                <p className="card-text">
                  공사 진척 관리, 토공량 산출, 구조물 안전 진단, 준공 도면 제작 등
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/images/ortho_use_case_3_placeholder.jpg"
                width={500}
                height={300}
                className="card-img-top"
                alt="환경 및 재난 관리 활용"
              />
              <div className="card-body">
                <h5 className="card-title">환경 및 재난 관리</h5>
                <p className="card-text">
                  식생 변화 분석, 환경 오염 모니터링, 재해/재난 피해 지역 분석, 복구 계획 수립 등
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* // 활용 사례 끝 */}

      {/* 관련 서비스 */}
      <section className="mt-5 pt-5 border-top">
        <h2 className="text-center mb-4">관련 서비스</h2> {/* 제목 추가 */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
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
                <h5 className="card-title">
                  <Link
                    href="/service-data"
                    className="stretched-link text-decoration-none text-dark"
                  >
                    GIS 데이터 구축
                  </Link>
                </h5>
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
                <h5 className="card-title">
                  <Link
                    href="/service-consulting"
                    className="stretched-link text-decoration-none text-dark"
                  >
                    GIS 컨설팅
                  </Link>
                </h5>
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
                <h5 className="card-title">
                  <Link
                    href="/service-software"
                    className="stretched-link text-decoration-none text-dark"
                  >
                    GIS 소프트웨어 개발
                  </Link>
                </h5>
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
                <h5 className="card-title">
                  <Link
                    href="/service-education"
                    className="stretched-link text-decoration-none text-dark"
                  >
                    GIS 교육
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
