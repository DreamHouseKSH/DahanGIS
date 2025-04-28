import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders company information', () => {
    render(<Footer />);
    expect(screen.getByText(/다한지리정보/, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/주소/, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/전화/, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/이메일/, { exact: false })).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);
    expect(screen.getByText(/개인정보처리방침/, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/이용약관/, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/사이트맵/, { exact: false })).toBeInTheDocument();
  });

  it('displays current year in copyright notice', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
