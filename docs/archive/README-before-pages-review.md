# khomeds

---

## 공통 운영/보안/환경 가이드 참고

- 이 프로젝트는 /Users/dhkim/Devs/PROJECT_GUIDE.md의 공통 운영/보안/환경/포트 정책을 반드시 참고해야 합니다.
- 프로젝트 폴더 내에 PROJECT_GUIDE.md 심볼릭 링크를 추가해 최신 가이드에 항상 접근할 수 있도록 관리하세요.
- 환경변수, 포트 정책, 자동화, 보안 등은 반드시 공통 가이드에 따라 관리합니다.

자동 배포 테스트: 2025-04-28

---

## Mac에서 Cloudflare Tunnel(Access)로 SSH 접속하는 방법

### 1. cloudflared 설치

```bash
brew install cloudflared
```

### 2. Cloudflare Zero Trust 설정
- Cloudflare 대시보드에서 Access > Applications > SSH 앱 등록
- 도메인(예: `api.dahangis.co.kr`), 접근 정책 설정

### 3. 서버(원격) cloudflared 설정
- 서버에 cloudflared 설치 및 tunnel 생성/등록
- `config.yml` 예시:
  ```yaml
  tunnel: <Tunnel-UUID>
  credentials-file: /home/kimsh/.cloudflared/<Tunnel-UUID>.json

  ingress:
    - hostname: api.dahangis.co.kr
      service: ssh://localhost:22
    - service: http_status:404
  ```
- 터널 실행:
  ```bash
  cloudflared tunnel run <Tunnel-이름>
  ```

### 4. Mac에서 SSH 접속 (cloudflared 활용)

#### (A) 명령어 한 줄로 접속
```bash
cloudflared access ssh --hostname api.dahangis.co.kr
```

#### (B) OpenSSH ProxyCommand로 접속
1. `~/.ssh/config`에 아래 내용 추가:
    ```sshconfig
    Host dahangis-tunnel
      HostName api.dahangis.co.kr
      User kimsh
      IdentityFile ~/.ssh/id_ed25519
      ProxyCommand cloudflared access ssh --hostname %h
      Port 22
    ```
2. 접속:
    ```bash
    ssh dahangis-tunnel
    ```

#### (C) 수동 포트포워딩 (특정 포트로 SSH)
1. cloudflared로 로컬 포트 오픈:
    ```bash
    cloudflared access tcp --hostname api.dahangis.co.kr --url localhost:2222
    ```
2. 다른 터미널에서:
    ```bash
    ssh -i ~/.ssh/id_ed25519 -p 2222 kimsh@localhost
    ```

### 5. 참고 및 팁
- 키 권한: `chmod 600 ~/.ssh/id_ed25519`
- cloudflared 인증: 처음 접속 시 브라우저 인증 필요
- 서버의 cloudflared 터널, ingress, Zero Trust 정책 점검

---

## Proxmox LXC + Cloudflare Tunnel + SSH 자동화 과정 요약

### 1. 목표
- Proxmox LXC 컨테이너에 API 서버 자동 배포
- Cloudflare Tunnel(Zero Trust) 기반 안전한 SSH 접속 및 운영 자동화

### 2. 주요 진행 단계

1. **GitHub Actions 자동 배포 파이프라인 구축**
   - SSH 키 생성, 서버/로컬/Secrets 등록
   - 워크플로우 파일 작성 및 배포 자동화

2. **Cloudflare Tunnel(Access) 기반 SSH 환경 구축**
   - 직접 SSH(22번 포트)는 공유기/Cloudflare 구조상 불가
   - cloudflared access ssh, ProxyCommand, ~/.ssh/config 활용
   - Mac에서 cloudflared 설치 및 인증

3. **SSH 키 인증 문제 해결**
   - 서버에 공개키 등록(`authorized_keys`)
   - 퍼미션(권한) 설정: `chmod 700 ~/.ssh`, `chmod 600 ~/.ssh/authorized_keys`, `chmod 755 ~`
   - sshd_config에서 `PubkeyAuthentication yes`, `AuthorizedKeysFile .ssh/authorized_keys` 확인
   - Mac의 개인키 파일 권한(600)으로 수정

4. **최종적으로 SSH 키 인증 성공**
   - 서버 로그에서 "Accepted publickey" 메시지 확인
   - 비밀번호 없이, 키 인증만으로 SSH 접속 가능

### 3. 현재 상태
- Mac에서 cloudflared + SSH 키 인증으로 LXC 서버에 비밀번호 없이 접속 가능
- GitHub Actions 등 자동화 파이프라인 실전 적용 가능

### 4. 참고 명령 및 팁
- cloudflared access ssh --hostname api.dahangis.co.kr
- ssh -i ~/.ssh/id_ed25519 -o ProxyCommand="cloudflared access ssh --hostname %h" kimsh@api.dahangis.co.kr
- 서버 authorized_keys, 퍼미션, sshd_config 점검 필수

---

## 📌 최신 배포 상태
- Next.js 정적 배포: `output: 'export'` 설정 사용
- 커스텀 도메인: `dahangis.co.kr` (CNAME 파일 관리)
- GH-Pages 브랜치: `out/` 폴더 내용 자동 배포

## 🚀 실행 방법
```bash
# 개발 모드
npm run dev

# 정적 빌드 및 배포
npm run build && npm run export
```

---

## GitHub Actions(워크플로우) 관리 방법

- 이 프로젝트는 GitHub Actions를 통해 자동 빌드/배포가 이루어집니다.
- 워크플로우 실행/상태/로그 확인 등은 GitHub 웹사이트의 Actions 탭에서 할 수 있지만,
- **터미널에서 gh(GitHub CLI) 명령어로도 관리할 수 있습니다.**

### 주요 gh 명령어 예시

```sh
# 최근 워크플로우 실행 목록 보기
gh run list --limit 5

# 특정 실행의 상세 로그 확인 (ID는 위 명령어로 확인)
gh run view <run-id> --log
```

- gh CLI를 활용하면, 터미널에서 바로 배포/빌드 상태를 점검할 수 있어 편리합니다.
- gh CLI 설치 및 인증이 필요하며, 자세한 내용은 [GitHub CLI 공식 문서](https://cli.github.com/manual/) 참고.

---

## 백엔드(Node.js + Express) 및 pm2 운영 가이드

### 1. 백엔드 서버 구조
- 경로: `/backend`
- 주요 파일:
  - `index.js`: Express 기반 API 서버 진입점
  - `package.json`: 의존성 및 스크립트 관리
  - `ecosystem.config.js`: pm2 프로세스 관리 설정

### 2. 백엔드 서버 실행 방법

#### (1) 개발 환경
```bash
cd backend
npm install
npm run dev
```
- `nodemon`으로 코드 변경 시 자동 재시작

#### (2) 운영/배포 환경(pm2)
```bash
cd backend
npm install
pm run start
# 또는 직접
pm2 start ecosystem.config.js
pm2 status
pm2 logs
```
- pm2로 서버가 항상 살아있도록 관리
- 서버 재부팅 시 pm2 resurrect 사용 가능

### 3. 헬스체크 API
- GET `/api/health` → `{ status: 'ok', timestamp: ... }` 반환
- 프론트엔드에서 서버 정상 동작 확인용

### 4. 자동화 배포 연동
- GitHub Actions에서 배포 후 pm2로 백엔드 자동 재시작 가능
- 추후 backend용 workflow 추가 예정
