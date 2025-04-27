import { render, screen } from '@testing-library/react'
import Header from '../Header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders logo and navigation links', () => {
    render(<Header />)
    
    // 로고 이미지 확인
    const logo = screen.getByAltText('다한지리정보 로고')
    expect(logo).toBeInTheDocument()
    
    // 네비게이션 링크 확인
    const links = [
      '회사소개',
      '서비스',
      '정사영상',
      '데이터 구축',
      '교육',
      '문의하기'
    ]
    
    links.forEach(linkText => {
      const link = screen.getByText(linkText)
      expect(link).toBeInTheDocument()
    })
  })

  it('has proper ARIA attributes', () => {
    render(<Header />)
    
    // 네비게이션 ARIA 레이블 확인
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', '메인 네비게이션')
    
    // 토글 버튼 ARIA 레이블 확인
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toHaveAttribute('aria-label', '메뉴 토글')
  })
})
