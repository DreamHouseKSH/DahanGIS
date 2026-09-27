'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { companyLogoSrc, navItems } from './data';

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/$/, '') || '/';
  if (href.includes('#')) return false;
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`) || (href === '/services' && path.startsWith('/service-'));
}
export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', keydown); window.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <header ref={headerRef} className="dg-header">
    <Link href="/" className="dg-logo" aria-label="DahanGIS 홈으로 이동" onClick={() => setOpen(false)}><span className="dg-logo-image-wrap"><Image className="dg-logo-image" src={companyLogoSrc} width={126} height={32} alt="" /></span></Link>
    <button ref={menuRef} className="dg-menu-button" type="button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}><span /><span /><span /></button>
    <nav id="primary-navigation" className={`dg-nav ${open ? 'dg-open' : ''}`} aria-label="주요 메뉴">
      {navItems.map((item) => <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? 'dg-here' : undefined} aria-current={isActive(pathname, item.href) ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
    </nav>
    <div className="dg-nav-actions">
      <button className="dg-icon-button" type="button" onClick={toggleTheme} aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}>{theme === 'dark' ? '☾' : '☀'}</button>
      <Link href="/contact" className="dg-button dg-primary" onClick={() => setOpen(false)}>문의하기 <span aria-hidden="true">↗</span></Link>
    </div>
  </header>;
}
