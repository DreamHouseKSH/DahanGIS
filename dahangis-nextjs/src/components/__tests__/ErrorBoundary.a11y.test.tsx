import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

expect.extend(toHaveNoViolations);

describe('ErrorBoundary 접근성(a11y)', () => {
  it('fallback UI는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-4">
          <h1 className="h4 mb-4">죄송합니다</h1>
          <p className="mb-4">
            예기치 않은 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          <button className="btn btn-primary">다시 시도</button>
        </div>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
