# DahanGIS 회사 홈페이지

Next.js App Router로 작성하고 **정적 파일만 GitHub Pages에 배포**하는 홈페이지입니다. 운영 소스는 `src/app`과 `src/components`이며 Node.js 서버, API Route, Server Action, 런타임 이미지 최적화 서버를 운영하지 않습니다.

## 브랜치와 배포

`작업 브랜치 → Pull Request → 정적 빌드·브라우저 테스트 → main 병합 → 검증 재실행 → 운영 키로 재빌드 → gh-pages`

- `main`: 서비스 소스 기준 브랜치. 변경은 작업 브랜치에서 검증하고 PR로 병합합니다.
- `gh-pages`: `out/` 내용만 들어가는 배포 산출물 브랜치. 직접 수정하지 않습니다.
- 도메인: `https://dahangis.co.kr`. `public/CNAME`과 `.nojekyll`을 배포 검사에서 확인합니다.
- Pages 설정은 기존 `gh-pages` 브랜치 루트 배포를 유지합니다.
- `next export`, `next start`를 사용하지 않습니다. `npm run build`가 완전한 정적 `out/`을 생성합니다.
- 운영 빌드는 문의 키가 없으면 배포 전에 중단합니다. 실패한 빌드는 기존 Pages 파일을 덮어쓰지 않습니다.
- CI의 가짜 API 키가 포함된 미리보기 산출물은 운영에 배포하지 않습니다.

## 개발 환경

Node.js 22.16 이상을 사용합니다. `.nvmrc`는 22 LTS를 지정합니다.

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

`npm run dev`와 `npm run build`는 정적 이미지 변형 및 로컬 vendor 파일을 자동 준비합니다.

```bash
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm test
npm run preview
# http://127.0.0.1:4173
```

## 환경변수

| 변수 | 설정 위치 | 용도 |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | 로컬 `.env.local` / GitHub Actions Repository Secret | 문의 접수용 공개 access key |
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | 로컬 `.env.local` / GitHub Actions Repository Secret | Kakao JavaScript SDK 공개 앱 키 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 로컬 `.env.local` / GitHub Actions Repository Variable | 확인된 회사 이메일, 선택 사항 |
| `NEXT_PUBLIC_CONTACT_PHONE` | 로컬 `.env.local` / GitHub Actions Repository Variable | 확인된 회사 전화번호, 선택 사항 |

`NEXT_PUBLIC_*` 값은 정적 파일에 포함되어 누구나 읽을 수 있습니다. 관리용 비밀키를 넣지 마세요. 키를 바꾼 뒤에는 다시 빌드·배포해야 합니다. 실제 전화·이메일은 운영자가 확인한 값만 등록하며 임의의 주소를 만들지 않습니다.

카카오 개발자 콘솔의 웹 도메인 허용 목록에 실제 도메인을 등록해야 합니다. Web3Forms의 수신 주소 인증·스팸 보호·이용 제한 설정은 별도로 확인해야 합니다. CI는 외부 서비스를 모의 처리하므로 실제 이메일 전달이나 관리 콘솔 설정을 검증하지 않습니다.

## 문의 동작과 운영 확인

- 각 단계 및 최종 전송에서 다시 검증합니다. Enter 키는 마지막 단계 전에는 다음 단계로 이동합니다.
- 전송 중에는 중복 제출과 입력 변경을 막습니다. 실패 시 입력값을 유지합니다.
- 성공은 Web3Forms API가 접수를 확인했다는 의미이며, 수신 메일함 도착을 보증하지 않습니다.
- 문의 정보의 외부 전송 안내와 확인 체크박스를 제공합니다. 본문에 민감한 개인정보·기밀 원본을 입력하지 않도록 안내합니다.
- 이 안내는 회사의 완전한 개인정보 처리방침이나 법적 적합성 검토를 대체하지 않습니다. 운영자는 실제 수신·보관·삭제 정책, 처리업체 계약과 필요한 고지 사항을 확인해야 합니다.
- 실제 문의를 한 건 전송하고 수신 메일함과 스팸함을 확인하는 운영 점검은 별도로 수행합니다.

## 정적 이미지

`prebuild`는 원본 `public/images`를 보존하면서 `public/images/optimized` 아래에 320/640/960/1280/1920px WebP 변형을 만듭니다. Next Image의 custom loader는 해당 정적 파일만 참조합니다. 서버 이미지 API는 사용하지 않습니다. 원본 변경 후 다시 빌드해야 합니다. 생성 파일은 Git에 커밋하지 않습니다.

## 테스트와 배포 안전장치

PR의 `Static site quality` 검사는 lint, 정적 빌드, TypeScript strict 검사, Playwright Chromium 데스크톱·모바일 테스트를 실행합니다. 테스트는 실제 Web3Forms·카카오 API에 문의를 보내지 않습니다.

검증 대상은 페이지 왕복 이동 시 콘텐츠 표시, 단계별 문의 검증, 전송 실패·성공·중복 방지, 카카오 SDK 재방문, localStorage 차단, 동작 줄이기 설정, 키보드 메뉴와 정적 메타데이터입니다. 정적 출력 검사에서 내부 링크·이미지·canonical·sitemap·robots·404·CNAME을 확인합니다.

Actions의 `browser-test-report`에서 실패 스크린샷과 추적 파일을 볼 수 있습니다. `static-site-preview`는 테스트용이며 운영 배포에 사용하면 안 됩니다. `production-static-site`는 운영 키로 별도 빌드한 배포 산출물입니다. `/version.json`으로 배포 소스 커밋을 확인할 수 있습니다.

## 유지보수 범위

- `src/lib/site-metadata.ts`: 공개 페이지 목록과 페이지별 제목·설명·canonical.
- `src/lib/contact.ts`: 문의 항목과 순수 검증·payload 함수.
- `src/components/dahangis/DesignEffects.tsx`: 새 DOM 노드를 등록하는 점진적 애니메이션. 기본 콘텐츠는 표시 상태입니다.
- `src/styles/reliability.css`: 접근성·반응형·정적 이미지와 오류 처리 보강.
- 기존 `/about/`, `/service-*/` URL은 호환성을 위해 유지합니다. Bootstrap CSS·아이콘은 루트 레이아웃에서 로컬 번들로 한 번만 불러오며, 레거시 JavaScript도 정적 vendor 파일로 제공합니다.
- 루트의 과거 `index.tsx`, `page.tsx` 및 `v04/`는 운영 라우트가 아니며 타입 검사에서도 제외합니다. 기존 문서는 `docs/archive/README-before-pages-review.md`에 보관했습니다.

문제 발생 시 `gh-pages`를 수동 편집하지 말고 `main`의 문제 변경을 되돌리는 PR을 만들고 동일한 검증·배포 경로를 사용합니다. 라이브러리 업데이트는 lockfile을 함께 갱신하고 브라우저 테스트 후 반영하세요.
