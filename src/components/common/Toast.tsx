import { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";

interface ToastProps {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  duration?: number;
  onClose?: () => void;
  onConfirm?: () => void;
  showConfirm?: boolean;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ $type: string; $isClosing: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${(props) => {
    switch (props.$type) {
      case "success":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "warning":
        return "#ff9800";
      default:
        return "#2196f3";
    }
  }};
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 300px;
  max-width: 400px;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
`;

const ToastMessage = styled.div`
  font-size: 16px;
  line-height: 1.5;
  word-break: keep-all;
`;

const ToastButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
`;

const ToastButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: white;
    color: #2196f3;
    
    &:hover {
      background: #f5f5f5;
    }
  `
      : `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}
`;

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  onConfirm,
  showConfirm = false,
}: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!showConfirm && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, showConfirm, handleClose]);

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  return (
    <ToastContainer $type={type} $isClosing={isClosing}>
      <ToastMessage>{message}</ToastMessage>
      {showConfirm && (
        <ToastButtons>
          <ToastButton $variant="secondary" onClick={handleClose}>
            취소
          </ToastButton>
          <ToastButton $variant="primary" onClick={handleConfirm}>
            확인
          </ToastButton>
        </ToastButtons>
      )}
    </ToastContainer>
  );
};

export default Toast;
