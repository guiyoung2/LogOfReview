import styled from "styled-components";

const SliderContainer = styled.div`
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
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SliderButton = styled.button`
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

interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
  onImageClick: () => void;
  title: string;
}

const ImageSlider = ({
  images,
  currentIndex,
  onImageChange,
  onImageClick,
  title,
}: ImageSliderProps) => {
  if (images.length === 0) return null;

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onImageChange(newIndex);
  };

  return (
    <>
      <SliderContainer>
        <SliderImage
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          onClick={onImageClick}
        />

        {/* 이전/다음 버튼 */}
        {images.length > 1 && (
          <>
            <PrevButton onClick={handlePrev}>‹</PrevButton>
            <NextButton onClick={handleNext}>›</NextButton>

            {/* 이미지 번호 표시 */}
            <ImageIndicator>
              {currentIndex + 1} / {images.length}
            </ImageIndicator>
          </>
        )}
      </SliderContainer>

      {/* 점 표시 (여러 이미지일 때) */}
      {images.length > 1 && (
        <ImageDots>
          {images.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => onImageChange(index)}
            />
          ))}
        </ImageDots>
      )}
    </>
  );
};

export default ImageSlider;

