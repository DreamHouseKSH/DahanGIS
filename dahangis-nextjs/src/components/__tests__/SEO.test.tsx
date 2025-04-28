import { generateMetadata } from '../SEO';

describe('generateMetadata', () => {
  it('generates default metadata when no props are given', () => {
    const meta = generateMetadata({});
    expect(meta.title).toBe('다한지리정보(주)');
    expect(meta.description).toBeDefined();
    expect(meta.keywords).toContain('GIS');
    expect(meta.robots).toBe('index, follow');
    expect(meta.openGraph?.title).toBe('다한지리정보(주)');
    expect(meta.twitter?.title).toBe('다한지리정보(주)');
  });

  it('generates metadata with custom title and description', () => {
    const meta = generateMetadata({
      title: '테스트',
      description: '설명',
      keywords: ['추가'],
      ogImage: '/test.jpg',
      noindex: true,
    });
    expect(meta.title).toBe('테스트 | 다한지리정보(주)');
    expect(meta.description).toBe('설명');
    expect(meta.keywords).toContain('추가');
    expect(meta.robots).toBe('noindex, nofollow');
    expect(meta.openGraph?.images?.[0]?.url).toBe('/test.jpg');
    expect(meta.openGraph?.title).toBe('테스트 | 다한지리정보(주)');
    expect(meta.twitter?.title).toBe('테스트 | 다한지리정보(주)');
    expect(meta.twitter?.images?.[0]).toBe('/test.jpg');
  });
});
