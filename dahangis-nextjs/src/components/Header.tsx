'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image
            src="/images/logo.png"
            alt="다한지리정보 로고"
            width={150}
            height={40}
            priority
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="메뉴 토글"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="navbarNav" role="navigation" aria-label="메인 네비게이션">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                회사소개
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className="nav-link">
                서비스
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ortho" className="nav-link">
                정사영상
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/data" className="nav-link">
                데이터 구축
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/education" className="nav-link">
                교육
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                문의하기
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
