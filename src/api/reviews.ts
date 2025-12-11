import api from "./axios";
import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from "../types/review";

// 환경에 따른 데이터 로드 방식
const loadStaticData = async (): Promise<Review[]> => {
  // 프로덕션 환경에서는 정적 JSON 파일 사용
  const response = await fetch("/reviews.json");
  const data = await response.json();
  return data;
};

// 리뷰 목록 조회
export const getReviews = async (): Promise<Review[]> => {
  // 프로덕션 환경에서는 정적 데이터 사용
  if (import.meta.env.PROD) {
    return loadStaticData();
  }
  // 개발 환경에서는 API 호출
  const response = await api.get("/reviews");
  return response.data;
};

// 카테고리별 리뷰 조회
export const getReviewsByCategory = async (
  category: string
): Promise<Review[]> => {
  // 프로덕션 환경에서는 정적 데이터에서 필터링
  if (import.meta.env.PROD) {
    const reviews = await loadStaticData();
    return reviews.filter((r) => r.category === category);
  }
  // 개발 환경에서는 API 호출
  const response = await api.get(`/reviews?category=${category}`);
  return response.data;
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
