'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-fill" aria-hidden="true"></i>
      ) : (
        <i className="bi bi-sun-fill" aria-hidden="true"></i>
      )}
    </button>
  );
}
