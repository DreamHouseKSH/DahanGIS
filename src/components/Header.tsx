'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import VersionToggle from './VersionToggle';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // 현재 v2 페이지인지 확인
  const isV2 = pathname?.startsWith('/v2');

  // 버전에 따른 경로 prefix
  const prefix = isV2 ? '/v2' : '';

  // 드롭다운 토글
  function handleDropdown(e: React.MouseEvent) {
    e.preventDefault();
    setDropdownOpen((open) => !open);
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className={`navbar navbar-expand-lg navbar-light sticky-top shadow-sm ${isV2 ? 'v2-navbar' : ''}`}>
      <div className="container">
        <Link href={prefix || '/'} className="navbar-brand" aria-label="다한지리정보(주) 메인으로 이동">
          <Image src="/images/DAHAN_logo_v01.png" alt="다한지리정보(주) 로고" width={139} height={30} className="d-inline-block align-text-top" priority />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdownServices" aria-controls="navbarDropdownServices" aria-expanded="false" aria-label="메뉴 열기">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link href={`${prefix}/about`} className="nav-link">회사 소개</Link>
            </li>
            <li className={`nav-item dropdown${dropdownOpen ? ' show' : ''}`} ref={dropdownRef}>
              <a
                className={`nav-link dropdown-toggle${dropdownOpen ? ' show' : ''}`}
                href="#services-section"
                id="navbarDropdownServices"
                role="button"
                aria-expanded={dropdownOpen}
                onClick={handleDropdown}
                tabIndex={0}
              >
                제품/서비스
              </a>
              <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdownServices">
                <li><Link href={`${prefix}/service-ortho`} className="dropdown-item">정밀 정사영상 제작</Link></li>
                <li><Link href={`${prefix}/service-data`} className="dropdown-item">GIS 데이터 구축</Link></li>
                <li><Link href={`${prefix}/service-consulting`} className="dropdown-item">GIS 컨설팅</Link></li>
                <li><Link href={`${prefix}/service-software`} className="dropdown-item">GIS 소프트웨어 개발</Link></li>
                <li><Link href={`${prefix}/service-education`} className="dropdown-item">GIS 교육 (준비중)</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href={`${prefix}/contact`} className="nav-link">문의</Link>
            </li>
            {/* 버전 토글 버튼 */}
            <li className="nav-item ms-2">
              <VersionToggle />
            </li>
            {/* 테마 토글 버튼 */}
            <li className="nav-item ms-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
