import api from "./axios";
import { loadComments, assertWritable } from "./dataSource";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment";

// 리뷰의 댓글 목록 조회
export const getComments = async (reviewId: number): Promise<Comment[]> => {
  const allComments = await loadComments();
  // json-server 데이터에서 reviewId가 문자열로 올 수 있어 Number() 캐스팅
  const comments = allComments.filter((c) => Number(c.reviewId) === reviewId);
  return comments.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};

// 댓글 작성
export const createComment = async (
  data: CreateCommentRequest
): Promise<Comment> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 댓글 작성이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
  const now = new Date().toISOString();
  const commentData = { ...data, createdAt: now, updatedAt: now };
  const response = await api.post<Comment>("/comments", commentData);
  return response.data;
};

// 댓글 수정
export const updateComment = async (
  id: number,
  data: UpdateCommentRequest
): Promise<Comment> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 댓글 수정이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
  const existingComment = await api.get<Comment>(`/comments/${id}`);
  const now = new Date().toISOString();
  const commentData = { ...existingComment.data, ...data, updatedAt: now };
  const response = await api.put<Comment>(`/comments/${id}`, commentData);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (id: number): Promise<void> => {
  assertWritable(
    "포트폴리오 데모 버전에서는 댓글 삭제가 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요."
  );
  await api.delete(`/comments/${id}`);
};
