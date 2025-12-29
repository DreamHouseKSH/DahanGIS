'use client';

import { useTheme } from '../contexts/ThemeContext';

/**
 * 테마 토글 버튼 컴포넌트
 * - 라이트/다크 모드 전환
 * - 아이콘으로 현재 모드 표시
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    >
      {theme === 'light' ? (
        // 해 아이콘 (라이트 모드일 때 표시 - 클릭하면 다크로 전환)
        <i className="bi bi-moon-stars-fill" style={{ color: 'inherit' }}></i>
      ) : (
        // 달 아이콘 (다크 모드일 때 표시 - 클릭하면 라이트로 전환)
        <i className="bi bi-sun-fill" style={{ color: 'inherit' }}></i>
      )}
    </button>
  );
}
