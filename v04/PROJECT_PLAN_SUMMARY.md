# 프로젝트 변경 및 배포 기록 문서

## 1. 충돌 마커 제거 및 코드 정상화
- README.md, dahangis-nextjs/next.config.js, dahangis-nextjs/src/styles/style.css, dahangis-nextjs/src/app/layout.tsx 파일에서 Git 병합 충돌 마커(<<<<<<<, =======, >>>>>>>)를 제거하고 정상 상태로 복구함.
- layout.tsx 파일에서 누락된 Header, Footer 컴포넌트 import를 추가하고, 불필요한 ClientLayout import를 제거함.
- 스타일 경로를 올바르게 수정하여 빌드 오류를 해결함.

## 2. next.config.ts 설정 변경
- `images.unoptimized` 옵션을 `false`에서 `true`로 변경하여 Next.js 정적 export(`output: 'export'`)와 호환되도록 설정함.
- `basePath`와 `assetPrefix`는 커스텀 도메인 사용에 맞게 빈 문자열로 유지함.

## 3. 빌드 및 배포
- 로컬에서 `npm run build` 명령어로 빌드 성공 확인.
- GitHub Actions 워크플로우를 통해 자동으로 빌드 및 GitHub Pages에 배포됨.
- 빌드 결과물이 정상적으로 생성되어 정적 자산(이미지, CSS 등) 네트워크 오류 문제 해결됨.

## 4. 향후 주의사항
- Git 병합 시 충돌 마커가 남지 않도록 주의할 것.
- 정적 export 시 `images.unoptimized` 설정을 반드시 확인할 것.
- GitHub Pages 배포 경로와 `next.config.ts`의 `basePath`, `assetPrefix` 설정 일치 여부를 항상 점검할 것.

---

본 문서는 프로젝트의 주요 변경사항과 배포 관련 문제 해결 과정을 기록하여, 향후 유지보수 및 개발에 참고할 수 있도록 작성됨.
