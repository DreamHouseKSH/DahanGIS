jest.mock('next/head', () => {
  return ({ children }: any) => <>{children}</>;
});

import { render, screen } from '@testing-library/react';
import { SEO } from '../SEO';

function getMetaByName(name: string) {
  return document.querySelector(`meta[name='${name}']`);
}
function getMetaByProperty(property: string) {
  return document.querySelector(`meta[property='${property}']`);
}

describe('SEO 컴포넌트 메타데이터 렌더링 (mocked next/head)', () => {
  it('기본 title, description, keywords가 Head에 렌더링되어야 한다', () => {
    render(
      <SEO title="테스트 타이틀" description="테스트 설명" keywords={["SEO", "테스트"]} />
    );
    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
    expect(getMetaByName('description')).toHaveAttribute('content', '테스트 설명');
    expect(getMetaByName('keywords')).toHaveAttribute('content', 'SEO, 테스트');
  });

  it('OG 이미지와 noindex가 있으면 해당 메타태그가 렌더링되어야 한다', () => {
    render(
      <SEO
        title="OG 테스트"
        description="OG 및 noindex 테스트 설명"
        keywords={["OG", "noindex"]}
        ogImage="/images/og-image.jpg"
        noindex={true}
      />
    );
    expect(screen.getByText('OG 테스트')).toBeInTheDocument();
    expect(getMetaByName('description')).toHaveAttribute('content', 'OG 및 noindex 테스트 설명');
    expect(getMetaByName('keywords')).toHaveAttribute('content', 'OG, noindex');
    expect(getMetaByName('robots')).toHaveAttribute('content', expect.stringMatching(/noindex/));
    expect(getMetaByProperty('og:image')).toHaveAttribute('content', '/images/og-image.jpg');
  });
});
