import { useState } from "react";
import styled from "styled-components";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  initialContent?: string;
  isEdit?: boolean;
}

const FormContainer = styled.form`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e0e0e0;
  }
`;

const CommentForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialContent = "",
  isEdit = false,
}: CommentFormProps) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    await onSubmit(content.trim());
    if (!isEdit) {
      setContent(""); // 작성 모드일 때만 초기화
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        disabled={isLoading}
      />
      <ButtonContainer>
        {isEdit && onCancel && (
          <CancelButton type="button" onClick={onCancel} disabled={isLoading}>
            취소
          </CancelButton>
        )}
        <SubmitButton type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? "처리 중..." : isEdit ? "수정" : "작성"}
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default CommentForm;
