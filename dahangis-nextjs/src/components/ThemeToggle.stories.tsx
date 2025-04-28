import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component: '라이트/다크 모드를 전환하는 테마 토글 버튼 컴포넌트입니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {},
};

export const LightMode: Story = {
  render: () => (
    <div style={{ background: '#fff', color: '#222', padding: 24 }}>
      <ThemeToggle />
      <div>라이트 모드 상태 예시</div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ background: '#222', color: '#fff', padding: 24 }}>
      <ThemeToggle />
      <div>다크 모드 상태 예시</div>
    </div>
  ),
};
