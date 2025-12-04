import mainImg0 from "../assets/main_img_0.png";
import mainImg1 from "../assets/main_img_1.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

// 큰 히어로 섹션
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  min-height: 400px;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background: white;
  color: #667eea;
  border-radius: 30px;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// 카테고리 카드 섹션
const CategorySection = styled.section`
  padding: 60px 40px;
  background: #f8f9fa;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(Link)`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

// 이미지 섹션
const ImageSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  margin: 60px auto;
  gap: 40px;
  padding: 0 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    padding: 20px;

    h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const HomePage = () => {
  return (
    <HomeContainer>
      {/* 히어로 섹션 */}
      <HeroSection>
        <div>
          <h1>Today's Review</h1>
          <p>오늘 다른 사람들은 어떤 리뷰를 남겼는지 궁금하다면?</p>
          <CTAButton to="/reviews">리뷰 둘러보기</CTAButton>
        </div>
      </HeroSection>

      {/* 카테고리 카드 */}
      <CategorySection>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "32px",
          }}
        >
          카테고리별 리뷰
        </h2>
        <CategoryGrid>
          <CategoryCard to="/reviews?category=food">
            <h3>🍔 음식</h3>
            <p>맛집, 카페, 디저트 리뷰</p>
          </CategoryCard>
          <CategoryCard to="/reviews?category=place">
            <h3>📍 장소</h3>
            <p>여행지, 카페, 공간 리뷰</p>
          </CategoryCard>
          <CategoryCard to="/reviews?category=items">
            <h3>🛍️ 물건</h3>
            <p>제품, 가전, 생활용품 리뷰</p>
          </CategoryCard>
          <CategoryCard to="/reviews?category=clothing">
            <h3>👕 옷</h3>
            <p>의류, 신발, 액세서리 리뷰</p>
          </CategoryCard>
        </CategoryGrid>
      </CategorySection>

      {/* 이미지 섹션 */}
      <ImageSection>
        <ImageCard>
          <img src={mainImg0} alt="리뷰 작성" />
          <div className="overlay">
            <h3>리뷰 작성하기</h3>
            <p>나만의 경험을 공유해보세요</p>
          </div>
        </ImageCard>
        <ImageCard>
          <img src={mainImg1} alt="리뷰 보기" />
          <div className="overlay">
            <h3>리뷰 둘러보기</h3>
            <p>다양한 리뷰를 확인해보세요</p>
          </div>
        </ImageCard>
      </ImageSection>
    </HomeContainer>
  );
};

export default HomePage;
