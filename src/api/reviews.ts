import api from "./axios";
import { loadReviews, assertWritable } from "./dataSource";
import type {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from "../types/review";

// 정렬 옵션 타입
export type SortOption = "latest" | "oldest" | "ratingHigh" | "ratingLow";

// 정렬 함수
export const sortReviews = (reviews: Review[], sortBy: SortOption): Review[] => {
  const sorted = [...reviews];

  switch (sortBy) {
    case "latest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    case "oldest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      });
    case "ratingHigh":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "ratingLow":
      return sorted.sort((a, b) => a.rating - b.rating);
    default:
      return sorted;
  }
};

// 리뷰 목록 조회
export const getReviews = async (sortBy?: SortOption): Promise<Review[]> => {
  const reviews = await loadReviews();
  return sortBy ? sortReviews(reviews, sortBy) : reviews;
};

// 카테고리별 리뷰 조회
export const getReviewsByCategory = async (
  category: string,
  sortBy?: SortOption
): Promise<Review[]> => {
  const allReviews = await loadReviews();
  const reviews = allReviews.filter((r) => r.category === category);
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
    return category
      ? getReviewsByCategory(category, sortBy)
      : getReviews(sortBy);
  }

  const searchTerm = query.toLowerCase().trim();
  let reviews = await loadReviews();

  if (category) {
    reviews = reviews.filter((review) => review.category === category);
  }

  const filteredReviews = reviews.filter((review) => {
    const titleMatch = review.title.toLowerCase().includes(searchTerm);
    const contentMatch = review.content.toLowerCase().includes(searchTerm);
    const tagsMatch = review.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm)
    );
    return titleMatch || contentMatch || tagsMatch;
  });

  return sortBy ? sortReviews(filteredReviews, sortBy) : filteredReviews;
};

// 리뷰 상세 조회
export const getReviewById = async (id: number): Promise<Review> => {
  const reviews = await loadReviews();
  // json-server 데이터에서 id가 문자열로 올 수 있어 Number() 캐스팅
  const review = reviews.find((r) => Number(r.id) === id);
  if (!review) {
    throw new Error("Review not found");
  }
  return review;
};

// 리뷰 작성
export const createReview = async (
  data: CreateReviewRequest
): Promise<Review> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 리뷰 작성이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
  const now = new Date().toISOString();
  const reviewData = { ...data, createdAt: now, updatedAt: now };
  const response = await api.post<Review>("/reviews", reviewData);
  return response.data;
};

// 리뷰 수정
export const updateReview = async (
  id: number,
  data: UpdateReviewRequest
): Promise<Review> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 리뷰 수정이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
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
  const response = await api.put<Review>(`/reviews/${id}`, reviewData);
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (id: number): Promise<void> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 리뷰 삭제가 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
  await api.delete(`/reviews/${id}`);
};
