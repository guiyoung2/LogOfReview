# 프로젝트 회고록 (Reflection)

## 📝 프로젝트 개발 순서

### 1단계: 프로젝트 초기 설정

- Vite + React + TypeScript 프로젝트 생성
- 필요한 패키지 설치 (React Query, Zustand, React Router, Axios, Styled Components)
- 기본 폴더 구조 설정 (`src/pages`, `src/components`, `src/api`, `src/store`, `src/types`)
- JSON Server 설정 및 `db.json` mock 데이터 생성

### 2단계: 기본 라우팅 및 레이아웃

- `App.tsx`에 React Router 설정
- 기본 페이지 생성 (HomePage, AboutPage, NotFoundPage)
- `Header` 컴포넌트 생성 (초기 버전)
- `main.tsx`에 React Query Provider 설정

### 3단계: 사용자 인증 시스템

- Zustand로 사용자 상태 관리 스토어 생성 (`userStore.ts`)
- `localStorage`에 로그인 상태 영구 저장 (persist middleware)
- Axios 인스턴스 설정 및 인터셉터 구현
  - 요청 인터셉터: 자동으로 토큰을 헤더에 추가
  - 응답 인터셉터: 401 에러 시 자동 로그아웃
- `LoginPage` 구현
- 로그인 API 함수 구현 (`api/login.ts`)

### 4단계: 리뷰 목록 페이지

- `ReviewsPage` 구현
- 리뷰 목록 조회 API 함수 구현 (`api/reviews.ts`)
- `ReviewCard` 컴포넌트 생성
- React Query의 `useQuery`로 리뷰 목록 데이터 페칭

### 5단계: 리뷰 상세 페이지

- `ReviewDetailPage` 구현
- 리뷰 상세 조회 API 함수 구현
- 이미지 슬라이더 컴포넌트 구현
- 이미지 확대 모달 기능 추가
- 태그 표시 기능

### 6단계: 리뷰 작성 기능

- `ReviewWritePage` 구현
- `ReviewForm` 컴포넌트 생성 (재사용 가능한 폼)
- 태그 입력 기능 (최대 4개)
- React Query의 `useMutation`으로 리뷰 생성
- 작성 성공 시 목록 페이지로 이동 (`replace: true`)

### 7단계: 리뷰 수정/삭제 기능

- `EditReviewPage` 구현
- `ReviewForm`을 수정 모드로 재사용 (`initialData` prop)
- 리뷰 수정 API 함수 구현 (`updateReview`)
- `ReviewDetailPage`에 수정/삭제 버튼 추가
- 권한 체크 로직 구현 (본인 리뷰만 수정/삭제 가능)
- 삭제 기능 구현 (`deleteReview`)

### 8단계: 검색 및 필터링 기능

- `ReviewsPage`에 검색 바 추가
- 제목, 내용, 태그로 검색 기능 구현
- 카테고리 필터 추가 (음식, 장소, 물건, 옷)
- 정렬 옵션 추가 (최신순, 오래된순, 평점 높은순, 평점 낮은순)
- 필터/정렬 상태를 URL 쿼리 파라미터로 관리

### 9단계: UI/UX 개선

- `Toast` 컴포넌트 생성 (커스텀 알림 메시지)
- `ReviewsPage`에 Floating Action Button (FAB) 추가
  - 로그인 상태에 따라 다르게 동작 (로그인 시 작성 페이지 이동, 비로그인 시 Toast 표시)
- `Header` 반응형 디자인 개선
  - 모바일 환경에서 햄버거 메뉴 표시
  - 햄버거 아이콘 애니메이션 (열릴 때 X 모양으로 변경)
  - 로그인 상태에 따라 동적 메뉴 표시 (로그인 전: 로그인 버튼, 로그인 후: My page + 로그아웃)
  - 닉네임을 메뉴 하단에 표시

### 10단계: 댓글 기능 구현

- 댓글 타입 정의 (`types/comment.ts`)
- 댓글 API 함수 구현 (`api/comments.ts`)
  - 댓글 조회, 생성, 수정, 삭제
- 사용자 API 함수 구현 (`api/users.ts`) - 닉네임 조회용
- `db.json`에 `comments` 데이터 추가
- 댓글 컴포넌트 구현
  - `CommentList`: 댓글 목록 컨테이너
  - `CommentItem`: 개별 댓글 아이템 (수정/삭제 버튼 포함)
  - `CommentForm`: 댓글 작성/수정 폼 (재사용)
- `ReviewDetailPage`에 댓글 섹션 통합
- 댓글 권한 체크 (본인 댓글만 수정/삭제 가능)

### 11단계: 빌드 및 배포 준비

- JSON Server의 한계 인식 (개발 환경에서만 동작)
- 빌드 시 읽기 전용 데이터 복사 스크립트 생성 (`scripts/copy-db.js`)
- 빌드 명령어에 데이터 복사 단계 추가

### 12단계: 문서화

- `README.md` 작성 (프로젝트 개요, 기능, 기술 스택, 실행 방법)
- `reflection.md` 작성 (개발 과정에서의 문제와 해결 방법 정리)

---

## 🤔 주요 문제과 해결 과정

### JSON-server mock 데이터 api 의 한계

처음에 서버가 없어서 임의로 mock 데이터를 json-server로 생성했는데
json-server로 만든 프로젝트상 직접 개발환경에서 서버를 켜야 데이터 작성,생성,수정,삭제가
가능하므로써 빌드 되었을때의 데이터를 복사본으로 추가 생성해서 다르게 관리로 변경
직접 개발환경에서는 기능 테스트가 가능하지만 빌드 되었을때는 read 기능만으로 수정함

### Axios Interceptor 이해하기

**질문**: `axios.interceptors.request.use()`에서 `request`, `use()`, `config` 파라미터가 무엇인지 헷갈렸습니다.

**해결**:

- **`interceptors`**: Axios의 요청/응답을 가로채는 기능
- **`request`**: 요청을 보내기 전에 실행되는 인터셉터
- **`use()`**: 인터셉터를 등록하는 메서드
  - 첫 번째 인자: 성공 시 실행할 함수 (config를 받음)
  - 두 번째 인자: 실패 시 실행할 함수 (error를 받음)
- **`config`**: 요청 설정 객체 (headers, url, method 등이 포함됨)

**예시 코드**:

```typescript
axios.interceptors.request.use(
  (config) => {
    // config를 수정해서 반환하면 요청에 반영됨
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // 수정된 config를 반환해야 함
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);
```

**핵심 포인트**:

- `config`를 수정하고 반환해야 변경사항이 적용됨
- 인터셉터는 모든 Axios 요청에 자동으로 적용됨
- 토큰을 매번 수동으로 추가할 필요 없이 자동으로 헤더에 포함됨

---

### React Query의 쿼리 무효화 (invalidateQueries)

**질문**: 데이터를 수정/삭제한 후 목록이 자동으로 갱신되는 원리가 궁금했습니다.

**해결**:

- `queryClient.invalidateQueries()`를 사용하면 해당 쿼리를 "무효화"함
- 무효화된 쿼리는 자동으로 다시 데이터를 가져옴
- `queryKey`로 어떤 쿼리를 무효화할지 지정

**예시**:

```typescript
// 댓글 작성 후
const createCommentMutation = useMutation({
  mutationFn: createComment,
  onSuccess: () => {
    // "comments"로 시작하는 모든 쿼리를 무효화
    queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    // → 자동으로 댓글 목록을 다시 가져옴
  },
});
```

**핵심 포인트**:

- `mutation`의 `onSuccess`에서 무효화하면 자동으로 UI가 갱신됨
- 수동으로 `refetch()`를 호출할 필요 없음
- React Query가 자동으로 최신 데이터를 가져와서 화면을 업데이트함

---

## 💡 배운 점

1. **Axios Interceptor**: 모든 요청에 자동으로 토큰을 추가하는 방법
2. **React Query**: 서버 상태 관리의 편리함 (캐싱, 자동 리패칭)
3. **컴포넌트 재사용**: 같은 폼 컴포넌트를 작성/수정 모드로 재사용
4. **데이터 매핑**: 배열을 객체로 변환해서 빠른 조회 (users → usersMap)
5. **권한 체크**: 본인 데이터만 수정/삭제할 수 있도록 조건부 렌더링

---

## 🎯 다음에 개선할 점

**성능 최적화**: React.memo, useMemo, useCallback 활용
