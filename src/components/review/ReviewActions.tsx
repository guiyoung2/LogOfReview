import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
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

const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
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

const DeleteButton = styled.button`
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

interface ReviewActionsProps {
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  showActions: boolean;
}

const ReviewActions = ({
  onBack,
  onEdit,
  onDelete,
  isDeleting = false,
  showActions,
}: ReviewActionsProps) => {
  return (
    <ButtonContainer>
      <BackButton onClick={onBack}>← 뒤로가기</BackButton>
      {showActions && (
        <ActionButtonContainer>
          <EditButton onClick={onEdit}>수정</EditButton>
          <DeleteButton onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? "삭제 중..." : "삭제"}
          </DeleteButton>
        </ActionButtonContainer>
      )}
    </ButtonContainer>
  );
};

export default ReviewActions;
