import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer 링크 및 네비게이션', () => {
  it('정책/사이트맵 링크가 올바르게 렌더링되고 접근 가능해야 한다', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /개인정보처리방침/ })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: /이용약관/ })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: /사이트맵/ })).toHaveAttribute('href', '/sitemap');
  });
});
