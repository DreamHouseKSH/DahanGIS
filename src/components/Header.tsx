"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Header() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
      const bootstrap = (window as any).bootstrap;
      if (!bootstrap) return;
      const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
      dropdownElementList.map(function (dropdownToggleEl: any) {
        if (!bootstrap.Dropdown.getInstance(dropdownToggleEl)) {
          return new bootstrap.Dropdown(dropdownToggleEl);
        }
        return bootstrap.Dropdown.getInstance(dropdownToggleEl);
      });
    });
  }, []);

  return (
    <header className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm bg-white">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image src="/images/DAHAN_logo_v01.png" alt="다한지리정보 로고" width={139} height={30} className="d-inline-block align-text-top" priority />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
