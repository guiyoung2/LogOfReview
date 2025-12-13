// import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getReviews,
  getReviewsByCategory,
  searchReviews,
  type SortOption,
} from "../api/reviews";
import ReviewCard from "../components/review/ReviewCard";
import { useUserStore } from "../store/userStore";
import Toast from "../components/common/Toast";
import styled from "styled-components";

const ReviewsPage = () => {
  // const { category } = useParams(); // URL에서 카테고리 받기
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const { isLoggedIn } = useUserStore();
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState(""); // 실제 검색에 사용되는 검색어
  const [sortBy, setSortBy] = useState<SortOption>("latest"); // 정렬 옵션 (기본값: 최신순)

  // React Query로 데이터 가져오기
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", category, activeSearchQuery, sortBy], // 카테고리, 활성 검색어, 정렬 옵션이 바뀌면 새로 요청
    queryFn: () => {
      // 활성 검색어가 있으면 검색 (카테고리와 정렬과 함께), 없으면 카테고리 필터 또는 전체 조회
      if (activeSearchQuery.trim()) {
        return searchReviews(activeSearchQuery, category, sortBy);
      }
      return category
        ? getReviewsByCategory(category, sortBy)
        : getReviews(sortBy);
    },
  });

  // 검색 실행 함수
  const handleSearch = () => {
    setActiveSearchQuery(searchQuery.trim());
  };

  // Enter 키로 검색
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색어 초기화
  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveSearchQuery("");
  };

  // 필터 변경 함수
  const handleCategoryChange = (newCategory?: string) => {
    // 필터 변경 시 검색어는 유지하되, 활성 검색어는 초기화하지 않음
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

  // 리뷰 작성 버튼 클릭 핸들러
  const handleWriteClick = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      return;
    }
    nav("/reviews/new");
  };

  // Toast 확인 버튼 클릭
  const handleToastConfirm = () => {
    nav("/login");
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

  return (
    <PageContainer>
      {/* 타이틀과 정렬 옵션 */}
      <TitleContainer>
        <PageTitle>{getCategoryName(category)} 리뷰</PageTitle>
        <SortSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="ratingHigh">별점 높은순</option>
          <option value="ratingLow">별점 낮은순</option>
        </SortSelect>
      </TitleContainer>

      {/* 검색바 */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="제목, 내용, 태그로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
        {searchQuery && (
          <ClearButton onClick={handleClearSearch}>✕</ClearButton>
        )}
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>

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

      {/* 리뷰가 없을 때 */}
      {!reviews || reviews.length === 0 ? (
        <NoReviews>
          {activeSearchQuery
            ? `"${activeSearchQuery}"에 대한 검색 결과가 없습니다.`
            : "아직 등록된 리뷰가 없습니다."}
        </NoReviews>
      ) : (
        /* 리뷰 그리드 */
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
      )}

      {/* 리뷰 작성 버튼 (FAB) */}
      <WriteButton onClick={handleWriteClick} title="리뷰 작성하기">
        ✏️
      </WriteButton>

      {/* Toast 알림 */}
      {showToast && (
        <Toast
          message="리뷰를 작성하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
          type="warning"
          showConfirm={true}
          onClose={() => setShowToast(false)}
          onConfirm={handleToastConfirm}
        />
      )}
    </PageContainer>
  );
};

// 검색바 스타일
const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 30px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 50px 14px 20px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all 0.2s;
  z-index: 1;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const SearchButton = styled.button`
  padding: 14px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SortSelect = styled.select`
  padding: 10px 16px;
  border: 2px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;

  &:hover {
    border-color: #667eea;
    background-color: #f0f0ff;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

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

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin: 0;
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

// 리뷰 작성 버튼 (Floating Action Button)
const WriteButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    bottom: 20px;
    right: 20px;
    font-size: 20px;
  }
`;

export default ReviewsPage;
