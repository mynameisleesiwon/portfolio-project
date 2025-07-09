import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useComments } from '../../../hooks/Feed/useComments';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import CommentItem from './CommentItem';
import CreateComment from './CreateComment';

interface CommentListProps {
  feedId: string; // 댓글을 표시할 피드의 ID
  onCommentUpdate: () => void; // 댓글 업데이트 시 호출할 콜백 (피드의 댓글 수 업데이트용)
}

const CommentList = ({ feedId, onCommentUpdate }: CommentListProps) => {
  const { comments, isLoading, error, refetch } = useComments(feedId);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // 댓글 작성 성공 시 처리
  const handleCommentCreated = () => {
    refetch(); // 댓글 목록 새로고침
    onCommentUpdate(); // 피드의 댓글 수 업데이트
  };

  // 댓글 수정/삭제 성공 시 처리
  const handleCommentUpdated = () => {
    refetch(); // 댓글 목록 새로고침
    onCommentUpdate(); // 피드의 댓글 수 업데이트
  };

  // 메뉴 열기/닫기 처리
  const handleMenuToggle = (commentId: string) => {
    setOpenMenuId(openMenuId === commentId ? null : commentId);
  };

  // 메뉴 닫기 처리
  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  return (
    <div className="mt-4">
      {/* 댓글 작성 폼 */}
      <CreateComment feedId={feedId} onSuccess={handleCommentCreated} />

      {/* 댓글 목록 */}
      <div className="mt-4">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="py-4">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* 댓글 목록 */}
        {!isLoading && !error && (
          <div className="space-y-1">
            {comments.length === 0 ? (
              <div className="text-center py-6 text-text/60">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-text/40" />
                <p className="text-sm">아직 댓글이 없습니다</p>
                <p className="text-xs">첫 번째 댓글을 작성해보세요!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onUpdate={handleCommentUpdated}
                  onDelete={handleCommentUpdated}
                  isMenuOpen={openMenuId === comment.id}
                  onMenuToggle={() => handleMenuToggle(comment.id)}
                  onMenuClose={handleMenuClose}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
