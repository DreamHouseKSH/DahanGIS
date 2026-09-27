import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/no-unescaped-entities': 'warn',
    },
  },
  {
    files: ['src/contexts/ThemeContext.tsx', 'src/components/dahangis/SiteHeader.tsx'],
    // These effects synchronize browser storage / route state after hydration.
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'v04/**', 'docs/archive/**', 'playwright-report/**', 'test-results/**', 'next-env.d.ts']),
]);
