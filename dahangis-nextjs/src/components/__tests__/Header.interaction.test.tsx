import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header 네비게이션', () => {
  it('주요 네비게이션 링크가 올바르게 렌더링되고 접근 가능해야 한다', () => {
    render(<Header />);
    // 실제 렌더링된 텍스트에 맞춰 테스트
    expect(screen.getByRole('link', { name: /회사 소개/ })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /연락처/ })).toHaveAttribute('href', '/contact');
    // 드롭다운 또는 nav 내 주요 서비스 링크 일부만 테스트 (정밀 정사영상 제작, GIS 데이터 구축 등)
    expect(screen.getByRole('link', { name: /정밀 정사영상 제작/ })).toHaveAttribute('href', '/service-ortho');
    expect(screen.getByRole('link', { name: /GIS 데이터 구축/ })).toHaveAttribute('href', '/service-data');
    expect(screen.getByRole('link', { name: /GIS 컨설팅/ })).toHaveAttribute('href', '/service-consulting');
    expect(screen.getByRole('link', { name: /GIS 소프트웨어 개발/ })).toHaveAttribute('href', '/service-software');
    expect(screen.getByRole('link', { name: /GIS 교육/ })).toHaveAttribute('href', '/service-education');
  });
});
