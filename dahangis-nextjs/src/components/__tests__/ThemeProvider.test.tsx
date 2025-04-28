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

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import React from 'react';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>토글</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('provides default theme and toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toMatch(/light|dark/);
    const before = screen.getByTestId('theme').textContent;
    act(() => {
      screen.getByText('토글').click();
    });
    const after = screen.getByTestId('theme').textContent;
    expect(before).not.toBe(after);
  });
});
