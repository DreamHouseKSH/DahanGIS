import Image from 'next/image';
import Link from 'next/link';
import { processSteps, services, strengths } from '../components/dahangis/data';

const statItems = [
  ['정밀', '고해상도 정사영상 · GCP 보정'],
  ['표준', '국가 좌표계 · 공공 납품 포맷'],
  ['통합', '수집 · 구축 · 분석 · 운영'],
  ['공공·민간', '정부 · 지자체 · 기업'],
];

export default function Home() {
  return (
    <main className="dg-shell">
      <section className="dg-hero">
        <div className="dg-hero-photo" />
        <div className="dg-hero-bg" />
        <div className="dg-hero-grid" />

        <div className="dg-wrap dg-hero-top">
          <div className="dg-hero-meta">
            <div>Est.<b>—</b></div>
            <div>Location<b>경기 고양 · 킨텍스</b></div>
            <div>Services<b>5 pillars</b></div>
            <div>Status<b style={{ color: 'var(--dg-accent-2)' }}>● Active</b></div>
          </div>
          <div className="dg-mono">DG / 001 / 2026</div>
        </div>

        <div className="dg-wrap dg-hero-title">
          <div className="dg-eyebrow">다한지리정보(주) · DahanGIS</div>
          <h1 className="dg-display" data-reveal>
            최첨단 GIS<br />
            기술로 <i>미래를</i><br />
            그리다<span style={{ color: 'var(--dg-accent)' }}>.</span>
          </h1>
        </div>

        <div className="dg-wrap dg-hero-bottom">
          <p className="dg-lead" data-reveal data-reveal-delay="1">
            정밀 정사영상 제작부터 GIS 데이터 구축, 컨설팅, 소프트웨어 개발까지. 공간정보의 전 과정을 한 팀 안에서 제공합니다.
          </p>
          <div className="dg-hero-ctas" data-reveal data-reveal-delay="2">
            <Link href="/services" className="dg-button">서비스 보기</Link>
            <Link href="/contact" className="dg-button dg-primary">프로젝트 문의 <span>↗</span></Link>
          </div>
        </div>
      </section>

      <div className="dg-stat-bar">
        {statItems.map(([num, label]) => (
          <div className="dg-stat-cell" key={num}>
            <strong>{num}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <Marquee items={['정밀 정사영상', 'GIS 데이터 구축', 'GIS 컨설팅', '소프트웨어 개발', '교육']} />

      <section className="dg-section" id="services">
        <div className="dg-wrap">
          <div className="dg-section-head">
            <div>
              <div className="dg-eyebrow">Services · 다섯 가지 역량</div>
              <h2 className="dg-section-title" data-reveal>수집부터 운영까지,<br /><i>한 플랫폼에서.</i></h2>
            </div>
            <p className="dg-lead" data-reveal data-reveal-delay="1">
              각 서비스는 독립적으로도, 통합 패키지로도 제공됩니다. 공공 발주와 민간 프로젝트 모두 대응 가능합니다.
            </p>
          </div>

          <div className="dg-service-grid">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className={`dg-service-card ${index === 0 ? 'dg-wide' : ''} ${index === 4 ? 'dg-featured' : ''}`.trim()}
                data-reveal
                data-reveal-delay={String(Math.min(index, 3))}
              >
                <div>
                  <span className="dg-service-meta">{service.no} / {service.meta}</span>
                  <h3 className="dg-card-title">{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="dg-service-image">
                    <Image src={service.image} width={900} height={360} alt={`${service.title} 이미지`} />
                  </div>
                  <div className="dg-chip-row">
                    {service.tags.map((tag) => <span className="dg-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <span className="dg-service-link">자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={['SINCE · THE FUTURE IS SPATIAL', '공간을 데이터로', 'DRONE × AI × GIS']} />

      <section className="dg-section" id="why">
        <div className="dg-wrap">
          <div className="dg-why-head">
            <div>
              <div className="dg-eyebrow">Why DahanGIS · 4대 강점</div>
              <h2 className="dg-section-title" data-reveal>왜 다한을<br />선택할까요<i>.</i></h2>
            </div>
          </div>
          <div className="dg-why-grid">
            {strengths.map(([no, title, desc, meta], index) => (
              <div className="dg-why-item" key={no} data-reveal data-reveal-delay={String(index)}>
                <div>
                  <span className="dg-why-num">{no}</span>
                  <h3 className="dg-card-title">{title}</h3>
                  <p className="dg-why-desc">{desc}</p>
                </div>
                <span className="dg-mono">{meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dg-section" id="process">
        <div className="dg-wrap">
          <div className="dg-why-head">
            <div>
              <div className="dg-eyebrow">Process · 일하는 방식</div>
              <h2 className="dg-section-title" data-reveal>수집 → 처리 → <i>배포.</i></h2>
            </div>
            <p className="dg-lead" data-reveal data-reveal-delay="1">모든 프로젝트는 동일한 5단계를 거칩니다. 예측 가능한 일정과 품질을 기준으로 움직입니다.</p>
          </div>
          <div className="dg-process-flow">
            {processSteps.map(([meta, title, desc], index) => (
              <div className="dg-process-step" key={meta} data-reveal data-reveal-delay={String(index)}>
                <span className="dg-mono">{meta}</span>
                <h3 className="dg-process-t">{title}</h3>
                <p className="dg-process-d">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dg-section">
        <div className="dg-wrap dg-live-grid">
          <div data-reveal>
            <div className="dg-eyebrow">Engineering · 신뢰 가능한 파이프라인</div>
            <h2 className="dg-section-title">현장에서 돌아가는,<br /><i>검증된 파이프라인.</i></h2>
            <p className="dg-lead" style={{ marginTop: 24 }}>
              지상기준점 보정부터 품질 검증까지 자동화된 워크플로우로 관리합니다.
            </p>
            <div className="dg-hero-ctas" style={{ marginTop: 28 }}>
              <Link className="dg-button" href="/services">전체 서비스</Link>
              <Link className="dg-button dg-primary" href="/contact">PoC 문의 <span>↗</span></Link>
            </div>
          </div>
          <div className="dg-panel" data-reveal data-reveal-delay="1">
            <div className="dg-panel-top"><span>dahan ortho pipeline · concept</span><span>개발 중</span></div>
            <div className="dg-panel-kpi">
              {['고해상도', '정밀', '자동', '표준 포맷'].map((item) => (
                <div key={item}><span className="dg-mono">Pipeline</span><strong>{item}</strong><p>QA 워크플로우 적용</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="dg-marquee" aria-hidden="true">
      <div className="dg-marquee-track">
        {loop.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  );
}
