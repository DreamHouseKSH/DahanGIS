import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: '회사소개', href: '/about' },
    { name: '서비스', href: '/services' },
    { name: '정사영상', href: '/service-orthophoto' },
    { name: '데이터 구축', href: '/service-data' },
    { name: '교육', href: '/service-education' },
    { name: '문의하기', href: '/contact' },
  ];

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light" role="banner">
      <nav className="container" role="navigation" aria-label="메인 네비게이션">
        <Link href="/" className="navbar-brand" aria-label="홈으로 이동">
          <Image
            src="/images/logo.png"
            alt="다한지리정보 로고"
            width={150}
            height={50}
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
          <span className="navbar-toggler-icon" aria-hidden="true"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navigation.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
