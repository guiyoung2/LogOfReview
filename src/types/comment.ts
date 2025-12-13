export interface Comment {
  id: number;
  reviewId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 댓글 작성 요청 타입
export interface CreateCommentRequest {
  reviewId: number;
  userId: number;
  content: string;
}

// 댓글 수정 요청 타입
export interface UpdateCommentRequest {
  content: string;
}
