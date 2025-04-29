import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>다한지리정보(주) | DahanGIS</title>
        <meta name="description" content="최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="다한지리정보(주)" />
        <meta property="og:title" content="다한지리정보(주) | DahanGIS" />
        <meta property="og:description" content="최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공" />
        <meta property="og:image" content="/images/DAHAN_logo_v01.png" />
        <meta property="og:url" content="https://dahangis.co.kr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="다한지리정보(주) | DahanGIS" />
        <meta name="twitter:description" content="최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공" />
        <meta name="twitter:image" content="/images/DAHAN_logo_v01.png" />
        <link rel="apple-touch-icon" href="/images/DAHAN_logo_v01.png" />
        <link rel="canonical" href="https://dahangis.co.kr" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
      </Head>
      <body style={{ background: '#f8f9fa' }}>
        <Header />
        {children}
        <Footer />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
