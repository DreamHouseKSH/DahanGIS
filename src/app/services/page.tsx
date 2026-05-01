import Image from 'next/image';
import Link from 'next/link';
import { services } from '../../components/dahangis/data';

export default function ServicesPage() {
  return (
    <main className="dg-shell">
      <section className="dg-page-head">
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

      {services.map((service, index) => (
        <section
          className={`dg-section dg-service-detail ${index % 2 ? 'dg-alt' : ''}`}
          id={service.id}
          key={service.id}
        >
          <div className={`dg-wrap dg-detail-grid ${index % 2 ? 'dg-flip' : ''}`}>
            <div>
              <span className="dg-big-num">{service.no}</span>
              <div className="dg-eyebrow">{service.meta} · {service.title}</div>
              <h2 className="dg-section-title" data-reveal>{service.title}<br /><i>프로젝트 품질로.</i></h2>
              <p className="dg-lead" data-reveal data-reveal-delay="1">{service.summary}</p>

              <div className="dg-spec-row" data-reveal data-reveal-delay="2">
                {service.tags.map((tag) => (
                  <div className="dg-spec" key={tag}>
                    <strong>{tag}</strong>
                    <span>지원 범위</span>
                  </div>
                ))}
              </div>

              <ul className="dg-feature-list" data-reveal data-reveal-delay="3">
                {service.features.map((feature, featureIndex) => (
                  <li key={feature}>
                    <span className="dg-mono">{String(featureIndex + 1).padStart(2, '0')}</span>
                    <div><b>{feature}</b><br /><span>사업 범위와 산출물 형식에 맞춰 세부 절차를 조정합니다.</span></div>
                  </li>
                ))}
              </ul>

              <div className="dg-chip-row">
                {service.tags.map((tag) => <span className="dg-tag" key={tag}>{tag}</span>)}
              </div>
              <Link href="/contact" className="dg-button dg-primary" style={{ marginTop: 26 }}>
                상담 요청 <span>↗</span>
              </Link>
            </div>

            <div className="dg-detail-image" data-reveal data-reveal-delay="2">
              <Image src={service.detailImage} width={900} height={1100} alt={`${service.title} 상세 이미지`} />
            </div>
          </div>
        </section>
      ))}

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
