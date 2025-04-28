import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading 컴포넌트 시각적 상태', () => {
  it('기본(인라인) 스피너가 렌더링되어야 한다', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
  });

  it('fullScreen prop이 true면 전체화면 오버레이가 렌더링되어야 한다', () => {
    render(<Loading fullScreen />);
    // 여러 "로딩중..." 텍스트 중 <p> 태그를 정확히 선택
    const paragraphs = screen.getAllByText('로딩중...');
    // <p> 태그를 가진 요소만 필터링
    const visibleText = paragraphs.find(el => el.tagName === 'P');
    expect(visibleText).toBeInTheDocument();
    expect(visibleText).toHaveClass('mt-2');
    expect(visibleText?.parentElement).toHaveClass('text-center');
    expect(visibleText?.parentElement?.parentElement).toHaveClass('position-fixed');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
