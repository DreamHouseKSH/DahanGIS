export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 fw-bold mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="lead mb-4">요청하신 페이지가 존재하지 않거나, 주소가 잘못되었습니다.</p>
      <a href="/" className="btn btn-primary">메인 페이지로 이동</a>
    </div>
  );
}
