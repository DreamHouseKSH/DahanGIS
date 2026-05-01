'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { navItems } from './data';

function isActive(pathname: string | null, href: string) {
  if (href === '/') return pathname === '/';
  return href.startsWith('/#') ? false : pathname?.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="dg-header">
      <Link href="/" className="dg-logo" aria-label="DahanGIS 홈으로 이동" onClick={() => setOpen(false)}>
        <span className="dg-logo-mark" aria-hidden="true" />
        <span>DahanGIS</span>
      </Link>

      <button
        className="dg-menu-button"
        type="button"
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`dg-nav ${open ? 'dg-open' : ''}`} aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(pathname, item.href) ? 'dg-here' : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="dg-nav-actions">
        <button className="dg-icon-button" type="button" onClick={toggleTheme} aria-label="테마 전환">
          {theme === 'dark' ? '☾' : '☀'}
        </button>
        <Link href="/contact" className="dg-button dg-primary">
          문의하기 <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
