<<<<<<< Updated upstream
import type { Metadata } from "next";
// Noto Sans KR 폰트는 style.css에서 로드 및 적용하므로 제거
// import { Noto_Sans_KR } from "next/font/google";
import Script from 'next/script'; // Script 컴포넌트 import
import Header from "@/components/Header"; // Header 컴포넌트 import
import Footer from "@/components/Footer"; // Footer 컴포넌트 import
// CSS import 순서 최적화
import "./globals.css"; // Tailwind CSS 기본 스타일 (거의 비어있음)
import '@/styles/style.css'; // 기존 스타일을 가장 나중에 import

// const notoSansKr = Noto_Sans_KR({
//   weight: ["400", "700"], // 사용할 폰트 두께
//   subsets: ["latin"], // 또는 'korean' subset 지원 여부 확인
//   variable: "--font-noto-sans-kr", // CSS 변수 이름
// });
=======
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';
import ClientLayout from './ClientLayout';
import '@/styles/globals.scss';
import '@/styles/style.css';
>>>>>>> Stashed changes


export const metadata: Metadata = {
  // 기본 타이틀 및 설명 설정 (각 페이지에서 개별 설정 가능)
  title: "다한지리정보(주)",
  description: "다한지리정보(주)는 정밀 정사영상 제작, GIS 데이터 구축 및 컨설팅을 제공하는 GIS 전문 기업입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
        <Header /> {/* 헤더 컴포넌트 렌더링 */}
        <main className="flex-shrink-0"> {/* 메인 콘텐츠 영역 */}
          {children} {/* 각 페이지의 콘텐츠가 여기에 렌더링됨 */}
        </main>
        <Footer /> {/* 푸터 컴포넌트 렌더링 */}
        {/* Bootstrap JS */}
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
