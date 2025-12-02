# 리뷰 블로그 프로젝트 계획서

## 📋 프로젝트 개요

**프로젝트명**: LogOfReview (리뷰 블로그)  
**목적**: RESTful API, React Query, Zustand 등 실무 필수 기술 학습  
**기술 스택**: React + TypeScript + Vite + React Query + Zustand + React Router + Axios

---

## 🎯 학습 목표

1. **RESTful API 이해 및 실습**

   - GET, POST, PUT, DELETE 메서드 사용
   - 서버와 클라이언트 통신 경험

2. **React Query (TanStack Query)**

   - 서버 상태 관리
   - `useQuery`, `useMutation`, `useInfiniteQuery` 활용
   - 쿼리 캐싱 및 무효화

3. **Zustand**

   - 클라이언트 전역 상태 관리
   - 필터, 정렬 옵션 등 UI 상태 관리

4. **실무 필수 기능 구현**
   - 무한 스크롤
   - 검색 기능 (debounce)
   - 필터링 및 정렬
   - 이미지 업로드

---

## 📁 프로젝트 구조

```
src/
├── api/                    # API 관련
│   ├── axios.ts           # Axios 인스턴스 설정
│   └── reviews.ts         # 리뷰 API 함수들
│
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   └── Error.tsx
│   ├── review/            # 리뷰 관련 컴포넌트
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewList.tsx
│   │   └── ReviewDetail.tsx
│   └── filter/            # 필터 관련 컴포넌트
│       ├── SearchBar.tsx
│       ├── CategoryFilter.tsx
│       └── SortOptions.tsx
│
├── hooks/                 # 커스텀 훅
│   ├── useDebounce.ts
│   └── useInfiniteScroll.ts
│
├── pages/                 # 페이지 컴포넌트
│   ├── HomePage.tsx       # 리뷰 목록 (무한 스크롤)
│   ├── ReviewDetailPage.tsx
│   ├── ReviewWritePage.tsx
│   └── ReviewEditPage.tsx
│
├── store/                 # Zustand 스토어
│   └── filterStore.ts     # 필터, 정렬 상태 관리
│
├── types/                 # TypeScript 타입 정의
│   └── review.ts
│
├── utils/                 # 유틸리티 함수
│   └── formatDate.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🗂️ 데이터 구조

### Review 타입 정의

```typescript
interface Review {
  id: number;
  title: string;
  content: string;
  category: "place" | "food" | "item" | "clothing";
  rating: number; // 1-5
  images: string[]; // 이미지 URL 배열
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### JSON Server 데이터 구조 (db.json)

```json
{
  "reviews": [
    {
      "id": 1,
      "title": "맛있는 카페 리뷰",
      "content": "분위기가 좋고 커피가 맛있었어요!",
      "category": "place",
      "rating": 5,
      "images": ["https://example.com/image1.jpg"],
      "tags": ["카페", "데이트"],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

## 🛣️ 라우팅 구조

```
/                          → HomePage (리뷰 목록)
/reviews/:id               → ReviewDetailPage (리뷰 상세)
/reviews/new               → ReviewWritePage (리뷰 작성)
/reviews/:id/edit          → ReviewEditPage (리뷰 수정)
```

---

## 🔌 RESTful API 엔드포인트

### 리뷰 CRUD

- `GET /reviews` - 리뷰 목록 조회
  - 쿼리 파라미터: `?category=place&rating=5&sort=latest&q=검색어&_page=1&_limit=10`
- `GET /reviews/:id` - 리뷰 상세 조회
- `POST /reviews` - 리뷰 작성
- `PUT /reviews/:id` - 리뷰 수정
- `DELETE /reviews/:id` - 리뷰 삭제

---

## 📝 구현 단계별 계획

### Phase 1: 프로젝트 기본 설정

- [ ] 프로젝트 구조 생성
- [ ] TypeScript 타입 정의
- [ ] Axios 인스턴스 설정
- [ ] React Query Provider 설정
- [ ] React Router 설정
- [ ] JSON Server 설정 (db.json 생성)

### Phase 2: 기본 CRUD 구현

- [ ] 리뷰 목록 조회 (GET)
- [ ] 리뷰 상세 조회 (GET)
- [ ] 리뷰 작성 (POST)
- [ ] 리뷰 수정 (PUT)
- [ ] 리뷰 삭제 (DELETE)
- [ ] 기본 UI 컴포넌트 구현

### Phase 3: React Query 적용

- [ ] `useQuery`로 리뷰 목록/상세 조회
- [ ] `useMutation`으로 생성/수정/삭제
- [ ] 쿼리 무효화 (invalidateQueries)
- [ ] 로딩/에러 상태 처리

### Phase 4: 무한 스크롤 구현

- [ ] `useInfiniteQuery` 적용
- [ ] 스크롤 감지 및 다음 페이지 로드
- [ ] 로딩 인디케이터 추가

### Phase 5: 검색 기능

- [ ] 검색바 컴포넌트 구현
- [ ] Debounce 함수 구현
- [ ] 검색 API 연동
- [ ] 검색 결과 표시

### Phase 6: 필터링 및 정렬

- [ ] Zustand로 필터 상태 관리
- [ ] 카테고리 필터 구현
- [ ] 평점 필터 구현
- [ ] 정렬 옵션 구현 (최신순, 평점순, 인기순)
- [ ] 필터/정렬 조합 적용

### Phase 7: 이미지 업로드

- [ ] 이미지 선택 기능
- [ ] 이미지 미리보기
- [ ] FormData로 이미지 전송
- [ ] 이미지 갤러리 표시

### Phase 8: 추가 기능 (선택)

- [ ] 평점 별점 UI
- [ ] 태그 기능
- [ ] 좋아요 기능
- [ ] 댓글 기능

---

## 🎨 주요 기능 상세

### 1. 무한 스크롤

- React Query의 `useInfiniteQuery` 사용
- 스크롤이 하단에 도달하면 자동으로 다음 페이지 로드
- 로딩 중 인디케이터 표시

### 2. 검색 기능

- 제목, 내용, 태그에서 검색
- Debounce 적용 (500ms)
- 실시간 검색 결과 업데이트

### 3. 필터링

- 카테고리: 장소 / 음식 / 물건 / 옷
- 평점: 1점 ~ 5점
- 필터 조합 가능

### 4. 정렬

- 최신순 (createdAt DESC)
- 평점순 (rating DESC)
- 인기순 (좋아요 수 기준, 추후 구현)

### 5. 이미지 업로드

- 다중 이미지 선택 가능
- 이미지 미리보기
- 이미지 삭제 기능

---

## 🛠️ 기술 스택 상세

### 상태 관리

- **React Query**: 서버 상태 (리뷰 데이터)
- **Zustand**: 클라이언트 상태 (필터, 정렬 옵션)

### HTTP 클라이언트

- **Axios**: RESTful API 호출

### 라우팅

- **React Router DOM**: 페이지 라우팅

### 개발 도구

- **JSON Server**: Mock API 서버
- **TypeScript**: 타입 안정성

---

## 📦 설치된 패키지

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.90.11",
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "json-server": "^1.0.0-beta.3"
  }
}
```

---

## 🚀 실행 방법

1. **프론트엔드 개발 서버 실행**

   ```bash
   npm run dev
   ```

2. **Mock API 서버 실행** (별도 터미널)

   ```bash
   npm run server
   ```

3. **브라우저 접속**
   - 프론트엔드: http://localhost:5173
   - API 서버: http://localhost:3001

---

## 📚 학습 포인트

1. **RESTful API 이해**

   - HTTP 메서드의 의미와 사용법
   - 쿼리 파라미터 활용
   - 요청/응답 데이터 구조

2. **React Query 활용**

   - 서버 상태와 클라이언트 상태 구분
   - 캐싱 전략
   - 무한 스크롤 구현

3. **상태 관리 패턴**

   - React Query: 서버 데이터
   - Zustand: UI 상태
   - useState: 컴포넌트 로컬 상태

4. **실무 기능 구현**
   - 무한 스크롤
   - 검색 최적화 (debounce)
   - 필터링/정렬
   - 이미지 업로드

---

## ✅ 체크리스트

### 기본 설정

- [ ] 프로젝트 구조 생성
- [ ] 타입 정의
- [ ] API 설정
- [ ] 라우팅 설정

### CRUD 구현

- [ ] 리뷰 목록 조회
- [ ] 리뷰 상세 조회
- [ ] 리뷰 작성
- [ ] 리뷰 수정
- [ ] 리뷰 삭제

### React Query 적용

- [ ] useQuery 적용
- [ ] useMutation 적용
- [ ] useInfiniteQuery 적용
- [ ] 쿼리 무효화

### 실무 기능

- [ ] 무한 스크롤
- [ ] 검색 기능 (debounce)
- [ ] 필터링
- [ ] 정렬
- [ ] 이미지 업로드

---

## 🎯 다음 단계

프로젝트 완성 후:

1. Next.js 학습 (이미 구매한 강의)
2. 실제 백엔드 API 연동
3. 비밀번호 암호화 (bcrypt 등)
4. 리프레시 토큰 구현
5. 배포 (Vercel, Netlify 등)

---

**작성일**: 2025년 12월  
**프로젝트 상태**: 계획 단계
