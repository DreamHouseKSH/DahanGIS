import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  const error = new Error('테스트 에러');
  const reset = jest.fn();

  it('renders fallback UI on error', () => {
    render(
      <ErrorBoundary error={error} reset={reset}>
        <div>children</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('죄송합니다')).toBeInTheDocument();
    expect(screen.getByText(/예기치 않은 오류가 발생했습니다/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /다시 시도/ })).toBeInTheDocument();
  });

  it('calls reset when retry button is clicked', () => {
    render(
      <ErrorBoundary error={error} reset={reset}>
        <div>children</div>
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByRole('button', { name: /다시 시도/ }));
    expect(reset).toHaveBeenCalled();
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary error={null as any} reset={reset}>
        <div>정상 렌더링</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('정상 렌더링')).toBeInTheDocument();
  });
});
