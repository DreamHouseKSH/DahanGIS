import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '../ThemeProvider';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

expect.extend(toHaveNoViolations);

describe('ThemeProvider 접근성(a11y)', () => {
  it('ThemeProvider에서 기본 children은 접근성 위반이 없어야 한다', async () => {
    const { container } = render(
      <ThemeProvider>
        <div>테마 테스트</div>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
