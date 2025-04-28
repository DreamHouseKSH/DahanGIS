import type { Meta, StoryObj } from '@storybook/react';
import { SEO } from './SEO';
import React from 'react';

const meta: Meta<typeof SEO> = {
  title: 'Components/SEO',
  component: SEO,
  parameters: {
    docs: {
      description: {
        component: 'Next.js의 Metadata 설정을 위한 SEO 컴포넌트입니다. 페이지별 title, description, keywords 등 메타데이터를 관리합니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '문서의 제목(title 태그)',
    },
    description: {
      control: 'text',
      description: '문서의 설명(meta description)',
    },
    keywords: {
      control: 'text',
      description: '문서의 키워드(meta keywords)',
    },
    ogImage: {
      control: 'text',
      description: 'OG 이미지 URL',
    },
    noindex: {
      control: 'boolean',
      description: '검색엔진 인덱스 제외 여부',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SEO>;

export const Default: Story = {
  args: {
    title: '기본 SEO 타이틀',
    description: '기본 설명입니다.',
    keywords: ['GIS', '지도', '공간정보'],
  },
  render: (args: React.ComponentProps<typeof SEO>) => <SEO {...args} />,
};

export const WithOgImage: Story = {
  args: {
    title: 'OG 이미지 포함',
    description: 'OG 이미지가 포함된 SEO 예시입니다.',
    keywords: ['OG', '이미지', 'SEO'],
    ogImage: '/images/og-image.jpg',
  },
  render: (args: React.ComponentProps<typeof SEO>) => <SEO {...args} />,
};

export const NoIndex: Story = {
  args: {
    title: '검색엔진 인덱스 제외',
    description: 'noindex 메타 태그가 적용된 예시입니다.',
    keywords: ['noindex', 'SEO'],
    noindex: true,
  },
  render: (args: React.ComponentProps<typeof SEO>) => <SEO {...args} />,
};
