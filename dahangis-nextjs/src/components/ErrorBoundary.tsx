'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  children: React.ReactNode;
}

export default function ErrorBoundary({ error, reset, children }: ErrorBoundaryProps) {
  useEffect(() => {
    // 에러 로깅 서비스로 에러 전송
    console.error('에러 발생:', error);
  }, [error]);

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-4">
          <h1 className="h4 mb-4">죄송합니다</h1>
          <p className="mb-4">
            예기치 않은 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return children;
}
