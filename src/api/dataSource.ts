import api from "./axios";
import type { Review } from "../types/review";
import type { Comment } from "../types/comment";

// 전체 리뷰 목록 로드 (환경별 분기)
export const loadReviews = async (): Promise<Review[]> => {
  if (import.meta.env.PROD) {
    const response = await fetch("/reviews.json");
    return response.json() as Promise<Review[]>;
  }
  const response = await api.get<Review[]>("/reviews");
  return response.data;
};

// 전체 댓글 목록 로드 (환경별 분기)
export const loadComments = async (): Promise<Comment[]> => {
  if (import.meta.env.PROD) {
    const response = await fetch("/comments.json");
    return response.json() as Promise<Comment[]>;
  }
  const response = await api.get<Comment[]>("/comments");
  return response.data;
};

// prod 쓰기 차단 가드 (UI 책임은 호출자에게 위임)
export const assertWritable = (errorMessage: string): void => {
  if (import.meta.env.PROD) {
    throw new Error(errorMessage);
  }
};
