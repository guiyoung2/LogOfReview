// src/components/review/ReviewCard.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { ReviewCardProps } from "../../types/review";

const Card = styled(Link)`
  display: block;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageCount = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Category = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 8px 0;
  color: #333;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #ffa500;
  margin-bottom: 8px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ReviewCard = ({
  id,
  title,
  category,
  rating,
  images,
  content,
}: ReviewCardProps) => {
  const displayImage =
    images?.length > 0 ? images[0] : `reviews/${category}/ex_${category}.png`;

  return (
    <Card to={`/reviews/${category}/${id}`}>
      <ImageWrapper>
        <img src={displayImage} alt={title} />
        {images.length > 1 && <ImageCount>📷 {images.length}</ImageCount>}
      </ImageWrapper>
      <CardContent>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Rating>⭐ {rating}</Rating>
        <Content>{content}</Content>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
