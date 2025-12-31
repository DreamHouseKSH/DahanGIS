import './globals.css';
import '../styles/v2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../contexts/ThemeContext';
import { VersionProvider } from '../contexts/VersionContext';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://dahangis.co.kr'),
  title: '다한지리정보(주) | DahanGIS',
  description: '최첨단 GIS 기술, 항공/드론 정사영상, 데이터 구축, 맞춤형 소프트웨어, 컨설팅, 실무 교육까지 공간정보 분야 통합 솔루션 제공',
  icons: {
    icon: '/favicon.ico',
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
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <VersionProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </VersionProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
