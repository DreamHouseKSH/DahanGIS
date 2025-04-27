import { render, screen } from '@testing-library/react'
import Header from '../Header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} priority={undefined} />
  },
}))

describe('Header', () => {
  it('renders logo and navigation links', () => {
    render(<Header />)
    expect(screen.getByAltText('다한지리정보 로고')).toBeInTheDocument()
    expect(screen.getByText(/회사\s?소개/)).toBeInTheDocument()
    expect(screen.getByText(/연락처/)).toBeInTheDocument()
    expect(screen.getByText(/정밀 정사영상 제작/)).toBeInTheDocument()
    expect(screen.getByText(/GIS 데이터 구축/)).toBeInTheDocument()
    expect(screen.getByText(/GIS 컨설팅/)).toBeInTheDocument()
    expect(screen.getByText(/GIS 소프트웨어 개발/)).toBeInTheDocument()
    expect(screen.getByText(/GIS 교육/)).toBeInTheDocument()
  })
})
