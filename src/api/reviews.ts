import api from "./axios";
import type { Review } from "../types/review";

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
