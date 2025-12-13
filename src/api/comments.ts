import api from "./axios";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment";

// 환경에 따른 데이터 로드 방식
const loadStaticComments = async (): Promise<Comment[]> => {
  // 프로덕션 환경에서는 정적 JSON 파일 사용
  const response = await fetch("/comments.json");
  const data = await response.json();
  return data;
};

// 리뷰의 댓글 목록 조회
export const getComments = async (reviewId: number): Promise<Comment[]> => {
  let comments: Comment[];
  // 프로덕션 환경에서는 정적 데이터 사용
  if (import.meta.env.PROD) {
    comments = await loadStaticComments();
  } else {
    // 개발 환경에서는 API 호출
    const response = await api.get(`/comments?reviewId=${reviewId}`);
    comments = response.data;
  }
  // reviewId로 필터링 (프로덕션 환경에서)
  if (import.meta.env.PROD) {
    comments = comments.filter((c) => Number(c.reviewId) === reviewId);
  }
  // 최신순 정렬
  return comments.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // 최신순
  });
};

// 댓글 작성
export const createComment = async (
  data: CreateCommentRequest
): Promise<Comment> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 댓글 작성이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  const now = new Date().toISOString();
  const commentData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  const response = await api.post("/comments", commentData);
  return response.data;
};

// 댓글 수정
export const updateComment = async (
  id: number,
  data: UpdateCommentRequest
): Promise<Comment> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 댓글 수정이 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  const existingComment = await api.get(`/comments/${id}`);
  const now = new Date().toISOString();
  const commentData = {
    ...existingComment.data,
    ...data,
    updatedAt: now,
  };
  const response = await api.put(`/comments/${id}`, commentData);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (id: number): Promise<void> => {
  // 프로덕션 환경에서는 읽기 전용이므로 에러 반환
  if (import.meta.env.PROD) {
    const errorMessage =
      "포트폴리오 데모 버전에서는 댓글 삭제가 불가능합니다. 로컬에서 npm run dev와 npm run server를 실행하여 테스트해주세요.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  // 개발 환경에서는 API 호출
  await api.delete(`/comments/${id}`);
};
