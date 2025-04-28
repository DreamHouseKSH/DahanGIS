import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../Header';

expect.extend(toHaveNoViolations);

describe('Header 접근성(a11y)', () => {
  it('Header 컴포넌트는 접근성 위반이 없어야 한다', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
