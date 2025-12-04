// import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReviews, getReviewsByCategory } from "../api/reviews";
import ReviewCard from "../components/review/ReviewCard";
import styled from "styled-components";

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: 2px solid ${(props) => (props.$active ? "#667eea" : "#ddd")};
  background: ${(props) => (props.$active ? "#667eea" : "white")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.$active ? "#5568d3" : "#f0f0ff")};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #e74c3c;
`;

const NoReviews = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #999;
`;

const ReviewsPage = () => {
  // const { category } = useParams(); // URL에서 카테고리 받기
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;

  // React Query로 데이터 가져오기
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", category], // 카테고리가 바뀌면 새로 요청
    queryFn: () => (category ? getReviewsByCategory(category) : getReviews()),
  });

  // 필터 변경 함수
  const handleCategoryChange = (newCategory?: string) => {
    if (newCategory) {
      nav(`/reviews?category=${newCategory}`);
    } else {
      nav("/reviews");
    }
  };

  // 카테고리 한글 변환
  const getCategoryName = (cat?: string) => {
    const categoryMap: Record<string, string> = {
      food: "음식",
      place: "장소",
      items: "물건",
      clothing: "옷",
    };
    return cat ? categoryMap[cat] || cat : "전체";
  };

  // 로딩 중
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingMessage>리뷰를 불러오는 중...</LoadingMessage>
      </PageContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>리뷰를 불러오는 데 실패했습니다.</ErrorMessage>
      </PageContainer>
    );
  }

  // 리뷰가 없을 때
  if (!reviews || reviews.length === 0) {
    return (
      <PageContainer>
        <PageTitle>{getCategoryName(category)} 리뷰</PageTitle>
        <NoReviews>아직 등록된 리뷰가 없습니다.</NoReviews>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>{getCategoryName(category)} 리뷰</PageTitle>
      {/* 필터 버튼 */}
      <FilterContainer>
        <FilterButton
          $active={!category}
          onClick={() => handleCategoryChange()}
        >
          전체
        </FilterButton>
        <FilterButton
          $active={category === "food"}
          onClick={() => handleCategoryChange("food")}
        >
          🍔 음식
        </FilterButton>
        <FilterButton
          $active={category === "place"}
          onClick={() => handleCategoryChange("place")}
        >
          📍 장소
        </FilterButton>
        <FilterButton
          $active={category === "items"}
          onClick={() => handleCategoryChange("items")}
        >
          🛍️ 물건
        </FilterButton>
        <FilterButton
          $active={category === "clothing"}
          onClick={() => handleCategoryChange("clothing")}
        >
          👕 옷
        </FilterButton>
      </FilterContainer>

      {/* 리뷰 그리드 */}
      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            title={review.title}
            category={review.category}
            rating={review.rating}
            images={review.images}
            content={review.content}
            tags={review.tags}
          />
        ))}
      </ReviewGrid>
    </PageContainer>
  );
};

export default ReviewsPage;
