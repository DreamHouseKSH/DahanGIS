import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component: '자식 컴포넌트에서 오류가 발생했을 때 대체 UI를 렌더링하는 에러 바운더리 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    error: {
      description: '에러 객체 (테스트용)',
      control: 'object',
    },
    reset: {
      description: '에러 상태를 초기화하는 함수 (테스트용)',
      control: false,
    },
    children: {
      description: '자식 컴포넌트',
      control: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const DummyChild = () => <div>정상적으로 렌더링된 자식 컴포넌트입니다.</div>;

export const Default: Story = {
  args: {
    error: null,
    reset: () => alert('reset!'),
    children: <DummyChild />,
  },
  render: (args) => <ErrorBoundary {...args} />,
};

export const WithError: Story = {
  args: {
    error: new Error('테스트 에러'),
    reset: () => alert('reset!'),
    children: <DummyChild />,
  },
  render: (args) => <ErrorBoundary {...args} />,
};

export const ErrorState: Story = {
  args: {
    error: new Error('실제 에러 발생 예시'),
    reset: () => alert('에러 상태 초기화!'),
    children: <div>에러가 발생하면 이 내용은 보이지 않습니다.</div>,
  },
  render: (args) => <ErrorBoundary {...args} />,
};
