import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.scss';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: '다한지리정보(주)',
  description:
    '다한지리정보(주)는 정밀 정사영상 제작, GIS 데이터 구축 및 컨설팅을 제공하는 GIS 전문 기업입니다.',
  keywords: ['GIS', '정사영상', '데이터 구축', 'GIS 컨설팅', '공간정보'],
  authors: [{ name: '다한지리정보' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <head>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <ThemeProvider>
          <ErrorBoundary error={null as unknown as Error} reset={() => window.location.reload()}>
            <Header /> {/* 헤더 컴포넌트 렌더링 */}
            <main className="flex-shrink-0">
              {' '}
              {/* 메인 콘텐츠 영역 */}
              {children} {/* 각 페이지의 콘텐츠가 여기에 렌더링됨 */}
            </main>
            <Footer /> {/* 푸터 컴포넌트 렌더링 */}
            <ThemeToggle />
          </ErrorBoundary>
        </ThemeProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
