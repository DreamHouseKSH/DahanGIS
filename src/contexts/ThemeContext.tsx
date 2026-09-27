'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
const STORAGE_KEY = 'dahangis-theme';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const isTheme = (value: unknown): value is Theme => value === 'dark' || value === 'light';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  const applyTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeState(nextTheme);
  }, []);

  useEffect(() => {
    let saved: string | null = document.documentElement.getAttribute('data-theme');
    try { saved = window.localStorage.getItem(STORAGE_KEY) ?? saved; } catch { /* Storage is optional. */ }
    applyTheme(isTheme(saved) ? saved : 'dark');
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        applyTheme(isTheme(event.newValue) ? event.newValue : 'dark');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [applyTheme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
    try { window.localStorage.setItem(STORAGE_KEY, nextTheme); } catch { /* Keep the working in-memory theme. */ }
  }, [applyTheme]);
  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
export default ThemeContext;
