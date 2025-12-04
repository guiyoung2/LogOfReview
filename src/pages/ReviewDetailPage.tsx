import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "../api/reviews";
import styled from "styled-components";

const ReviewDetailPage = () => {
  const { id } = useParams(); // URL에서 ID 받기

  // React Query로 데이터 가져오기
  const {
    data: review,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(Number(id)),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!review) return <div>리뷰를 찾을 수 없습니다</div>;

  return (
    <div>
      <h1>{review.title}</h1>
      <p>카테고리: {review.category}</p>
      <p>평점: {review.rating}</p>
      <p>내용: {review.content}</p>
      {/* 이미지 갤러리 */}
      {review.images.map((img, index) => (
        <img key={index} src={img} alt={`${review.title} ${index + 1}`} />
      ))}
      {/* 태그 */}
      <div>
        {review.tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ReviewDetailPage;
