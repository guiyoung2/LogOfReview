import api from "./axios";

// 리뷰 목록 조회
export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

// 카테고리별 리뷰 조회
export const getReviewsByCategory = async (category: string) => {
  const response = await api.get(`/reviews?category=${category}`);
  return response.data;
};

// 리뷰 상세 조회
export const getReviewById = async (id: number) => {
  const response = await api.get(`/reviews/${id}`);
  return response.data;
};
