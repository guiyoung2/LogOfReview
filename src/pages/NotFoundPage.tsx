import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 40px 20px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  color: #667eea;
  font-weight: bold;
`;

const ErrorMessage = styled.h2`
  font-size: 32px;
  margin: 20px 0;
  color: #333;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background: #667eea;
  color: white;
  border-radius: 30px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s;

  &:hover {
    background: #5568d3;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>페이지를 찾을 수 없습니다</ErrorMessage>
      <Description>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </Description>
      <HomeButton to="/">홈으로 돌아가기</HomeButton>
    </Container>
  );
};

export default NotFoundPage;
