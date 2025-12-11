import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../api/reviews";
import { useUserStore } from "../store/userStore";
import ReviewForm from "../components/review/ReviewForm";
import styled from "styled-components";
import type { CreateReviewRequest, UpdateReviewRequest } from "../types/review";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const PageTitle = styled.h1`
  text-align: center;
  padding: 40px 20px 20px;
  font-size: 32px;
  color: #333;
`;

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoggedIn } = useUserStore();

  // 리뷰 작성 Mutation (모든 hooks는 조건부 return 전에 호출)
  const createMutation = useMutation({
    mutationFn: (data: CreateReviewRequest) => createReview(data),
    onSuccess: () => {
      // 리뷰 목록 쿼리 무효화 (자동 새로고침)
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      // 작성 완료 후 리뷰 목록 페이지로 이동
      navigate("/reviews", { replace: true });
    },
    onError: (error) => {
      console.error("리뷰 작성 실패:", error);
      alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 로그인 체크 (hooks 호출 후 조건부 렌더링)
  if (!isLoggedIn || !user) {
    return (
      <PageContainer>
        <PageTitle>리뷰 작성</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          리뷰를 작성하려면 로그인이 필요합니다.
          <br />
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            로그인하기
          </button>
        </div>
      </PageContainer>
    );
  }

  // 폼 제출 핸들러
  const handleSubmit = async (
    data: CreateReviewRequest | UpdateReviewRequest
  ) => {
    // 작성 페이지에서는 항상 CreateReviewRequest로 변환
    const createData: CreateReviewRequest = {
      ...data,
      userId: Number(user.id), // 로그인한 사용자 ID 추가 (숫자로 변환)
    };
    await createMutation.mutateAsync(createData);
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <PageContainer>
      <PageTitle>리뷰 작성</PageTitle>
      <ReviewForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createMutation.isPending}
      />
    </PageContainer>
  );
};

export default ReviewWritePage;
