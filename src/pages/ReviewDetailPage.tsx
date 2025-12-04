import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getReviewById } from "../api/reviews";
import styled from "styled-components";

// 1. 전체 컨테이너
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// 2. 뒤로가기 버튼
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;

  &:hover {
    background: #e0e0e0;
  }
`;

// 3. 헤더 영역 (제목, 카테고리, 평점)
const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  color: #333;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 10px;
`;

const Category = styled.span`
  padding: 6px 14px;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
`;

const Rating = styled.span`
  font-size: 18px;
  color: #ffa500;
  font-weight: bold;
`;

const DateText = styled.span`
  font-size: 14px;
  color: #999;
`;

// 4. 이미지 슬라이더
const ImageSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SliderImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 24px;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(SliderButton)`
  left: 10px;
`;

const NextButton = styled(SliderButton)`
  right: 10px;
`;

const ImageIndicator = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
`;

const ImageDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#667eea" : "#ddd")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.$active ? "#5568d3" : "#bbb")};
  }
`;

// 5. 내용
const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
  white-space: pre-wrap;
  word-break: break-word;
`;

// 6. 태그
const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Tag = styled.span`
  padding: 6px 14px;
  background: #ede7f6;
  color: #667eea;
  border-radius: 12px;
  font-size: 14px;
`;

const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(Number(id)),
  });

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error) return <Container>에러 발생</Container>;
  if (!review) return <Container>리뷰를 찾을 수 없습니다</Container>;

  // 이미지 네비게이션
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : review.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < review.images.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <Container>
      {/* 뒤로가기 버튼 */}
      <ButtonContainer>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
      </ButtonContainer>

      {/* 헤더 */}
      <Header>
        <Title>{review.title}</Title>
        <MetaInfo>
          <Category>{review.category}</Category>
          <Rating>⭐ {review.rating}</Rating>
          <DateText>{new Date(review.createdAt).toLocaleDateString()}</DateText>
        </MetaInfo>
      </Header>

      {/* 이미지 슬라이더 */}
      {review.images.length > 0 && (
        <>
          <ImageSlider>
            <SliderImage
              src={review.images[currentImageIndex]}
              alt={`${review.title} ${currentImageIndex + 1}`}
            />

            {/* 이전/다음 버튼 */}
            {review.images.length > 1 && (
              <>
                <PrevButton onClick={handlePrevImage}>‹</PrevButton>
                <NextButton onClick={handleNextImage}>›</NextButton>

                {/* 이미지 번호 표시 */}
                <ImageIndicator>
                  {currentImageIndex + 1} / {review.images.length}
                </ImageIndicator>
              </>
            )}
          </ImageSlider>

          {/* 점 표시 (여러 이미지일 때) */}
          {review.images.length > 1 && (
            <ImageDots>
              {review.images.map((_, index) => (
                <Dot
                  key={index}
                  $active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </ImageDots>
          )}
        </>
      )}

      {/* 내용 */}
      <Content>{review.content}</Content>

      {/* 태그 */}
      {review.tags.length > 0 && (
        <TagsContainer>
          {review.tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </TagsContainer>
      )}
    </Container>
  );
};

export default ReviewDetailPage;
