import styled from "styled-components";

const ModalOverlay = styled.div`
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

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
`;

const CloseButton = styled.button`
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

const ModalNavButton = styled.button`
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

const ModalPrevButton = styled(ModalNavButton)`
  left: 30px;
`;

const ModalNextButton = styled(ModalNavButton)`
  right: 30px;
`;

const ModalCounter = styled.div`
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

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title: string;
}

const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  title,
}: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      {/* 닫기 버튼 */}
      <CloseButton onClick={onClose}>✕</CloseButton>

      {/* 이전/다음 버튼 (여러 이미지일 때만) */}
      {images.length > 1 && (
        <>
          <ModalPrevButton
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            ‹
          </ModalPrevButton>
          <ModalNextButton
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            ›
          </ModalNextButton>

          {/* 이미지 카운터 */}
          <ModalCounter>
            {currentIndex + 1} / {images.length}
          </ModalCounter>
        </>
      )}

      {/* 확대된 이미지 */}
      <ModalImage
        src={images[currentIndex]}
        alt={`${title} ${currentIndex + 1}`}
        onClick={(e) => e.stopPropagation()}
      />
    </ModalOverlay>
  );
};

export default ImageModal;

