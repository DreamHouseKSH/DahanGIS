'use client';

import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import './globals.css';
import '@/styles/style.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        {/* <Header /> */}
        <main className="flex-shrink-0">
          {children}
        </main>
        {/* <Footer /> */}
        {/* Removed Bootstrap bundle script - relying on component-level initialization */}
      </body>
    </html>
  );
}
