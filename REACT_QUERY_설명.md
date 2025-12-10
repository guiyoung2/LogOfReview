# React Query (TanStack Query) 상세 설명

## 📚 목차

1. [React Query란?](#react-query란)
2. [useQueryClient](#usequeryclient)
3. [useMutation](#usemutation)
4. [실제 사용 예제 분석](#실제-사용-예제-분석)

---

## React Query란?

**React Query**는 서버 상태(Server State)를 관리하는 라이브러리입니다.

### 서버 상태 vs 클라이언트 상태

| 구분      | 서버 상태              | 클라이언트 상태           |
| --------- | ---------------------- | ------------------------- |
| 저장 위치 | 서버 (데이터베이스)    | 브라우저 (메모리)         |
| 예시      | 리뷰 목록, 사용자 정보 | 모달 열림/닫힘, 필터 옵션 |
| 관리 도구 | React Query            | useState, Zustand         |

### React Query의 주요 기능

1. **자동 캐싱**: 한 번 가져온 데이터를 메모리에 저장
2. **자동 재요청**: 데이터가 오래되면 자동으로 새로고침
3. **로딩/에러 상태 관리**: 자동으로 로딩/에러 상태 제공
4. **캐시 무효화**: 데이터 변경 시 관련 캐시 자동 갱신

---

## useQueryClient

### 기본 개념

`useQueryClient`는 **React Query의 캐시를 관리하는 객체**를 가져오는 훅입니다.

```typescript
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
```

### 주요 메서드

#### 1. `invalidateQueries` - 캐시 무효화

**무엇을 하는가?**

- 특정 쿼리의 캐시를 무효화(만료)시킵니다
- 무효화된 쿼리는 다음에 사용될 때 자동으로 다시 요청됩니다

**언제 사용하나?**

- 데이터를 생성/수정/삭제한 후
- 관련된 목록 데이터를 자동으로 새로고침하고 싶을 때

**사용 예시:**

```typescript
// 리뷰를 작성한 후, 리뷰 목록을 자동으로 새로고침
queryClient.invalidateQueries({ queryKey: ["reviews"] });

// 특정 카테고리의 리뷰만 무효화
queryClient.invalidateQueries({ queryKey: ["reviews", "food"] });

// 모든 쿼리 무효화 (거의 사용 안 함)
queryClient.invalidateQueries();
```

**옵션:**

```typescript
queryClient.invalidateQueries({
  queryKey: ["reviews"], // 무효화할 쿼리 키
  exact: false, // 정확히 일치하는 것만? (기본: false)
  refetchType: "active", // "active" | "all" | "none" (기본: "active")
});
```

#### 2. `setQueryData` - 캐시 직접 수정

```typescript
// 캐시에 직접 데이터 설정 (API 호출 없이)
queryClient.setQueryData(["review", 1], {
  id: 1,
  title: "수정된 제목",
  // ...
});
```

#### 3. `getQueryData` - 캐시에서 데이터 가져오기

```typescript
// 캐시에서 데이터 가져오기 (API 호출 없이)
const review = queryClient.getQueryData(["review", 1]);
```

#### 4. `removeQueries` - 캐시 삭제

```typescript
// 캐시에서 완전히 제거
queryClient.removeQueries({ queryKey: ["reviews"] });
```

---

## useMutation

### 기본 개념

`useMutation`은 **서버의 데이터를 변경하는 작업** (생성, 수정, 삭제)을 처리하는 훅입니다.

### useQuery vs useMutation

| 구분      | useQuery                        | useMutation                         |
| --------- | ------------------------------- | ----------------------------------- |
| 용도      | 데이터 **조회** (GET)           | 데이터 **변경** (POST, PUT, DELETE) |
| 자동 실행 | ✅ 컴포넌트 마운트 시 자동 실행 | ❌ 수동으로 트리거해야 함           |
| 캐싱      | ✅ 자동 캐싱                    | ❌ 캐싱 안 함                       |

### 기본 구조

```typescript
const mutation = useMutation({
  mutationFn: async data => {
    // 실제 API 호출 함수
    return await api.post("/reviews", data);
  },
  onSuccess: data => {
    // 성공 시 실행할 코드
  },
  onError: error => {
    // 에러 시 실행할 코드
  },
});
```

### 주요 속성 설명

#### 1. `mutationFn` (필수)

**무엇을 하는가?**

- 실제로 서버에 요청을 보내는 함수입니다
- 이 함수가 반환하는 Promise가 mutation의 결과가 됩니다

**타입:**

```typescript
mutationFn: (variables: TVariables) => Promise<TData>;
```

**예시:**

```typescript
const createMutation = useMutation({
  mutationFn: async (data: CreateReviewRequest) => {
    // 실제 API 호출
    const response = await api.post("/reviews", data);
    return response.data; // Promise를 반환해야 함
  },
});
```

#### 2. `onSuccess` (선택)

**무엇을 하는가?**

- mutation이 **성공적으로 완료**되었을 때 실행되는 콜백 함수입니다
- 기본 속성이 아니라 **옵션 속성**입니다

**매개변수:**

```typescript
onSuccess: (data, variables, context) => {
  // data: mutationFn이 반환한 데이터
  // variables: mutationFn에 전달한 인자
  // context: onMutate에서 반환한 값 (선택사항)
};
```

**예시:**

```typescript
const createMutation = useMutation({
  mutationFn: createReview,
  onSuccess: (newReview, variables) => {
    console.log("생성된 리뷰:", newReview);
    console.log("전달한 데이터:", variables);

    // 리뷰 목록 새로고침
    queryClient.invalidateQueries({ queryKey: ["reviews"] });

    // 페이지 이동
    navigate("/reviews");
  },
});
```

#### 3. `onError` (선택)

**무엇을 하는가?**

- mutation이 **실패**했을 때 실행되는 콜백 함수입니다
- 기본 속성이 아니라 **옵션 속성**입니다

**매개변수:**

```typescript
onError: (error, variables, context) => {
  // error: 발생한 에러 객체
  // variables: mutationFn에 전달한 인자
  // context: onMutate에서 반환한 값
};
```

**예시:**

```typescript
const createMutation = useMutation({
  mutationFn: createReview,
  onError: error => {
    console.error("에러 발생:", error);
    alert("리뷰 작성에 실패했습니다.");
  },
});
```

#### 4. `onMutate` (선택)

**무엇을 하는가?**

- mutation이 실행되기 **전에** 실행되는 콜백 함수입니다
- 낙관적 업데이트(Optimistic Update)에 사용됩니다

**예시:**

```typescript
const updateMutation = useMutation({
  mutationFn: updateReview,
  onMutate: async newData => {
    // 진행 중인 쿼리 취소
    await queryClient.cancelQueries({ queryKey: ["review", newData.id] });

    // 이전 데이터 백업
    const previousReview = queryClient.getQueryData(["review", newData.id]);

    // 낙관적 업데이트 (성공 전에 미리 UI 업데이트)
    queryClient.setQueryData(["review", newData.id], newData);

    // 에러 시 롤백을 위해 이전 데이터 반환
    return { previousReview };
  },
  onError: (error, variables, context) => {
    // 에러 시 이전 데이터로 롤백
    if (context?.previousReview) {
      queryClient.setQueryData(
        ["review", variables.id],
        context.previousReview
      );
    }
  },
});
```

### mutation 객체의 속성과 메서드

#### 상태 속성

```typescript
const mutation = useMutation({ ... });

// mutation 객체의 속성들:
mutation.isPending    // 요청 진행 중인가? (boolean)
mutation.isError      // 에러가 발생했는가? (boolean)
mutation.isSuccess    // 성공했는가? (boolean)
mutation.data         // 성공 시 받은 데이터
mutation.error        // 에러 시 에러 객체
```

#### 실행 메서드

##### 1. `mutate` - 비동기 실행 (Promise 반환 안 함)

```typescript
// 사용법
mutation.mutate(data);

// 특징:
// - Promise를 반환하지 않음
// - onSuccess/onError 콜백으로 처리
// - await 사용 불가

// 예시:
const handleSubmit = () => {
  createMutation.mutate(formData, {
    onSuccess: () => {
      console.log("성공!");
    },
    onError: error => {
      console.log("실패:", error);
    },
  });
};
```

##### 2. `mutateAsync` - 비동기 실행 (Promise 반환)

```typescript
// 사용법
const result = await mutation.mutateAsync(data);

// 특징:
// - Promise를 반환함
// - async/await 사용 가능
// - try-catch로 에러 처리 가능

// 예시:
const handleSubmit = async () => {
  try {
    const newReview = await createMutation.mutateAsync(formData);
    console.log("생성된 리뷰:", newReview);
    navigate("/reviews");
  } catch (error) {
    console.error("에러:", error);
    alert("실패했습니다.");
  }
};
```

**mutate vs mutateAsync 비교:**

| 구분       | mutate       | mutateAsync             |
| ---------- | ------------ | ----------------------- |
| 반환값     | void (없음)  | Promise                 |
| await 사용 | ❌ 불가      | ✅ 가능                 |
| 에러 처리  | onError 콜백 | try-catch               |
| 사용 시기  | 간단한 작업  | 복잡한 로직이 필요할 때 |

---

## 실제 사용 예제 분석

### 현재 프로젝트의 ReviewWritePage.tsx 분석

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ReviewWritePage = () => {
  // 1. useQueryClient: 캐시 관리 객체 가져오기
  const queryClient = useQueryClient();

  // 2. useMutation: 리뷰 작성 mutation 생성
  const createMutation = useMutation({
    // mutationFn: 실제 API 호출 함수
    mutationFn: (data: CreateReviewRequest) => createReview(data),

    // onSuccess: 성공 시 실행
    onSuccess: () => {
      // invalidateQueries: 리뷰 목록 캐시 무효화
      // → 다음에 리뷰 목록을 조회할 때 자동으로 새 데이터 가져옴
      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      // 작성 완료 후 목록 페이지로 이동
      navigate("/reviews");
    },

    // onError: 실패 시 실행
    onError: error => {
      console.error("리뷰 작성 실패:", error);
      alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 3. 폼 제출 핸들러
  const handleSubmit = async (data: CreateReviewRequest) => {
    // mutateAsync: mutation 실행 (Promise 반환)
    // await를 사용할 수 있어서 순차적으로 처리 가능
    await createMutation.mutateAsync({
      ...data,
      userId: user.id,
    });
  };

  return (
    <ReviewForm
      onSubmit={handleSubmit}
      isLoading={createMutation.isPending} // 로딩 상태 전달
    />
  );
};
```

### 실행 흐름

```
1. 사용자가 폼 제출
   ↓
2. handleSubmit 호출
   ↓
3. createMutation.mutateAsync() 실행
   ↓
4. mutationFn 실행 → createReview() API 호출
   ↓
5-1. 성공 시:
   - onSuccess 콜백 실행
   - invalidateQueries로 캐시 무효화
   - navigate로 페이지 이동

5-2. 실패 시:
   - onError 콜백 실행
   - 에러 메시지 표시
```

---

## 추가 학습 자료

### 다른 유용한 속성들

```typescript
const mutation = useMutation({
  mutationFn: createReview,

  // 재시도 설정
  retry: 3,                    // 실패 시 3번 재시도
  retryDelay: 1000,           // 재시도 간격 (ms)

  // 변수 변환
  mutationKey: ["createReview"], // mutation 식별자

  // 컨텍스트 (onMutate에서 반환한 값)
  onMutate: async (variables) => {
    return { previousData: ... };
  },

  // 성공/실패 후 정리 작업
  onSettled: (data, error, variables, context) => {
    // 성공/실패 상관없이 항상 실행
  },
});
```

### useMutation의 전체 타입

```typescript
useMutation<
  TData, // mutationFn이 반환하는 데이터 타입
  TError, // 에러 타입
  TVariables, // mutationFn에 전달하는 변수 타입
  TContext // onMutate에서 반환하는 컨텍스트 타입
>({
  mutationFn: (variables: TVariables) => Promise<TData>,
  // ...
});
```

---

## 요약

1. **useQueryClient**: 캐시 관리 객체

   - `invalidateQueries`: 캐시 무효화 (자동 새로고침)

2. **useMutation**: 데이터 변경 작업 처리

   - `mutationFn`: 실제 API 호출 함수 (필수)
   - `onSuccess`: 성공 시 콜백 (선택)
   - `onError`: 실패 시 콜백 (선택)

3. **mutate vs mutateAsync**:

   - `mutate`: Promise 반환 안 함, 콜백으로 처리
   - `mutateAsync`: Promise 반환, async/await 사용 가능

4. **실제 사용 패턴**:

   ```typescript
   // 1. mutation 생성
   const mutation = useMutation({ mutationFn, onSuccess, onError });

   // 2. 실행
   await mutation.mutateAsync(data);

   // 3. 상태 확인
   mutation.isPending; // 로딩 중?
   mutation.data; // 성공한 데이터
   mutation.error; // 에러 객체
   ```
