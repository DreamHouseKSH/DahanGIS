import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SEO } from '../SEO';

expect.extend(toHaveNoViolations);

describe('SEO 접근성(a11y)', () => {
  it('SEO 컴포넌트는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(
      <SEO title="테스트 타이틀" description="테스트 설명" keywords={["SEO", "테스트"]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('OG 이미지, noindex 등 다양한 메타데이터 상태도 접근성 위반이 없어야 한다', async () => {
    const { container } = render(
      <SEO
        title="OG 테스트"
        description="OG 및 noindex 테스트 설명"
        keywords={["OG", "noindex"]}
        ogImage="/images/og-image.jpg"
        noindex={true}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
