import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders company information', () => {
    render(<Footer />)
    
    // 회사명 확인
    expect(screen.getByText('다한지리정보(주)')).toBeInTheDocument()
    
    // 연락처 정보 확인
    expect(screen.getByText(/주소:/)).toBeInTheDocument()
    expect(screen.getByText(/전화:/)).toBeInTheDocument()
    expect(screen.getByText(/이메일:/)).toBeInTheDocument()
  })

  it('renders quick links', () => {
    render(<Footer />)
    
    const links = [
      '개인정보처리방침',
      '이용약관',
      '사이트맵'
    ]
    
    links.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument()
    })
  })

  it('displays current year in copyright notice', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(<Footer />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', '푸터 네비게이션')
  })
})
