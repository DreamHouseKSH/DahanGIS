import Link from 'next/link';
import { companyLogoSrc, services } from './data';

export default function SiteFooter() {
  return (
    <footer className="dg-footer">
      <div className="dg-foot-grid">
        <div>
          <div className="dg-foot-brand">
            <span className="dg-logo-image-wrap">
              <img className="dg-logo-image" src={companyLogoSrc} alt="DahanGIS" />
            </span>
          </div>
          <p>다한지리정보(주) — 최첨단 GIS 기술로 미래를 그립니다.</p>
        </div>
        <div>
          <h4>Services</h4>
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.id}`}>{service.title}</Link>
          ))}
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/#why">강점</Link>
          <Link href="/#process">프로세스</Link>
          <Link href="/contact">문의</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <span>경기 고양시 일산서구</span>
          <span>킨텍스로 240</span>
          <span>GIFC 오피스 2211호</span>
        </div>
      </div>
      <div className="dg-foot-bottom">
        <span>© {new Date().getFullYear()} Dahan Geo Information, Inc.</span>
        <span>Spatial data, imagery, platform.</span>
      </div>
    </footer>
  );
}
