import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { getReviewById, deleteReview } from "../api/reviews";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/comments";
import { getUsers } from "../api/users";
import { useUserStore } from "../store/userStore";
import CommentList from "../components/comment/CommentList";
import ReviewActions from "../components/review/ReviewActions";
import ImageSlider from "../components/review/ImageSlider";
import ImageModal from "../components/review/ImageModal";
import * as S from "./ReviewDetailPageS";

const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoggedIn } = useUserStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviewId = id ? Number(id) : null;

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => {
      if (!reviewId || isNaN(reviewId)) {
        throw new Error("유효하지 않은 리뷰 ID입니다");
      }
      return getReviewById(reviewId);
    },
    enabled: !!id && !isNaN(Number(id)), // id가 유효한 숫자일 때만 실행
  });

  // 댓글 목록 조회
  const { data: comments = [], isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", reviewId],
    queryFn: () => {
      if (!reviewId || isNaN(reviewId)) {
        throw new Error("유효하지 않은 리뷰 ID입니다");
      }
      return getComments(reviewId);
    },
    enabled: !!reviewId && !isNaN(reviewId),
  });

  // 사용자 목록 조회 (댓글 작성자 정보용)
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // 사용자 맵 생성 (userId -> nickname) - useMemo로 최적화
  const usersMap = useMemo(() => {
    return users.reduce((acc, u) => {
      acc[u.id] = { nickname: u.nickname };
      return acc;
    }, {} as Record<number, { nickname: string }>);
  }, [users]);

  // 리뷰 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!reviewId || isNaN(reviewId)) {
        throw new Error("유효하지 않은 리뷰 ID입니다");
      }
      return deleteReview(reviewId);
    },
    onSuccess: () => {
      // 리뷰 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      // 삭제 완료 후 리뷰 목록 페이지로 이동
      navigate("/reviews", { replace: true });
    },
    onError: (error) => {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 댓글 작성 Mutation
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => {
      if (!reviewId || !user) {
        throw new Error("리뷰 ID 또는 사용자 정보가 없습니다");
      }
      return createComment({
        reviewId,
        userId: Number(user.id),
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 댓글 수정 Mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => {
      return updateComment(id, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 댓글 삭제 Mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => {
      return deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 권한 체크 (본인 리뷰인지 확인)
  const isOwner =
    isLoggedIn && user && review && Number(review.userId) === Number(user.id);

  // 댓글 핸들러 메모이제이션 (useCallback)
  const handleCreateComment = useCallback(
    async (content: string) => {
      await createCommentMutation.mutateAsync(content);
    },
    [createCommentMutation]
  );

  const handleUpdateComment = useCallback(
    async (id: number, content: string) => {
      await updateCommentMutation.mutateAsync({ id, content });
    },
    [updateCommentMutation]
  );

  const handleDeleteComment = useCallback(
    async (id: number) => {
      await deleteCommentMutation.mutateAsync(id);
    },
    [deleteCommentMutation]
  );

  // 이미지 네비게이션 (review가 있을 때만 사용)
  const handlePrevImage = useCallback(() => {
    if (!review) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : review.images.length - 1
    );
  }, [review]);

  const handleNextImage = useCallback(() => {
    if (!review) return;
    setCurrentImageIndex((prev) =>
      prev < review.images.length - 1 ? prev + 1 : 0
    );
  }, [review]);

  const handleImageChange = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // 모달 열기/닫기
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/reviews/${id}/edit`, { replace: true });
  };

  if (isLoading) return <S.Container>로딩 중...</S.Container>;
  if (error) return <S.Container>에러 발생</S.Container>;
  if (!review) return <S.Container>리뷰를 찾을 수 없습니다</S.Container>;

  return (
    <S.Container>
      {/* 뒤로가기 버튼 및 수정/삭제 버튼 */}
      <ReviewActions
        onBack={() => navigate(-1)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
        showActions={!!isOwner}
      />

      {/* 헤더 */}
      <S.Header>
        <S.Title>{review.title}</S.Title>
        <S.MetaInfo>
          <S.Category>{review.category}</S.Category>
          <S.Rating>⭐ {review.rating}</S.Rating>
          <S.DateText>
            {new Date(review.createdAt).toLocaleDateString()}
          </S.DateText>
        </S.MetaInfo>
      </S.Header>

      {/* 이미지 슬라이더 */}
      <ImageSlider
        images={review.images}
        currentIndex={currentImageIndex}
        onImageChange={handleImageChange}
        onImageClick={openModal}
        title={review.title}
      />

      {/* 내용 */}
      <S.Content>{review.content}</S.Content>

      {/* 태그 */}
      {review.tags.length > 0 && (
        <S.TagsContainer>
          {review.tags.map((tag, index) => (
            <S.Tag key={index}>#{tag}</S.Tag>
          ))}
        </S.TagsContainer>
      )}

      {/* 댓글 섹션 */}
      {!isLoadingComments && reviewId && (
        <CommentList
          comments={comments}
          reviewId={reviewId}
          currentUserId={user?.id || null}
          users={usersMap}
          onCreate={handleCreateComment}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
          isCreating={createCommentMutation.isPending}
          isUpdating={updateCommentMutation.isPending}
          isDeleting={deleteCommentMutation.isPending}
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* 이미지 확대 모달 */}
      <ImageModal
        isOpen={isModalOpen}
        images={review.images}
        currentIndex={currentImageIndex}
        onClose={closeModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        title={review.title}
      />
    </S.Container>
  );
};

export default ReviewDetailPage;
