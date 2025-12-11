import styled from "styled-components";

// 1. 전체 컨테이너
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// 2. 뒤로가기 버튼
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #e0e0e0;
  }
`;

// 수정/삭제 버튼 컨테이너
export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

// 수정 버튼
export const EditButton = styled.button`
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background: #5568d3;
  }
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background: #c0392b;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

// 3. 헤더 영역 (제목, 카테고리, 평점)
export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  color: #333;
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 10px;
`;

export const Category = styled.span`
  padding: 6px 14px;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
`;

export const Rating = styled.span`
  font-size: 18px;
  color: #ffa500;
  font-weight: bold;
`;

export const DateText = styled.span`
  font-size: 14px;
  color: #999;
`;

// 4. 이미지 슬라이더
export const ImageSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SliderImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  color: white;
  border: none;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const PrevButton = styled(SliderButton)`
  left: 10px;
`;

export const NextButton = styled(SliderButton)`
  right: 10px;
`;

export const ImageIndicator = styled.div`
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

export const ImageDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const Dot = styled.button<{ $active: boolean }>`
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
export const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
  white-space: pre-wrap;
  word-break: break-word;
`;

// 6. 태그
export const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

export const Tag = styled.span`
  padding: 6px 14px;
  background: #ede7f6;
  color: #667eea;
  border-radius: 12px;
  font-size: 14px;
`;

// 모달 오버레이 (딤드 배경)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

// 확대된 이미지
export const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
`;

// 닫기 버튼
export const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 1001;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

// 이미지 네비게이션 버튼 (모달용)
export const ModalNavButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: all 0.3s;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const ModalPrevButton = styled(ModalNavButton)`
  left: 30px;
`;

export const ModalNextButton = styled(ModalNavButton)`
  right: 30px;
`;

// 이미지 카운터 (모달용)
export const ModalCounter = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  z-index: 1001;
`;
