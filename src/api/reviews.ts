import api from "./axios";
import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from "../types/review";

// 정렬 옵션 타입
export type SortOption = "latest" | "oldest" | "ratingHigh" | "ratingLow";

// 정렬 함수
const sortReviews = (reviews: Review[], sortBy: SortOption): Review[] => {
  const sorted = [...reviews]; // 원본 배열 복사

  switch (sortBy) {
    case "latest":
      // 최신순: createdAt 기준 내림차순 (최신이 먼저)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // 내림차순
      });
    case "oldest":
      // 오래된순: createdAt 기준 오름차순 (오래된 것이 먼저)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB; // 오름차순
      });
    case "ratingHigh":
      // 별점 높은순: rating 기준 내림차순 (높은 별점이 먼저)
      return sorted.sort((a, b) => b.rating - a.rating); // 내림차순
    case "ratingLow":
      // 별점 낮은순: rating 기준 오름차순 (낮은 별점이 먼저)
      return sorted.sort((a, b) => a.rating - b.rating); // 오름차순
    default:
      return sorted;
  }
};

// 환경에 따른 데이터 로드 방식
const loadStaticData = async (): Promise<Review[]> => {
  // 프로덕션 환경에서는 정적 JSON 파일 사용
  const response = await fetch("/reviews.json");
  const data = await response.json();
  return data;
};

// 리뷰 목록 조회
export const getReviews = async (sortBy?: SortOption): Promise<Review[]> => {
  let reviews: Review[];
  // 프로덕션 환경에서는 정적 데이터 사용
  if (import.meta.env.PROD) {
    reviews = await loadStaticData();
  } else {
    // 개발 환경에서는 API 호출
    const response = await api.get("/reviews");
    reviews = response.data;
  }
  // 정렬 적용
  return sortBy ? sortReviews(reviews, sortBy) : reviews;
};

// 카테고리별 리뷰 조회
export const getReviewsByCategory = async (
  category: string,
  sortBy?: SortOption
): Promise<Review[]> => {
  let reviews: Review[];
  // 프로덕션 환경에서는 정적 데이터에서 필터링
  if (import.meta.env.PROD) {
    const allReviews = await loadStaticData();
    reviews = allReviews.filter((r) => r.category === category);
  } else {
    // 개발 환경에서는 API 호출
    const response = await api.get(`/reviews?category=${category}`);
    reviews = response.data;
  }
  // 정렬 적용
  return sortBy ? sortReviews(reviews, sortBy) : reviews;
};

// 검색어로 리뷰 조회 (제목, 내용, 태그에서 검색)
// category가 제공되면 해당 카테고리 내에서만 검색
export const searchReviews = async (
  query: string,
  category?: string,
  sortBy?: SortOption
): Promise<Review[]> => {
  if (!query.trim()) {
    // 검색어가 없으면 카테고리 필터 또는 전체 조회
    return category
      ? getReviewsByCategory(category, sortBy)
      : getReviews(sortBy);
  }

  const searchTerm = query.toLowerCase().trim();

  // 모든 환경에서 클라이언트 사이드 필터링 사용
  // (json-server는 q 파라미터를 기본 지원하지 않음)
  let reviews = import.meta.env.PROD
    ? await loadStaticData()
    : (await api.get("/reviews")).data;

  // 카테고리 필터링 (카테고리가 지정된 경우)
  if (category) {
    reviews = reviews.filter((review: Review) => review.category === category);
  }

  // 검색어 필터링
  const filteredReviews = reviews.filter((review: Review) => {
    const titleMatch = review.title.toLowerCase().includes(searchTerm);
    const contentMatch = review.content.toLowerCase().includes(searchTerm);
    const tagsMatch = review.tags.some((tag: string) =>
      tag.toLowerCase().includes(searchTerm)
    );
    return titleMatch || contentMatch || tagsMatch;
  });

  // 정렬 적용
  return sortBy ? sortReviews(filteredReviews, sortBy) : filteredReviews;
};

// 리뷰 상세 조회
export const getReviewById = async (id: number): Promise<Review> => {
  // 프로덕션 환경에서는 정적 데이터에서 찾기
  if (import.meta.env.PROD) {
    const reviews = await loadStaticData();
    // id 타입 변환 (문자열일 수도 있으므로)
    const review = reviews.find((r) => Number(r.id) === id);
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  }
  // 개발 환경에서는 API 호출
  const response = await api.get(`/reviews/${id}`);
  return response.data;
};

// 리뷰 작성
export const createReview = async (
  data: CreateReviewRequest
): Promise<Review> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 리뷰 작성이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    // 프로덕션 환경에서는 경고창 표시
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  const now = new Date().toISOString();
  const reviewData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

// 리뷰 수정
export const updateReview = async (
  id: number,
  data: UpdateReviewRequest
): Promise<Review> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 리뷰 수정이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    // 프로덕션 환경에서는 경고창 표시
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  const existingReview = await getReviewById(id);
  const now = new Date().toISOString();
  const reviewData = {
    ...existingReview,
    ...data,
    updatedAt: now,
    id: existingReview.id,
    userId: existingReview.userId,
    createdAt: existingReview.createdAt,
  };
  const response = await api.put(`/reviews/${id}`, reviewData);
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (id: number): Promise<void> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 리뷰 삭제가 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    // 프로덕션 환경에서는 경고창 표시
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  await api.delete(`/reviews/${id}`);
};
