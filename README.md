# LogOfReview (리뷰 블로그)

React + TypeScript + Vite로 구현한 리뷰 블로그 프로젝트입니다. RESTful API, React Query, Zustand 등 실무 필수 기술을 학습하기 위한 프로젝트입니다.

## 📋 프로젝트 개요

**프로젝트명**: LogOfReview  
**목적**: RESTful API, React Query, Zustand 등 실무 필수 기술 학습  
**기술 스택**: React + TypeScript + Vite + React Query + Zustand + React Router + Axios + Styled Components

## ✨ 주요 기능

### 1. 리뷰 CRUD

- ✅ 리뷰 작성, 조회, 수정, 삭제
- ✅ 권한 체크 (본인 리뷰만 수정/삭제 가능)
- ✅ 이미지 슬라이더 (다중 이미지 지원)
- ✅ 태그 기능

### 2. 검색 및 필터링

- ✅ 제목, 내용, 태그로 검색
- ✅ 카테고리 필터 (음식, 장소, 물건, 옷)
- ✅ 정렬 옵션 (최신순, 오래된순, 평점 높은순, 평점 낮은순)

### 3. 댓글 시스템

- ✅ 댓글 작성, 수정, 삭제
- ✅ 권한 체크 (본인 댓글만 수정/삭제)
- ✅ 작성자 닉네임 표시

### 4. 사용자 인증

- ✅ 로그인/로그아웃
- ✅ 사용자 상태 관리 (Zustand)

### 5. UI/UX

- ✅ 반응형 디자인
- ✅ 모바일 메뉴 (햄버거 메뉴)
- ✅ 이미지 확대 모달
- ✅ Toast 알림

## 🛠️ 기술 스택

### 핵심 기술

- **React 19.2.0** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **React Router DOM 7.9.6** - 라우팅
- **Styled Components 6.1.19** - CSS-in-JS

### 상태 관리

- **React Query (TanStack Query) 5.90.11** - 서버 상태 관리
- **Zustand 5.0.9** - 클라이언트 전역 상태 관리

### HTTP 클라이언트

- **Axios 1.13.2** - RESTful API 호출

### 개발 도구

- **JSON Server** - Mock API 서버
- **ESLint** - 코드 품질 관리

## 📁 프로젝트 구조

```
src/
├── api/                    # API 관련
│   ├── axios.ts           # Axios 인스턴스 설정 (인터셉터 포함)
│   ├── reviews.ts         # 리뷰 API 함수들
│   ├── comments.ts        # 댓글 API 함수들
│   ├── users.ts           # 사용자 API 함수들
│   └── login.ts           # 로그인 API 함수들
│
├── components/             # 재사용 가능한 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   │   ├── Header.tsx     # 헤더 (네비게이션, 로그인 상태)
│   │   ├── Toast.tsx      # Toast 알림
│   │   └── ClickEffect.tsx # 클릭 효과
│   ├── review/            # 리뷰 관련 컴포넌트
│   │   ├── ReviewCard.tsx # 리뷰 카드
│   │   └── ReviewForm.tsx # 리뷰 작성/수정 폼
│   └── comment/           # 댓글 관련 컴포넌트
│       ├── CommentList.tsx # 댓글 목록
│       ├── CommentItem.tsx # 댓글 아이템
│       └── CommentForm.tsx # 댓글 작성/수정 폼
│
├── pages/                 # 페이지 컴포넌트
│   ├── HomePage.tsx       # 홈 페이지
│   ├── AboutPage.tsx      # 소개 페이지
│   ├── ReviewsPage.tsx    # 리뷰 목록 페이지
│   ├── ReviewDetailPage.tsx # 리뷰 상세 페이지
│   ├── ReviewWritePage.tsx  # 리뷰 작성 페이지
│   ├── EditReviewPage.tsx   # 리뷰 수정 페이지
│   ├── LoginPage.tsx      # 로그인 페이지
│   └── NotFoundPage.tsx   # 404 페이지
│
├── store/                 # Zustand 스토어
│   └── userStore.ts       # 사용자 상태 관리
│
├── types/                 # TypeScript 타입 정의
│   ├── review.ts          # 리뷰 타입
│   ├── comment.ts         # 댓글 타입
│   └── user.ts            # 사용자 타입
│
├── App.tsx                # 메인 앱 컴포넌트
└── main.tsx               # 진입점
```

## 🛣️ 라우팅 구조

```
/                          → HomePage (홈)
/about                     → AboutPage (소개)
/reviews                   → ReviewsPage (리뷰 목록)
/reviews/new               → ReviewWritePage (리뷰 작성)
/reviews/:id               → ReviewDetailPage (리뷰 상세)
/reviews/:id/edit          → EditReviewPage (리뷰 수정)
/login                     → LoginPage (로그인)
*                          → NotFoundPage (404)
```

## 🔌 RESTful API 엔드포인트

### 리뷰 API

- `GET /reviews` - 리뷰 목록 조회
  - 쿼리 파라미터: `?category=place&sort=latest&q=검색어`
- `GET /reviews/:id` - 리뷰 상세 조회
- `POST /reviews` - 리뷰 작성
- `PUT /reviews/:id` - 리뷰 수정
- `DELETE /reviews/:id` - 리뷰 삭제

### 댓글 API

- `GET /comments?reviewId=:id` - 댓글 목록 조회
- `POST /comments` - 댓글 작성
- `PUT /comments/:id` - 댓글 수정
- `DELETE /comments/:id` - 댓글 삭제

### 사용자 API

- `GET /users` - 사용자 목록 조회
- `POST /login` - 로그인

## 🚀 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

**터미널 1 - 프론트엔드 개발 서버**

```bash
npm run dev
```

**터미널 2 - Mock API 서버 (JSON Server)**

```bash
npm run server
```

### 3. 브라우저 접속

- **프론트엔드**: http://localhost:5173
- **API 서버**: http://localhost:3001

## 📦 빌드

```bash
npm run build
```

빌드 시 `db.json`이 `dist` 폴더로 자동 복사됩니다.

## 🎯 학습 포인트

### 1. React Query 활용

- `useQuery`: 서버 데이터 조회 및 캐싱
- `useMutation`: 데이터 생성/수정/삭제
- `queryClient.invalidateQueries`: 쿼리 무효화로 데이터 갱신

### 2. 상태 관리 패턴

- **React Query**: 서버 상태 (리뷰, 댓글 데이터)
- **Zustand**: 클라이언트 전역 상태 (사용자 정보)
- **useState**: 컴포넌트 로컬 상태

### 3. RESTful API 이해

- HTTP 메서드 (GET, POST, PUT, DELETE) 활용
- 쿼리 파라미터를 통한 필터링/정렬
- Axios 인터셉터를 통한 토큰 자동 추가

### 4. TypeScript 활용

- 타입 안정성 확보
- 인터페이스 정의로 데이터 구조 명확화

### 5. 컴포넌트 설계

- 재사용 가능한 컴포넌트 구조
- Props를 통한 데이터 전달
- 조건부 렌더링 및 권한 체크

## 📝 주요 구현 내용

### React Query 적용

- 리뷰 목록/상세 조회: `useQuery`
- 리뷰 작성/수정/삭제: `useMutation`
- 댓글 CRUD: `useQuery` + `useMutation`
- 쿼리 무효화로 데이터 동기화

### 권한 체크

- 본인 리뷰만 수정/삭제 버튼 표시
- 본인 댓글만 수정/삭제 가능
- 로그인 상태에 따른 UI 변경

### 검색 및 필터링

- 카테고리별 필터링
- 검색어로 제목/내용/태그 검색
- 정렬 옵션 (최신순, 오래된순, 평점순)

### 댓글 시스템

- 댓글 작성/수정/삭제
- 작성자 정보 표시 (userId → nickname 매핑)
- 수정 모드 토글 (같은 폼 컴포넌트 재사용)

## 🔐 인증

- 로그인 시 토큰을 localStorage에 저장
- Axios 인터셉터에서 자동으로 토큰을 헤더에 추가
- Zustand로 사용자 상태 관리

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
