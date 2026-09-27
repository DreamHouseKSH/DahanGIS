import Link from 'next/link';

export default function NotFound() {
  return <main className="dg-shell"><section className="dg-page-head"><div className="dg-wrap">
    <p className="dg-eyebrow">404 · Not found</p>
    <h1 className="dg-page-title">페이지를 찾을 수 없습니다.</h1>
    <p className="dg-lead">요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.</p>
    <Link href="/" className="dg-button dg-primary">메인 페이지로 이동</Link>
  </div></section></main>;
}
