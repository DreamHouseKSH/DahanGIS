import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DesignEffects from '../components/dahangis/DesignEffects';
import { ThemeProvider } from '../contexts/ThemeContext';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://dahangis.co.kr'),
  title: '다한지리정보(주) | DahanGIS',
  description: '최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공',
  icons: {
    icon: '/images/DAHAN_logo_v01.png',
    apple: '/images/DAHAN_logo_v01.png',
  },
  openGraph: {
    type: 'website',
    siteName: '다한지리정보(주)',
    title: '다한지리정보(주) | DahanGIS',
    description: '최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공',
    images: ['/images/DAHAN_logo_v01.png'],
    url: 'https://dahangis.co.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '다한지리정보(주) | DahanGIS',
    description: '최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공',
    images: ['/images/DAHAN_logo_v01.png'],
  },
  alternates: {
    canonical: 'https://dahangis.co.kr',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=Geist+Mono:wght@400;500&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
        {/*
          다크모드 깜빡임 방지를 위한 인라인 스크립트
          페이지 로드 전에 저장된 테마 또는 시스템 설정 적용
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('dahangis-theme');
                  if (savedTheme === 'dark' || savedTheme === 'light') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <DesignEffects />
          {children}
          <Footer />
        </ThemeProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
