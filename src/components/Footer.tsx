export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} 다한지리정보(주). All rights reserved.</p>
        <p className="mb-0 small">경기도 고양시 일산서구 킨텍스로 240, GIFC 오피스 2211호 (대화동, 킨텍스 꿈이그린)</p>
      </div>
    </footer>
  );
}
