"use client";

import Link from 'next/link';
import Image from 'next/image'; // Next.js Image 컴포넌트 사용
import { useEffect } from 'react';
// import { Dropdown } from 'bootstrap'; // Removed static import

export default function Header() {
  useEffect(() => {
    // Dynamically import the full Bootstrap bundle (including Popper.js) on the client-side
    // Ensure this runs only after the component mounts
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
      // Access Bootstrap components via the global 'bootstrap' object after the bundle loads
      // Note: Ensure 'bootstrap' is available on window. Adjust if using modules differently.
      const bootstrap = window.bootstrap; 
      if (!bootstrap) {
        console.error("Bootstrap bundle loaded but 'bootstrap' object not found on window.");
        return;
      }
      const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
      dropdownElementList.map(function (dropdownToggleEl) {
        // Prevent re-initialization
        // Use bootstrap.Dropdown from the bundle
        if (!bootstrap.Dropdown.getInstance(dropdownToggleEl)) { 
          return new bootstrap.Dropdown(dropdownToggleEl);
        }
        return bootstrap.Dropdown.getInstance(dropdownToggleEl); // Return existing instance
      });
    }).catch(err => console.error("Failed to load or initialize Bootstrap Bundle", err));
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <header className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand">
          {/* public 폴더 기준으로 경로 설정, 비율에 맞게 width 조정 */}
          <Image src="/images/DAHAN_logo_v01.png" alt="다한지리정보 로고" width={139} height={30} className="d-inline-block align-text-top" priority />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link">홈</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">회사 소개</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                제품/서비스
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownServices">
                <li><Link href="/service-ortho" className="dropdown-item">정밀 정사영상 제작</Link></li>
                <li><Link href="/service-data" className="dropdown-item">GIS 데이터 구축</Link></li>
                <li><Link href="/service-consulting" className="dropdown-item">GIS 컨설팅</Link></li>
                <li><Link href="/service-software" className="dropdown-item">GIS 소프트웨어 개발</Link></li>
                <li><Link href="/service-education" className="dropdown-item">GIS 교육 (준비중)</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">연락처</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
