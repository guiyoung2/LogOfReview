import styled from "styled-components";

const AboutContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  background: #fafafa;
`;

const ContentSection = styled.section`
  max-width: 830px;
  margin: 0 auto;
  padding: 80px 40px;
`;

const MainText = styled.div`
  font-size: 20px;
  line-height: 2;
  color: #2c3e50;
  margin-bottom: 80px;

  .highlight {
    color: #667eea;
    font-weight: 500;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 30px;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #667eea;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 15px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .description {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <ContentSection>
        <MainText>
          <p>
            모든 사람마다 가본 <span className="highlight">장소</span>, 산{" "}
            <span className="highlight">물건</span>, 먹어본{" "}
            <span className="highlight">음식</span> 등에 대해 보고 느끼는 것이
            각자 다 다릅니다.
          </p>
          <p>
            같은 장소를 가도, 같은 음식을 먹어도 사람마다 느끼는 감정과 경험이
            다르기 때문에, 우리는 사람들의 후기나 리뷰를 남기고 다른 사람들은
            어떻게 생각하는지, 각자의 생각이나 몰랐던 것을 알 수 있고 다양한
            소통을 할 수 있는 페이지를 원했습니다.
          </p>
          <p>
            다양한 커뮤니케이션이 있었으면 해서, 사람들의 후기나 체험이 궁금해서
            LogOfReview를 만들게 되었습니다.
          </p>
        </MainText>

        <FeatureGrid>
          <FeatureCard>
            <div className="icon">✍️</div>
            <div className="title">리뷰 작성 및 공유</div>
            <div className="description">
              다양한 카테고리의 리뷰를 작성하고 다른 사람들과 경험을 공유할 수
              있습니다.
            </div>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">👀</div>
            <div className="title">다양한 경험 확인</div>
            <div className="description">
              다른 사람들이 어떤 생각을 하는지, 어떤 경험을 했는지 확인할 수
              있습니다.
            </div>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">💡</div>
            <div className="title">새로운 인사이트</div>
            <div className="description">
              몰랐던 정보와 새로운 관점을 발견하고 배울 수 있습니다.
            </div>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">💬</div>
            <div className="title">커뮤니티 소통</div>
            <div className="description">
              리뷰를 통해 다양한 사람들과 소통하고 교류할 수 있습니다.
            </div>
          </FeatureCard>
        </FeatureGrid>
      </ContentSection>
    </AboutContainer>
  );
};

export default AboutPage;
