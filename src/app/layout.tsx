import './globals.css';
import '../styles/reliability.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DesignEffects from '../components/dahangis/DesignEffects';
import { ThemeProvider } from '../contexts/ThemeContext';
import { pageMetadata, SITE_URL } from '../lib/site-metadata';

export const metadata: Metadata = {
  ...pageMetadata('/'),
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/images/DAHAN_logo_v01.png', apple: '/images/DAHAN_logo_v01.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ko" suppressHydrationWarning>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=Geist+Mono:wght@400;500&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {/* Bootstrap CSS and icons are loaded once, by globals.css. */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){var theme='dark';try{var saved=localStorage.getItem('dahangis-theme');if(saved==='dark'||saved==='light')theme=saved;}catch(e){}document.documentElement.setAttribute('data-theme',theme);})();` }} />
    </head>
    <body>
      <a href="#main-content" className="dg-skip-link">본문 바로가기</a>
      <ThemeProvider>
        <Header />
        <DesignEffects />
        <div id="main-content" className="dg-content" tabIndex={-1}>{children}</div>
        <Footer />
      </ThemeProvider>
      {/* Retained for the existing Bootstrap-based legacy service URLs. */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
    </body>
  </html>;
}
