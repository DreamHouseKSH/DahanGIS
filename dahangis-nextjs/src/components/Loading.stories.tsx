import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: '로딩 상태를 표시하는 스피너 컴포넌트입니다. 전체화면 및 인라인 모드를 지원합니다.',
      },
    },
  },
  argTypes: {
    fullScreen: {
      description: '전체화면 로딩 여부',
      control: 'boolean',
      defaultValue: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: { fullScreen: false },
};

export const FullScreen: Story = {
  args: { fullScreen: true },
};

export const SpinnerOnly: Story = {
  args: { fullScreen: false },
  render: (args) => <Loading {...args} />,
  parameters: {
    docs: {
      description: {
        story: '스피너만 보이는 기본 로딩 상태 예시.',
      },
    },
  },
};

export const FullScreenSpinner: Story = {
  args: { fullScreen: true },
  render: (args) => <Loading {...args} />,
  parameters: {
    docs: {
      description: {
        story: '전체 화면을 덮는 스피너(로딩) 상태 예시. 접근성(role, visually-hidden) 구조를 확인할 수 있습니다.',
      },
    },
  },
};
