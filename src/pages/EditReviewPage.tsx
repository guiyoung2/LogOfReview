import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviewById, updateReview } from "../api/reviews";
import { useUserStore } from "../store/userStore";
import ReviewForm from "../components/review/ReviewForm";
import styled from "styled-components";
import type { UpdateReviewRequest } from "../types/review";

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

const EditReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoggedIn } = useUserStore();

  // 기존 리뷰 데이터 가져오기
  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => {
      const reviewId = Number(id);
      if (isNaN(reviewId)) {
        throw new Error("유효하지 않은 리뷰 ID입니다");
      }
      return getReviewById(reviewId);
    },
    enabled: !!id && !isNaN(Number(id)), // id가 유효한 숫자일 때만 실행
  });

  // 리뷰 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateReviewRequest) => {
      const reviewId = Number(id);
      if (isNaN(reviewId)) {
        throw new Error("유효하지 않은 리뷰 ID입니다");
      }
      return updateReview(reviewId, data);
    },
    onSuccess: () => {
      // 리뷰 목록과 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["review", id] });
      // 수정 완료 후 리뷰 상세 페이지로 이동
      navigate(`/reviews/${id}`, { replace: true });
    },
    onError: (error) => {
      console.error("리뷰 수정 실패:", error);
      alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 로딩 중
  if (isLoading) {
    return (
      <PageContainer>
        <PageTitle>리뷰 수정</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          리뷰를 불러오는 중...
        </div>
      </PageContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <PageContainer>
        <PageTitle>리뷰 수정</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#e74c3c",
          }}
        >
          리뷰를 불러오는 데 실패했습니다.
        </div>
      </PageContainer>
    );
  }

  // 리뷰가 없을 때
  if (!review) {
    return (
      <PageContainer>
        <PageTitle>리뷰 수정</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#999",
          }}
        >
          리뷰를 찾을 수 없습니다.
        </div>
      </PageContainer>
    );
  }

  // 로그인 체크
  if (!isLoggedIn || !user) {
    return (
      <PageContainer>
        <PageTitle>리뷰 수정</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          리뷰를 수정하려면 로그인이 필요합니다.
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

  // 권한 체크 (본인 리뷰만 수정 가능)
  if (Number(review.userId) !== Number(user.id)) {
    return (
      <PageContainer>
        <PageTitle>리뷰 수정</PageTitle>
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#e74c3c",
          }}
        >
          본인의 리뷰만 수정할 수 있습니다.
          <br />
          <button
            onClick={() => navigate(`/reviews/${id}`)}
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
            리뷰로 돌아가기
          </button>
        </div>
      </PageContainer>
    );
  }

  // 폼 제출 핸들러
  const handleSubmit = async (data: UpdateReviewRequest) => {
    await updateMutation.mutateAsync(data);
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (window.confirm("수정 중인 내용이 사라집니다. 정말 취소하시겠습니까?")) {
      navigate(`/reviews/${id}`);
    }
  };

  return (
    <PageContainer>
      <PageTitle>리뷰 수정</PageTitle>
      <ReviewForm
        initialData={review}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateMutation.isPending}
      />
    </PageContainer>
  );
};

export default EditReviewPage;
