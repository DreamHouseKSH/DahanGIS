import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Loading from '../Loading';

expect.extend(toHaveNoViolations);

describe('Loading 접근성(a11y)', () => {
  it('기본 Loading 컴포넌트는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(<Loading />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('fullScreen Loading 컴포넌트도 접근성 위반이 없어야 한다', async () => {
    const { container } = render(<Loading fullScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
