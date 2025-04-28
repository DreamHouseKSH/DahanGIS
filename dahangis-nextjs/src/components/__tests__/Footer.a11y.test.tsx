import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from '../Footer';

expect.extend(toHaveNoViolations);

describe('Footer 접근성(a11y)', () => {
  it('Footer 컴포넌트는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
