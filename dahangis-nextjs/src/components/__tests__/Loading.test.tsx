import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  it('renders spinner and message by default', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
  });

  it('renders fullScreen spinner and message when fullScreen prop is true', () => {
    render(<Loading fullScreen />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    // "로딩중..." 텍스트가 2개 있으므로 getAllByText 사용
    const loadingTexts = screen.getAllByText('로딩중...');
    expect(loadingTexts.length).toBeGreaterThanOrEqual(1);
    expect(document.querySelector('.position-fixed')).toBeInTheDocument();
  });
});
