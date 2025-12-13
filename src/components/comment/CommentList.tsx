import styled from "styled-components";
import type { Comment } from "../../types/comment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface CommentListProps {
  comments: Comment[];
  reviewId: number;
  currentUserId: number | null;
  users: Record<number, { nickname: string }>;
  onCreate: (content: string) => Promise<void>;
  onUpdate: (id: number, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isLoggedIn: boolean;
}

const CommentsSection = styled.div`
  margin-top: 50px;
  border-top: 2px solid #e0e0e0;
  padding-top: 30px;
`;

const CommentsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const CommentsCount = styled.span`
  font-size: 18px;
  color: #666;
  font-weight: normal;
  margin-left: 8px;
`;

const CommentsList = styled.div`
  margin-top: 20px;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 16px;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
`;

const CommentList = ({
  comments,
  currentUserId,
  users,
  onCreate,
  onUpdate,
  onDelete,
  isCreating = false,
  isUpdating = false,
  isDeleting = false,
  isLoggedIn,
}: CommentListProps) => {
  return (
    <CommentsSection>
      <CommentsTitle>
        댓글
        <CommentsCount>({comments.length})</CommentsCount>
      </CommentsTitle>

      {isLoggedIn ? (
        <CommentForm onSubmit={onCreate} isLoading={isCreating} />
      ) : (
        <LoginPrompt>댓글을 작성하려면 로그인이 필요합니다.</LoginPrompt>
      )}

      <CommentsList>
        {comments.length === 0 ? (
          <EmptyComments>
            아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
          </EmptyComments>
        ) : (
          comments.map((comment) => {
            const author = users[comment.userId];
            const isOwner =
              currentUserId !== null &&
              Number(comment.userId) === Number(currentUserId);

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                authorNickname={author?.nickname || "알 수 없음"}
                isOwner={isOwner}
                currentUserId={currentUserId}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
              />
            );
          })
        )}
      </CommentsList>
    </CommentsSection>
  );
};

export default CommentList;
