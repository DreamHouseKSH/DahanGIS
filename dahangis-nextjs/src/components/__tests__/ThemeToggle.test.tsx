import { render, screen } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../ThemeProvider';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ThemeToggle', () => {
  it('renders button and toggles theme on click', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    // aria-label이 올바르게 설정되는지 확인
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('모드로 전환'));
    // 아이콘이 정상적으로 렌더링되는지 확인
    expect(button.querySelector('i')).toBeInTheDocument();
    // 클릭 시 aria-label이 변경되는지 확인 (테마 토글)
    const before = button.getAttribute('aria-label');
    await userEvent.click(button);
    const after = button.getAttribute('aria-label');
    expect(before).not.toBe(after);
  });
});
