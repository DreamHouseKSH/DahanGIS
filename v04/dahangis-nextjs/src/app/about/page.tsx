import Image from 'next/image'; // 필요시 사용
import Link from 'next/link'; // Link 컴포넌트 import 추가

export default function AboutPage() {
  return (
    <div className="container py-5"> {/* main 태그 대신 div 사용 및 패딩 조정 */}
      <h1 className="display-5 fw-bold mb-4 text-center">회사 소개</h1>
      <p className="lead mb-5 text-center">다한지리정보(주)는 공간 정보 기술로 더 나은 미래를 설계합니다.</p>

      {/* Row 구조 변경: 단일 컬럼으로 중앙 정렬 */}
      <div className="row justify-content-center">
        <div className="col-lg-10"> {/* col-md-8 대신 col-lg-10 사용, offset 제거하고 row에서 중앙 정렬 */}
          <h2 className="mb-3">DahanGIS 이야기</h2>
          <p>다한지리정보(주)는 혁신적인 공간 정보 기술을 통해 다양한 산업 분야의 발전을 선도하고 있습니다. 우리는 고객의 성공을 최우선으로 생각하며, 최고의 솔루션과 서비스를 제공하기 위해 끊임없이 노력합니다. 최신 기술 동향을 빠르게 파악하고 적용하여, 공간 정보 기술의 미래를 만들어가겠습니다.</p>
          <p>수평적인 소통과 자율적인 업무 환경 속에서 구성원들의 창의성을 극대화하고, 지속적인 성장을 통해 미래 사회에 기여하는 기업이 되겠습니다.</p>

          {/* 우리의 접근 방식 */}
          <h3 className="mt-5 mb-3">우리의 접근 방식</h3>
          <div className="row align-items-center"> {/* Row 추가 */}
            <div className="col-md-7"> {/* 텍스트 영역 */}
              <p>다한지리정보는 고객의 성공을 최우선 목표로 삼고, 다음과 같은 접근 방식을 통해 최상의 솔루션과 서비스를 제공합니다.</p>
              <ul>
                <li><strong>고객 중심 사고:</strong> 고객의 비즈니스 목표와 당면 과제를 깊이 이해하고, 실제적인 가치를 창출하는 맞춤형 솔루션을 제안합니다.</li>
                <li><strong>데이터 기반 의사결정:</strong> 정확하고 신뢰성 높은 공간 데이터 분석을 통해 객관적인 근거에 기반한 최적의 의사결정을 지원합니다.</li>
                <li><strong>기술 혁신과 적용:</strong> 최신 GIS 기술 동향을 지속적으로 연구하고 검증하여, 가장 효과적이고 효율적인 기술을 선별하여 적용합니다.</li>
                <li><strong>긴밀한 협업과 소통:</strong> 프로젝트 전 과정에 걸쳐 고객 및 파트너와 긴밀하게 소통하고 협력하여 공동의 목표를 성공적으로 달성합니다.</li>
                <li><strong>지속적인 지원:</strong> 솔루션 구축 이후에도 안정적인 운영과 지속적인 개선을 위한 기술 지원 및 유지보수 서비스를 제공합니다.</li>
              </ul>
            </div>
            <div className="col-md-5"> {/* 이미지 영역 */}
              <Image src="/images/approach_placeholder.jpg" width={500} height={350} alt="우리의 접근 방식 이미지" className="img-fluid rounded shadow mb-3" />
            </div>
          </div>
          {/* // 우리의 접근 방식 끝 */}

          {/* 기술력 및 전문성 */}
          <h3 className="mt-5 mb-3">기술력 및 전문성</h3>
          <div className="row align-items-center"> {/* Row 추가 */}
             <div className="col-md-5 order-md-2"> {/* 이미지 영역 (순서 변경) */}
              <Image src="/images/tech_placeholder.jpg" width={500} height={350} alt="기술력 이미지" className="img-fluid rounded shadow mb-3" />
            </div>
            <div className="col-md-7 order-md-1"> {/* 텍스트 영역 */}
              <p>다한지리정보는 최신 GIS 기술 트렌드를 선도하며, 고객에게 혁신적인 솔루션을 제공하기 위해 끊임없이 연구 개발에 투자하고 있습니다.</p>
              <ul>
                <li><strong>정밀 측량 및 영상 처리:</strong> 고해상도 항공/위성/드론 영상 처리, LiDAR 데이터 분석, 정밀 GNSS 측량 기술을 통해 정확한 공간 정보 기반을 마련합니다.</li>
                <li><strong>공간 데이터베이스 및 빅데이터:</strong> 대용량 공간 데이터의 효율적인 저장, 관리, 분석을 위한 데이터베이스 설계 및 빅데이터 처리 기술을 보유하고 있습니다. (예: PostGIS, GeoServer, Hadoop/Spark 연계)</li>
                <li><strong>GIS 소프트웨어 개발:</strong> 웹/모바일/데스크톱 환경을 위한 맞춤형 GIS 애플리케이션 개발 역량을 갖추고 있으며, 오픈소스 GIS(QGIS, OpenLayers 등) 및 상용 GIS(ArcGIS 등) 플랫폼 모두에 능숙합니다.</li>
                <li><strong>인공지능(AI) 및 머신러닝:</strong> 위성 영상 분석, 객체 탐지, 변화 탐지 등 GIS 분야에 AI 및 머신러닝 기술을 접목하여 새로운 가치를 창출합니다.</li>
              </ul>
            </div>
          </div>
          {/* // 기술력 및 전문성 끝 */}

           {/* 조직 문화 및 인재상 */}
          <h3 className="mt-5 mb-3">조직 문화 및 인재상</h3>
          <p>다한지리정보는 수평적인 소통과 상호 존중을 바탕으로, 구성원 모두가 자율성과 책임감을 가지고 역량을 최대한 발휘할 수 있는 기업 문화를 만들어가고 있습니다.</p>
          <ul>
            <li><strong>성장 지향:</strong> 개인과 회사의 동반 성장을 추구하며, 학습과 도전을 적극 지원합니다.</li>
            <li><strong>협업 중시:</strong> 열린 소통과 적극적인 협업을 통해 시너지를 창출하고 공동의 목표를 달성합니다.</li>
            <li><strong>전문성 추구:</strong> 각자의 분야에서 최고의 전문가가 되기 위해 끊임없이 노력하고 지식을 공유합니다.</li>
            <li><strong>고객 만족:</strong> 고객의 성공을 최우선 가치로 여기고, 신뢰와 책임감을 바탕으로 최상의 서비스를 제공합니다.</li>
          </ul>
          <p>우리는 공간 정보 기술에 대한 열정과 전문성을 바탕으로, 긍정적이고 능동적인 자세로 함께 성장해나갈 인재를 기다립니다.</p>
          {/* // 조직 문화 및 인재상 끝 */}

          <h3 className="mt-5 mb-3">비전 & 미션</h3> {/* & 기호 수정 */}
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>비전:</strong> 공간 정보 기술 분야의 글로벌 리더</li>
            <li className="list-group-item"><strong>미션:</strong> 고객에게 최고의 가치를 제공하고 사회 발전에 기여</li>
          </ul>

          <h3 className="mt-4 mb-3">핵심 가치</h3>
          <ul>
            <li><strong>고객 중심:</strong> 고객의 요구에 귀 기울이고 최고의 만족을 제공합니다.</li>
            <li><strong>혁신:</strong> 끊임없는 기술 개발과 혁신을 추구합니다.</li>
            <li><strong>협력:</strong> 파트너와의 협력을 통해 시너지를 창출합니다.</li>
          </ul>

          {/* 주요 파트너 및 고객사 (주석 처리) */}
          {/*
          <h3 className="mt-5 mb-3">주요 파트너 및 고객사</h3>
          <p>다한지리정보는 다음과 같은 다양한 분야의 기관 및 기업과 협력하고 있습니다.</p>
          <div className="row">
            <div className="col-6 col-sm-4 mb-3 text-center">
              <Image src="/images/partner_logo_placeholder_1.png" alt="파트너사 로고 1" width={120} height={60} className="img-fluid partner-logo-small" />
              <p className="small mt-1">기관/기업명 1</p>
            </div>
            <div className="col-6 col-sm-4 mb-3 text-center">
              <Image src="/images/partner_logo_placeholder_2.png" alt="파트너사 로고 2" width={120} height={60} className="img-fluid partner-logo-small" />
               <p className="small mt-1">기관/기업명 2</p>
            </div>
            <div className="col-6 col-sm-4 mb-3 text-center">
              <Image src="/images/partner_logo_placeholder_3.png" alt="파트너사 로고 3" width={120} height={60} className="img-fluid partner-logo-small" />
               <p className="small mt-1">기관/기업명 3</p>
            </div>
            <div className="col-6 col-sm-4 mb-3 text-center">
              <Image src="/images/partner_logo_placeholder_4.png" alt="파트너사 로고 4" width={120} height={60} className="img-fluid partner-logo-small" />
               <p className="small mt-1">기관/기업명 4</p>
            </div>
            </div>
          */}
          {/* // 주요 파트너 및 고객사 끝 */}

          {/* 행동 유도 버튼 */}
          <div className="text-center mt-5">
            <Link href="/services" className="btn btn-primary btn-lg">
              제공 서비스 둘러보기
            </Link>
          </div>

          {/* 빈 오른쪽 컬럼 제거됨 */}
        </div>
      </div>
    </div>
  );
}
