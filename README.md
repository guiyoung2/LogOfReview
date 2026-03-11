# LogOfReview

리뷰 작성/조회 중심 블로그 서비스로, CRUD와 인증/권한, 검색/필터/정렬 흐름을 구현한 프로젝트입니다.

## 1. 프로젝트 개요

- 목적: 실무에서 자주 사용하는 리뷰/댓글 도메인을 기준으로 CRUD와 상태 관리를 학습
- 핵심 포인트: React Query 기반 서버 상태 관리, Zustand 인증 상태 관리, REST API 구조화
- 개발 형태: 개인 프로젝트

## 2. 링크

- 배포: https://log-of-review.vercel.app
- 저장소: https://github.com/guiyoung2/LogOfReview

## 3. 주요 기능

- 리뷰 CRUD (작성, 조회, 수정, 삭제)
- 댓글 CRUD 및 작성자 권한 체크
- 제목/내용/태그 검색 + 카테고리/정렬 필터
- 로그인 상태 기반 UI 분기
- 반응형 UI, 이미지 모달, Toast 알림

## 4. 기술 스택

- Frontend: React 19, TypeScript, Vite, React Router
- Styling: Styled Components
- State: TanStack Query 5, Zustand 5
- API: Axios, JSON Server (개발 환경)
- Tooling: ESLint

## 5. 기술 선택과 구현 포인트

### React Query 중심 데이터 흐름

- 리뷰/댓글 조회와 변경을 `useQuery`, `useMutation`으로 일관되게 관리했습니다.
- `invalidateQueries`로 쓰기 작업 이후 목록 동기화 시점을 명확히 했습니다.
- queryKey에 검색/카테고리/정렬 조건을 포함해 재요청 기준을 예측 가능하게 설계했습니다.

### Zustand + Axios 인터셉터 인증 처리

- 사용자 상태를 Zustand로 관리하고, 토큰 주입을 Axios 인터셉터로 통합했습니다.
- 인증 관련 분기(로그인/권한 체크)를 컴포넌트 전역에서 일관되게 유지했습니다.

### 환경별 데이터 전략 분리

- 개발 환경에서는 JSON Server, 배포 환경에서는 정적 데이터 전략을 적용했습니다.
- 데모 환경에서 쓰기 동작을 제한해 테스트 데이터 누적 문제를 방지했습니다.

## 6. API 및 라우팅

### 주요 라우트

- `/` 홈
- `/reviews` 리뷰 목록
- `/reviews/new` 리뷰 작성
- `/reviews/:id` 리뷰 상세
- `/reviews/:id/edit` 리뷰 수정
- `/login` 로그인

### 주요 API

- `GET /reviews`, `GET /reviews/:id`, `POST /reviews`, `PUT /reviews/:id`, `DELETE /reviews/:id`
- `GET /comments?reviewId=:id`, `POST /comments`, `PUT /comments/:id`, `DELETE /comments/:id`
- `POST /login`

## 7. 프로젝트 구조

```text
src/
├── api/         # axios 인스턴스, reviews/comments/users/login API
├── components/  # common, review, comment 컴포넌트
├── pages/       # Home/About/Reviews/Detail/Write/Edit/Login/NotFound
├── store/       # userStore (Zustand)
├── types/       # review/comment/user 타입
├── App.tsx
└── main.tsx
```

## 8. 실행 방법

```bash
npm install
npm run dev
npm run server
```

- Frontend: `http://localhost:5173`
- API Server: `http://localhost:3001`
