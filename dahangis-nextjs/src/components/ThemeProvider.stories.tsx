import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import React from 'react';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component: '앱 전체에 라이트/다크 테마 컨텍스트를 제공하는 ThemeProvider 컴포넌트입니다. 하위에서 ThemeToggle 등과 함께 사용합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: 120, padding: 24, background: 'var(--bs-body-bg)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ThemeProvider>;

export const WithToggle: Story = {
  render: () => <ThemeToggle />,
};

export const LightTheme: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ background: '#fff', color: '#222', padding: 24 }}>
        <div>라이트 테마 상태입니다.</div>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ background: '#222', color: '#fff', padding: 24 }}>
        <div>다크 테마 상태입니다.</div>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  ),
};
