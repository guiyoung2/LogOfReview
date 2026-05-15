# LogOfReview

> 리뷰 콘텐츠를 작성·검색·평가할 수 있는 블로그형 웹 서비스.
> **RESTful API · 서버 상태 관리 · 클라이언트 상태 관리 · URL 기반 상태**의 흐름을 직접 설계하기 위해 만든 개인 프로젝트입니다.
> 백엔드 의존 없이 클라이언트 아키텍처 검증에 집중하기 위해 JSON Server로 API를 모킹했습니다.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5-000000)](https://zustand-demo.pmnd.rs/)
[![Axios](https://img.shields.io/badge/Axios-1-5A29E4?logo=axios)](https://axios-http.com/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?logo=styledcomponents)](https://styled-components.com/)

**Live**: [log-of-review.vercel.app](https://log-of-review.vercel.app)
**Repo**: [github.com/guiyoung2/LogOfReview](https://github.com/guiyoung2/LogOfReview)

---

## 1. Highlights

| 영역                | 내용                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| **서버 상태**       | TanStack Query로 리뷰·댓글 CRUD 통합 관리, queryKey 설계로 자동 재요청           |
| **클라이언트 상태** | Zustand persist로 인증 상태 영속화, Axios 인터셉터로 토큰 자동 주입              |
| **URL 기반 상태**   | 검색·카테고리·정렬을 쿼리스트링으로 관리해 뒤로가기·공유·새로고침에 강한 UX 구현 |
| **권한 모델**       | 본인 작성 리뷰·댓글만 수정/삭제 가능 — UI 단·API 호출 단 이중 체크               |
| **재사용 폼**       | 댓글 작성/수정에 같은 폼 컴포넌트를 모드 토글로 재사용                           |

---

## 2. 기술 스택과 선택 이유

| 구분                | 기술                | 선택 이유                                                           |
| ------------------- | ------------------- | ------------------------------------------------------------------- |
| **빌드**            | Vite 7              | HMR 빠르고 ESM 기반, 가벼운 SPA에 가장 적합                         |
| **언어**            | TypeScript          | 리뷰·댓글·유저 도메인 모델을 타입으로 명세                          |
| **UI**              | React 19            | Concurrent 모드 등 최신 패턴                                        |
| **스타일**          | Styled Components 6 | 컴포넌트 단위 스타일 캡슐화, prop 기반 동적 스타일 학습 목적        |
| **라우팅**          | React Router 7      | SPA 라우팅 표준                                                     |
| **서버 상태**       | TanStack Query 5    | 캐시·재시도·무효화를 한 곳에서. queryKey 설계로 자동 재요청 트리거  |
| **클라이언트 상태** | Zustand 5           | persist 미들웨어로 인증 상태 영속화. Redux 대비 보일러플레이트 적음 |
| **HTTP**            | Axios 1             | 인터셉터로 토큰 주입·에러 핸들링을 횡단적으로 처리                  |
| **Mock API**        | JSON Server         | 백엔드 의존 없이 클라이언트 아키텍처에 집중하기 위해 선택           |

---

## 3. 주요 기능

### 리뷰 CRUD

- 작성·조회·수정·삭제
- 본인 글만 수정/삭제 (UI 노출 + API 호출 단 이중 체크)
- 다중 이미지 슬라이더
- 태그 입력

### 검색·필터링

- 제목·내용·태그 검색
- 카테고리 필터 (음식 / 장소 / 물건 / 옷)
- 정렬 (최신순 / 오래된순 / 평점 높은순 / 평점 낮은순)
- **모든 필터·정렬 상태는 URL 쿼리스트링에 직렬화**

### 댓글 시스템

- 작성·수정·삭제 + 본인 글만 권한 부여
- 작성자 닉네임 표시 (`userId` → `nickname` 매핑)
- 수정 모드 토글 (같은 폼 컴포넌트 재사용)

### 인증

- 로그인/로그아웃
- 토큰 localStorage 영속 (Zustand persist)
- Axios 요청 인터셉터에서 토큰 자동 주입

### UI/UX

- 반응형 레이아웃
- 모바일 햄버거 메뉴
- 이미지 확대 모달
- Toast 알림

---

## 4. 트러블슈팅 / 의사결정

### 4-1. queryKey 설계로 자동 재요청 처리

**문제**
검색어·카테고리·정렬을 별도 상태로 관리하면, 조합이 바뀔 때마다 명시적으로 `refetch()`나 `invalidateQueries()`를 호출해야 합니다. 호출을 빠뜨리면 화면과 데이터가 어긋납니다.

**해결**
queryKey에 필터/정렬 값을 그대로 포함시킵니다.

```ts
useQuery({
  queryKey: ["reviews", { category, sort, q }],
  queryFn: () => fetchReviews({ category, sort, q }),
});
```

queryKey가 바뀌면 TanStack Query가 **새로운 쿼리로 인식**해 자동으로 재요청합니다. 별도 명령 없이 URL·UI·데이터가 항상 일관되게 동기화됩니다.

**결과**
호출 누락에서 오는 버그 가능성을 구조적으로 제거. queryKey 설계만 잘하면 상태 동기화는 라이브러리에 위임.

### 4-2. URL 쿼리스트링 기반 상태 관리

**문제**
검색·필터·정렬 상태를 컴포넌트 state로만 들고 있으면 새로고침·뒤로가기·링크 공유에서 상태가 사라집니다.

**해결**
React Router의 `useSearchParams`로 쿼리스트링을 단일 진실 원천(SSOT)으로 삼고, queryKey도 쿼리스트링에서 파생되게 구성. 사용자가 새로고침해도 같은 화면이 뜨고, URL을 그대로 공유하면 동일한 필터 상태가 재현됩니다.

**결과**
"검색 결과 페이지 링크 공유"가 자연스럽게 동작. 뒤로가기 시 직전 필터 복원.

### 4-3. Axios 인터셉터 + Zustand persist로 토큰 일원화

**문제**
인증 토큰을 매 API 함수마다 헤더로 붙이면 보일러플레이트가 누적되고, 로그아웃 시 누락된 곳이 생기면 보안 이슈로 연결됩니다.

**해결**

- **저장**: Zustand `persist` 미들웨어로 토큰을 localStorage에 영속
- **주입**: Axios 요청 인터셉터에서 store의 토큰을 자동으로 헤더에 추가
- **만료**: 응답 인터셉터에서 `401` 감지 시 store 초기화 + 로그인 페이지로 리다이렉트

**결과**
각 API 함수는 비즈니스 로직에만 집중. 토큰 관리는 횡단 관심사로 분리.

### 4-4. 같은 폼 컴포넌트로 작성·수정 모드 처리

**문제**
"댓글 작성"과 "댓글 수정"을 별도 컴포넌트로 만들면 동일한 입력·검증 로직이 중복됩니다.

**해결**
`CommentForm`에 `mode: 'create' | 'edit'` prop과 `initialValue` prop을 받아 한 컴포넌트로 두 시나리오를 처리. 제출 시점에 mode에 따라 `POST` 또는 `PUT` mutation을 호출.

**결과**
폼 검증·UX가 두 시나리오에서 자동 일치. 변경 시 한 곳만 손보면 됨.

---

## 5. 프로젝트 구조

```
src/
├── api/                       # API 함수와 Axios 인스턴스
│   ├── axios.ts               # 인터셉터 (토큰 주입 / 401 처리)
│   ├── reviews.ts
│   ├── comments.ts
│   ├── users.ts
│   └── login.ts
├── components/
│   ├── common/                # Header, Toast, ClickEffect
│   ├── review/                # ReviewCard, ReviewForm
│   └── comment/               # CommentList, CommentItem, CommentForm
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ReviewsPage.tsx        # 목록 + 검색·필터·정렬
│   ├── ReviewDetailPage.tsx
│   ├── ReviewWritePage.tsx
│   ├── EditReviewPage.tsx
│   ├── LoginPage.tsx
│   └── NotFoundPage.tsx
├── store/
│   └── userStore.ts           # Zustand persist
├── types/
│   ├── review.ts
│   ├── comment.ts
│   └── user.ts
├── App.tsx
└── main.tsx
```

### 라우팅

```
/                          → HomePage
/about                     → AboutPage
/reviews                   → ReviewsPage         (목록 + 검색·필터)
/reviews/new               → ReviewWritePage
/reviews/:id               → ReviewDetailPage
/reviews/:id/edit          → EditReviewPage
/login                     → LoginPage
*                          → NotFoundPage (404)
```

### API 엔드포인트 (JSON Server)

```
GET    /reviews?category=&sort=&q=
GET    /reviews/:id
POST   /reviews
PUT    /reviews/:id
DELETE /reviews/:id

GET    /comments?reviewId=
POST   /comments
PUT    /comments/:id
DELETE /comments/:id

GET    /users
POST   /login
```

---

## 6. 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 (프론트 + Mock API)

터미널 1 — 프론트엔드

```bash
npm run dev
```

터미널 2 — Mock API (JSON Server)

```bash
npm run server
```

- 프론트엔드: `http://localhost:5173`
- API: `http://localhost:3001`

### 빌드

```bash
npm run build
```

빌드 시 `db.json`이 `dist`로 자동 복사됩니다.

---

## 7. 회고

- **queryKey 설계가 곧 동기화 설계** — refetch를 명시적으로 호출하지 않고 queryKey만 잘 만들어도 화면·데이터·URL이 일관되게 유지된다는 것을 체감했습니다.
- **상태의 위치를 정하는 게 절반** — 필터·정렬 같은 "공유 가능해야 하는 상태"는 컴포넌트 state가 아니라 URL이 자연스러운 자리였습니다.
- **인터셉터로 횡단 관심사 분리** — 토큰 주입·만료 처리를 각 API 함수가 모르도록 분리해, 비즈니스 로직과 인증을 분리하는 감각을 익혔습니다.
- **Mock API로 클라이언트 아키텍처에 집중** — 백엔드를 직접 만드는 부담 없이 서버 상태·캐시·동기화 패턴 학습에 시간을 쓸 수 있었습니다. 다음 프로젝트에서는 Supabase로 실제 DB·인증과 결합해 같은 패턴을 확장했습니다.
