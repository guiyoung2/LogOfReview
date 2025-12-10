import api from "./axios";
import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from "../types/review";

// 리뷰 목록 조회
export const getReviews = async (): Promise<Review[]> => {
  const response = await api.get("/reviews");
  return response.data;
};

// 카테고리별 리뷰 조회
export const getReviewsByCategory = async (
  category: string
): Promise<Review[]> => {
  const response = await api.get(`/reviews?category=${category}`);
  return response.data;
};

// 리뷰 상세 조회
export const getReviewById = async (id: number): Promise<Review> => {
  const response = await api.get(`/reviews/${id}`);
  return response.data;
};

// 리뷰 작성
export const createReview = async (
  data: CreateReviewRequest
): Promise<Review> => {
  // createdAt, updatedAt 필드는 서버에서 자동으로 생성
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
  // 기존 리뷰 가져오기
  const existingReview = await getReviewById(id);

  // 기존 데이터와 새 데이터 병합
  const now = new Date().toISOString();
  const reviewData = {
    ...existingReview,
    ...data,
    updatedAt: now, // ← 수정 시간 업데이트
    id: existingReview.id,
    userId: existingReview.userId,
    createdAt: existingReview.createdAt,
  };

  const response = await api.put(`/reviews/${id}`, reviewData);
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (id: number): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};
