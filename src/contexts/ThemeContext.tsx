'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 테마 타입 정의
type Theme = 'light' | 'dark';

// Context 인터페이스 정의
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Context 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// localStorage 키
const THEME_STORAGE_KEY = 'dahangis-theme';

/**
 * 테마 Provider 컴포넌트
 * - 시스템 설정 감지
 * - localStorage 저장/복원
 * - HTML data-theme 속성 관리
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // 초기값은 라이트 모드 (SSR 대응)
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 초기 테마 설정
  useEffect(() => {
    setMounted(true);

    // localStorage에서 저장된 테마 확인
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      // 저장된 테마가 있으면 사용
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // 저장된 테마가 없으면 시스템 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme: Theme = prefersDark ? 'dark' : 'light';
      setThemeState(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  }, []);

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // localStorage에 저장된 테마가 없을 때만 시스템 설정 따라감
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 테마 설정 함수
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // SSR에서는 기본 라이트 모드로 렌더링
  // 클라이언트에서 마운트 후 실제 테마 적용
  const value: ThemeContextType = {
    theme: mounted ? theme : 'light',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 테마 Context 사용 훅
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
