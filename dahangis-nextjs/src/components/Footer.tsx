export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-light" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="h6 mb-3">다한지리정보(주)</h2>
            <address className="mb-3">
              <p className="mb-1">
                <i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>
                <span>주소: 서울특별시 강남구 테헤란로 123</span>
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone-fill me-2" aria-hidden="true"></i>
                <a href="tel:+82-2-1234-5678" className="text-decoration-none">
                  전화: 02-1234-5678
                </a>
              </p>
              <p className="mb-1">
                <i className="bi bi-envelope-fill me-2" aria-hidden="true"></i>
                <a href="mailto:info@dahangis.com" className="text-decoration-none">
                  이메일: info@dahangis.com
                </a>
              </p>
            </address>
          </div>
          <div className="col-md-6">
            <nav aria-label="푸터 네비게이션">
              <h2 className="h6 mb-3">빠른 링크</h2>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/privacy" className="text-decoration-none">
                    개인정보처리방침
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/terms" className="text-decoration-none">
                    이용약관
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/sitemap" className="text-decoration-none">
                    사이트맵
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <small className="text-muted">
            &copy; {currentYear} 다한지리정보(주). All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
