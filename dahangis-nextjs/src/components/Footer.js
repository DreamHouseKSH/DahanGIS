export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} 다한지리정보(주). All rights reserved.
        </p>
        <p className="mb-0 small">
          주소: 경기도 고양시 일산서구 킨텍스로 240<br />
          전화: 031-000-0000<br />
          이메일: contact@dahangis.com
        </p>
        <nav className="mt-3" aria-label="푸터 네비게이션">
          <a href="/privacy" className="text-white mx-2">개인정보처리방침</a>
          <a href="/terms" className="text-white mx-2">이용약관</a>
          <a href="/sitemap" className="text-white mx-2">사이트맵</a>
        </nav>
      </div>
    </footer>
  );
}