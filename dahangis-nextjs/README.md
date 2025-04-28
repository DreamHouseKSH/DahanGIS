This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🧪 Testing & Quality

### Run All Tests

```bash
npm test
```

- React Testing Library & Jest 기반의 컴포넌트 테스트가 포함되어 있습니다.
- 주요 컴포넌트: Footer, Header, ErrorBoundary, Loading, SEO, ThemeProvider, ThemeToggle 등
- 테스트 환경에서 `window.matchMedia` 등 브라우저 API는 자동 mock 처리됨

### Lint & Format

```bash
npm run lint
```

- ESLint로 코드 품질 검사
- Prettier 등 포맷터 연동 가능

---

## 🚦 Continuous Integration (CI)

- GitHub Actions 기반 자동화 파이프라인(`.github/workflows/ci.yml`)
- main, feature/project-improvements 브랜치에 push/PR 시 자동으로 테스트와 린트 실행
- 실패 시 머지 불가, 품질 유지

---

## 📁 프로젝트 구조 (주요)

- `src/components/` : 재사용 컴포넌트
- `src/components/__tests__/` : 각 컴포넌트별 테스트 파일
- `.github/workflows/` : CI/CD 설정 파일

---

## 📝 개발 가이드

- 새로운 컴포넌트 추가 시 반드시 테스트 파일도 함께 작성
- 테스트 실패 시 원인 분석 및 mock 환경 확인
- 접근성(ARIA 등) 및 SEO도 항상 고려

---

## 💡 기타

- 배포 자동화: `.github/workflows/deploy.yml` 참고 (GitHub Pages)
- 문의/기여: Pull Request 또는 Issue 등록

---

## 📌 프로젝트 컨텍스트 & 체크리스트 (2025-04 기준)

### SEO 컴포넌트
- `title`, `description`, `keywords`, `og:image`, `robots(noindex)` 등 주요 메타태그를 props로 받아 렌더링합니다.
- 테스트 환경에서는 `next/head`를 mock 처리하여, 메타태그가 실제로 DOM에 잘 렌더링되는지 직접 검증합니다.
- SEO 관련 테스트는 모두 통과된 상태입니다.

### 테스트 전략
- SEO 컴포넌트 테스트는 next/head mock + document.querySelector 방식으로 신뢰성 있게 작성되어 있습니다.
- 테스트 환경/라이브러리 업데이트 시 mock 전략을 다시 점검하세요.

### 기타 컴포넌트
- ThemeToggle, Footer 등 다른 컴포넌트의 테스트/코드 개선 필요 여부는 미확인 상태입니다.
- 추후 전체 테스트(`npm test`)를 한 번 돌려보는 것을 권장합니다.

### 개발/운영 환경
- Next.js, @testing-library/react, Jest 등 주요 스택 사용.
- 테스트/빌드/배포 환경 점검 필요시 package.json, 설정 파일 참고.

### 다음 단계 예시
- 전체 테스트 통과 여부 확인
- SEO 컴포넌트 문서화 또는 추가 기능/리팩토링
- 코드 리뷰/배포 준비

### 기타
- 최근까지 SEO 컴포넌트와 테스트에 집중했으므로, 추후 다른 부분 작업 시 의존성이나 영향도 고려하세요.
