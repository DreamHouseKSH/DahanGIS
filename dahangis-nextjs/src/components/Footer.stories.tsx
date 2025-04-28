import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사이트의 최하단에 위치하는 푸터 컴포넌트입니다. 회사 정보, 연락처, 정책 링크 등을 제공합니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};

export const WithLinks: Story = {
  render: () => (
    <Footer />
  ),
  parameters: {
    docs: {
      description: {
        story: '정책/사이트맵 링크가 포함된 푸터 예시. 접근성 및 네비게이션 구조를 확인할 수 있습니다.',
      },
    },
  },
};

export const CompanyInfo: Story = {
  render: () => (
    <Footer />
  ),
  parameters: {
    docs: {
      description: {
        story: '회사 정보(주소, 연락처, 이메일 등)가 포함된 푸터 예시.',
      },
    },
  },
};
