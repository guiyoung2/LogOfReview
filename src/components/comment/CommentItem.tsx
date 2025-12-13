import { useState } from "react";
import styled from "styled-components";
import type { Comment } from "../../types/comment";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  authorNickname: string;
  isOwner: boolean;
  currentUserId: number | null;
  onUpdate: (id: number, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const CommentContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorName = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 16px;
`;

const CommentDate = styled.span`
  font-size: 14px;
  color: #999;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant?: "edit" | "delete" }>`
  padding: 6px 12px;
  background: ${(props) =>
    props.$variant === "delete" ? "#e74c3c" : "#667eea"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$variant === "delete" ? "#c0392b" : "#5568d3"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentContent = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 10px;
`;

const EditedBadge = styled.span`
  font-size: 12px;
  color: #999;
  font-style: italic;
`;

const CommentItem = ({
  comment,
  authorNickname,
  isOwner,
  onUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (content: string) => {
    await onUpdate(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      await onDelete(comment.id);
    }
  };

  const isEdited = comment.createdAt !== comment.updatedAt;

  return (
    <CommentContainer>
      <CommentHeader>
        <AuthorInfo>
          <AuthorName>{authorNickname}</AuthorName>
          <CommentDate>
            {new Date(comment.createdAt).toLocaleDateString()}
            {isEdited && <EditedBadge> (수정됨)</EditedBadge>}
          </CommentDate>
        </AuthorInfo>
        {isOwner && !isEditing && (
          <ActionButtons>
            <ActionButton
              $variant="edit"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating || isDeleting}
            >
              수정
            </ActionButton>
            <ActionButton
              $variant="delete"
              onClick={handleDelete}
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </ActionButton>
          </ActionButtons>
        )}
      </CommentHeader>
      {isEditing ? (
        <CommentForm
          initialContent={comment.content}
          isEdit={true}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdating}
        />
      ) : (
        <CommentContent>{comment.content}</CommentContent>
      )}
    </CommentContainer>
  );
};

export default CommentItem;
