import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ThemeToggle from '../ThemeToggle';
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

describe('ThemeToggle 접근성(a11y)', () => {
  it('ThemeToggle 컴포넌트는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
