export interface Review {
  id: number;
  userId: number;
  title: string;
  content: string;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ReviewCardProps = Pick<
  Review,
  "id" | "title" | "category" | "rating" | "images" | "content" | "tags"
>;

// 리뷰 작성 요청 타입
export interface CreateReviewRequest {
  userId: number;
  title: string;
  content: string;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
}

// 리뷰 수정 요청 타입
export interface UpdateReviewRequest {
  title: string;
  content: string;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
}
