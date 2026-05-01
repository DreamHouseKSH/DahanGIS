import Image from 'next/image';
import ContactWizard from '../../components/dahangis/ContactWizard';
import KakaoMap from '../../components/dahangis/KakaoMap';
import { assetPath } from '../../components/dahangis/data';

export default function ContactPage() {
  return (
    <main className="dg-shell">
      <section className="dg-page-head">
        <div className="dg-wrap">
          <div>
            <div className="dg-eyebrow">Contact · 프로젝트 시작</div>
            <h1 className="dg-page-title" data-reveal>함께<br /><i>그려볼까요.</i></h1>
          </div>
          <div className="dg-head-aside">
            <div className="dg-head-still" data-reveal data-reveal-delay="1">
              <Image src={`${assetPath}/09-contact-still.jpg`} width={420} height={520} alt="문의 페이지 시각 이미지" />
            </div>
            <p className="dg-lead" data-reveal data-reveal-delay="2">
              제안·컨설팅·정사영상·교육 모두 환영합니다. 가능한 빠르게 회신드립니다.
            </p>
          </div>
        </div>
      </section>

      <section className="dg-section" style={{ paddingTop: 60 }}>
        <div className="dg-wrap dg-contact-layout">
          <ContactWizard />

          <aside className="dg-side" aria-label="연락 정보">
            <div className="dg-side-block">
              <h4>Address</h4>
              <div className="dg-big-line">경기 고양시<br />일산서구 킨텍스로 240</div>
              <p style={{ color: 'var(--dg-text-3)', fontSize: 13 }}>
                GIFC 오피스 2211호<br />(대화동, 킨텍스 꿈에그린)
              </p>
            </div>

            <div className="dg-side-block">
              <h4>Web</h4>
              <a
                href="https://www.dahangis.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="dg-big-line"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                www.dahangis.co.kr ↗
              </a>
            </div>

            <KakaoMap />

            <div className="dg-side-block dg-faq">
              <h4>FAQ</h4>
              <details>
                <summary>소규모 건도 문의 가능한가요?</summary>
                <p>네, 파일럿·PoC 범위도 검토합니다. 일정과 범위를 함께 조율드립니다.</p>
              </details>
              <details>
                <summary>데이터 NDA가 필요해요.</summary>
                <p>표준 NDA를 송부드리며, 기관 양식도 대응 가능합니다.</p>
              </details>
              <details>
                <summary>교육은 언제 시작하나요?</summary>
                <p>준비 중인 과정은 사전 문의를 남겨주신 분께 우선 안내드립니다.</p>
              </details>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
