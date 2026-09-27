import { Children, isValidElement, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ServicesPage from './services/page';
import StoryControls from '../components/story/StoryControls';
import { pillars, standards, workflow, sceneImage } from '../components/story/content';
import ContactWizard from '../components/dahangis/ContactWizard';
import ContactChannels from '../components/dahangis/ContactChannels';
import KakaoMap from '../components/dahangis/KakaoMap';
import '../styles/story.css';

/** Reuse the existing, pure server-rendered catalogue rather than duplicate its data.
 * Drop its page-only heading/nav and keep all service sections, specification tables,
 * and disclosures. Unwrap its main so the one-page experience has one main landmark.
 */
function ServiceCatalogue() {
  return <div className="story-catalogue">{Children.toArray(ServicesPage().props.children).filter((node) => {
    if (!isValidElement<{ className?: string }>(node)) return true;
    return node.type !== 'nav' && !node.props.className?.includes('dg-page-head');
  })}</div>;
}

function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="story-eyebrow"><span>{number}</span>{children}</div>;
}
function Icon({ name }: { name: string }) { return <i className={`bi bi-${name}`} aria-hidden="true" />; }

export default function Home() {
  return <main className="story-root">
    <StoryControls />
    <section id="start" className="story-hero" data-story-section aria-labelledby="story-title">
      <div className="story-hero-scene" aria-hidden="true">
        <Image src={sceneImage('01-hero-bg.jpg')} alt="" fill priority sizes="100vw" className="story-hero-image" />
        <div className="story-tiles">{Array.from({ length: 12 }, (_, index) => <div key={index} style={{ '--tile-x': `${(index % 4) * 100 / 3}%`, '--tile-y': `${Math.floor(index / 4) * 50}%`, '--shift-x': `${((index % 3) - 1) * 26}px`, '--shift-y': `${(index % 2 ? 1 : -1) * 20}px`, '--rotation': `${(index % 3 - 1) * 2}deg` } as CSSProperties} />)}</div>
      </div>
      <div className="story-hero-shade" aria-hidden="true" />
      <div className="story-inner story-hero-copy">
        <Eyebrow number="01">DAHANGIS · SPATIAL INTELLIGENCE</Eyebrow>
        <h1 id="story-title" data-story-target>공간을 읽고,<br />가치를 <em>완성합니다.</em></h1>
        <p className="story-hero-lead">모든 일에 최선을.<br />정사영상에서 공간정보까지, 다한지리정보.</p>
        <p className="story-hero-description">영상을 잇고, 데이터를 다듬고, 필요한 쓰임을 만듭니다.<br />작은 경계 하나부터 최종 결과물까지, 다한의 기준으로 완성합니다.</p>
        <div className="story-actions"><a className="story-button story-primary" href="#services">다한의 서비스 <Icon name="arrow-down-right" /></a><a className="story-button" href="#contact">프로젝트 문의 <Icon name="arrow-up-right" /></a></div>
        <a href="#about" className="story-scroll-cue"><Icon name="arrow-down" /><span>SCROLL TO EXPLORE<br /><small>스크롤로 만나는 다한의 이야기</small></span></a>
      </div>
      <div className="story-hero-meta story-inner"><span>ORTHO / GIS / DATA</span><span>5 CAPABILITIES</span><span>고양 · 킨텍스</span><span>AI 생성 개념 이미지</span></div>
    </section>

    <section id="about" className="story-section story-about" data-story-section aria-labelledby="about-title">
      <div className="story-inner">
        <Eyebrow number="02">OUR PHILOSOPHY · 다한</Eyebrow>
        <div className="story-two-column">
          <div><h2 id="about-title" data-story-target data-reveal>다한이라는 이름,<br /><em>끝까지 다하는 마음.</em></h2><p className="story-section-lead">다한은 <strong>‘모든 일에 최선을’</strong>이라는<br />약속을 담고 있습니다.</p></div>
          <div className="story-about-body" data-reveal><p>한 장의 영상에는 수많은 경계가 있고,<br />하나의 데이터에는 누군가의 다음 업무가 담겨 있습니다.</p><p>다한지리정보는 정사영상 후처리의 세밀함을 바탕으로, 공간정보가 필요한 곳에서 제 역할을 하도록 다듬습니다.</p><p>눈에 잘 띄지 않는 부분까지 살피는 태도.<br />우리는 그 태도가 좋은 결과를 만든다고 믿습니다.</p></div>
        </div>
        <div className="story-philosophy-banner" data-reveal><span>PRECISION. PURPOSE. COMMITMENT.</span><p>디지털 국토와 공간정보의 발전에,<br /><strong>다한의 최선을 더합니다.</strong></p></div>
        <Link href="/about/" className="story-text-link" data-legacy-link>회사 소개 상세 페이지 <Icon name="arrow-up-right" /></Link>
      </div>
    </section>

    <section id="services" className="story-section story-services" data-story-section aria-labelledby="services-title">
      <div className="story-inner">
        <Eyebrow number="03">CAPABILITIES · 다섯 가지 역량</Eyebrow>
        <h2 id="services-title" data-story-target data-reveal>하나의 공간,<br /><em>다섯 가지 가능성.</em></h2>
        <p className="story-section-lead">정사영상에서 시작해 데이터, 기술, 활용으로 이어갑니다.<br />필요한 업무부터 함께 살피고, 프로젝트에 맞는 범위를 제안합니다.</p>
        <div className="story-pillars">{pillars.map((pillar, index) => <a href={`#${pillar.id}`} className="story-pillar" key={pillar.id}>
          <div className="story-pillar-photo"><Image src={sceneImage(pillar.image)} alt={`${pillar.title} 설명용 AI 생성 이미지`} fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 20vw" /><span>{String(index + 1).padStart(2, '0')} <Icon name={pillar.icon} /></span></div>
          <div className="story-pillar-copy"><h3>{pillar.title}</h3>{'status' in pillar ? <b className="story-badge">{pillar.status}</b> : null}<h4>{pillar.heading}</h4><p>{pillar.copy}</p><span className="story-tags">{pillar.tags}</span><span className="story-pillar-link">서비스 상세 <Icon name="arrow-down-right" /></span></div>
        </a>)}</div>
        <p className="story-disclosure">서비스 설명용 AI 생성 개념 이미지입니다. 실제 촬영 성과나 위치를 나타내지 않습니다. 개발 화면은 개념 시각화이며, 교육은 준비 중입니다.</p>
        <div className="story-read-on"><span>각 서비스의 상세 내용까지, 계속 스크롤하세요.</span><Icon name="arrow-down" /></div>
        <ServiceCatalogue />
        <Link href="/services/" className="story-text-link" data-legacy-link>서비스 상세 페이지 <Icon name="arrow-up-right" /></Link>
      </div>
    </section>

    <section id="why" className="story-section story-standards" data-story-section aria-labelledby="why-title">
      <div className="story-inner">
        <Eyebrow number="04">OUR STANDARDS · 다한의 기준</Eyebrow>
        <div className="story-two-column"><h2 id="why-title" data-story-target data-reveal>완성도의 차이는,<br /><em>작은 곳에서 시작됩니다.</em></h2><p className="story-section-lead">보이는 결과만큼,<br />그 결과에 이르는 과정도 중요합니다.</p></div>
        <div className="story-standard-grid">{standards.map(([title, copy, icon], index) => <article key={title} data-reveal><div className="story-standard-number"><span>0{index + 1}</span><Icon name={icon} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <p className="story-promise">다한이 지키는 것은,<br /><strong>결과물에 담기는 신뢰입니다.</strong></p>
      </div>
    </section>

    <section id="process" className="story-section story-process" data-story-section aria-labelledby="process-title">
      <div className="story-inner">
        <Eyebrow number="05">HOW WE WORK · 하나의 흐름</Eyebrow>
        <h2 id="process-title" data-story-target data-reveal>시작부터 납품까지,<br /><em>하나의 기준으로.</em></h2>
        <p className="story-section-lead">필요한 결과를 먼저 이해하고, 자료와 작업 조건을 확인합니다.<br />처리와 검수를 거쳐, 다음 업무로 이어질 수 있는 형태로 전달합니다.</p>
        <ol className="story-workflow">{workflow.map(([title, copy, tags, image], index) => <li key={title} data-story-step data-current="false"><div className="story-workflow-number">0{index + 1}</div><div className="story-workflow-card"><Image src={sceneImage(image)} width={560} height={340} alt={`${title} 설명용 개념 이미지`} sizes="(max-width: 640px) 90vw, (max-width: 1100px) 42vw, 28vw" /><div><h3>{title}</h3><p>{copy}</p><small>{tags}</small></div></div></li>)}</ol>
        <p className="story-disclosure">정사영상·데이터 업무의 대표 흐름입니다. 컨설팅·개발·교육은 목적에 맞춰 수행 단계를 조정합니다. 업무 범위와 산출물 형식, 품질 기준과 일정은 원천 자료와 프로젝트 조건을 확인한 뒤 협의합니다.</p>
      </div>
    </section>

    <section id="contact" className="story-section story-contact" data-story-section aria-labelledby="contact-title">
      <div className="story-inner">
        <Eyebrow number="06">START A PROJECT · 함께 완성할 내일</Eyebrow>
        <div className="story-contact-grid">
          <div><h2 id="contact-title" data-story-target>이제,<br /><em>함께 완성할</em><br />차례입니다.</h2><p className="story-section-lead">정사영상 한 건부터 데이터 구축,<br />업무 도구 개발까지.<br />지금 필요한 일을 들려주세요.</p><p>구체적인 계획이 없어도 괜찮습니다.<br />보유 자료와 원하는 결과부터 함께 정리하겠습니다.</p><div className="story-contact-values"><span><Icon name="bounding-box" /> 정밀한 후처리</span><span><Icon name="layers" /> 목적에 맞는 데이터</span><span><Icon name="chat-square-text" /> 끝까지 소통</span></div><ContactChannels /></div>
          <div className="story-inquiry" data-autoscroll-stop><h3>프로젝트 문의</h3><ContactWizard /></div>
        </div>
        <div className="story-contact-details"><div className="story-address"><span className="story-overline">다한지리정보(주)</span><h3>경기도 고양시 일산서구<br />킨텍스로 240</h3><p>GIFC 오피스 2211호</p><p>민감한 개인정보와 비공개 원본 데이터는 입력하지 마세요. 자료 전달이 필요하면 담당자와 방법을 협의해주세요.</p><Link href="/contact/" className="story-text-link" data-legacy-link>문의 전용 페이지 <Icon name="arrow-up-right" /></Link></div><KakaoMap /></div>
        <div className="story-faq"><h3>자주 묻는 질문</h3><article><h4>작은 규모의 작업도 문의할 수 있나요?</h4><p>네. 필요한 범위와 자료를 알려주시면 작업 내용과 일정을 검토합니다.</p></article><article><h4>원본 자료를 바로 보내야 하나요?</h4><p>먼저 자료의 종류와 대략적인 구성을 알려주세요. 비공개 자료는 전달 방법과 필요 시 비밀유지 절차를 협의한 뒤 공유해주세요.</p></article><article><h4>교육은 언제 신청할 수 있나요?</h4><p>현재 준비 중입니다. 사전 문의를 남겨주시면 과정과 일정이 확정되는 대로 안내합니다.</p></article></div>
        <div className="story-closing"><span>모든 일에 최선을.</span><a href="#start" className="story-text-link">처음으로 <Icon name="arrow-up" /></a></div>
      </div>
    </section>
  </main>;
}
