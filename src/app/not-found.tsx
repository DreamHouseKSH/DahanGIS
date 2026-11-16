import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '../lib/site-metadata';

/** Unmatched URLs keep their own title instead of inheriting the home page metadata.
 * Next.js still adds <meta name="robots" content="noindex"> to the 404 response. */
export const metadata: Metadata = {
  title: `페이지를 찾을 수 없습니다 | ${SITE_NAME}`,
  description: '요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다. 다한지리정보(주) 홈에서 정사영상·GIS 서비스와 프로젝트 문의 안내를 확인하세요.',
};

export default function NotFound() {
  return <main className="dg-shell"><section className="dg-page-head"><div className="dg-wrap">
    <p className="dg-eyebrow">404 · Not found</p>
    <h1 className="dg-page-title">페이지를 찾을 수 없습니다.</h1>
    <p className="dg-lead">요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.</p>
    <Link href="/" className="dg-button dg-primary">메인 페이지로 이동</Link>
  </div></section></main>;
}
