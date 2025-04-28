import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사이트 상단 네비게이션 및 로고, 주요 메뉴를 제공하는 헤더 컴포넌트입니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const WithMenu: Story = {
  render: () => (
    <Header />
  ),
  parameters: {
    docs: {
      description: {
        story: '메뉴/네비게이션이 포함된 헤더 예시. 주요 메뉴, 로고, 접근성 속성(aria-label 등) 구조를 확인할 수 있습니다.',
      },
    },
  },
};

export const WithLogo: Story = {
  render: () => (
    <Header />
  ),
  parameters: {
    docs: {
      description: {
        story: '로고가 강조된 헤더 예시. 로고 이미지, alt 속성, 브랜드 네이밍 노출 구조를 확인할 수 있습니다.',
      },
    },
  },
};
