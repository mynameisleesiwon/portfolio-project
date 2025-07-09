import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useUpdateComment } from '../../../hooks/Feed/useUpdateComment';
import { useDeleteComment } from '../../../hooks/Feed/useDeleteComment';
import { useConfirm } from '../../../hooks/useConfirm';
import ConfirmModal from '../../../common/components/ConfirmModal';
import type { Comment } from '../../../types';

interface CommentItemProps {
  comment: Comment;
  onUpdate: () => void;
  onDelete: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

const CommentItem = ({
  comment,
  onUpdate,
  onDelete,
  isMenuOpen,
  onMenuToggle,
  onMenuClose,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const { user } = useAuth();
  const { updateComment, isLoading: isUpdating } = useUpdateComment();
  const { deleteComment, isLoading: isDeleting } = useDeleteComment();

  const {
    isOpen: isConfirmOpen,
    confirm,
    close: closeConfirm,
    currentOptions,
    handleConfirm,
  } = useConfirm();

  const isOwner = user?.id === comment.userId;
  const MAX_LENGTH = 200;
  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  const handleUpdate = async () => {
    if (!content.trim() || isOverLimit) return;

    const success = await updateComment(comment.id, content);
    if (success) {
      setIsEditing(false);
      onUpdate();
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '댓글 삭제',
      message: '정말로 이 댓글을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      type: 'danger',
    });

    if (confirmed) {
      const success = await deleteComment(comment.id);
      if (success) {
        onDelete();
      }
    }
  };

  const handleCancel = () => {
    setContent(comment.content);
    setIsEditing(false);
    onMenuClose();
  };

  return (
    <motion.div
      className="flex items-start space-x-3 py-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 사용자 아바타 */}
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
        <img
          src={comment.user?.profileImage || '/default-profile.png'}
          alt="프로필"
          className="w-8 h-8 rounded-full object-cover border border-primary"
        />
      </div>

      {/* 댓글 내용 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-text text-sm">
              {comment.user.nickname}
            </span>
            <span className="text-xs text-text/60">
              {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          {/* 수정/삭제 메뉴 */}
          {isOwner && (
            <div className="relative">
              <button
                onClick={onMenuToggle}
                className="p-1 hover:bg-bg-secondary rounded transition-all duration-200 hover:scale-105"
              >
                <MoreVertical className="w-3 h-3 text-text/60" />
              </button>

              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-6 bg-card border border-border rounded-lg shadow-lg backdrop-blur-sm z-10 min-w-[80px] overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      onMenuClose();
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-bg-secondary transition-colors duration-200 flex items-center gap-2 border-b border-border/50 last:border-b-0"
                  >
                    <Edit className="w-3 h-3 text-primary" />
                    <span className="font-medium">수정</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-bg-secondary transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-3 h-3 text-text-muted" />
                    <span className="font-medium text-text-muted">
                      {isDeleting ? '삭제 중...' : '삭제'}
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        {isEditing ? (
          <div className="space-y-2">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[60px] p-2 border border-border rounded-lg bg-bg text-text resize-none focus:outline-none focus:border-primary text-sm"
                maxLength={MAX_LENGTH}
                disabled={isUpdating}
              />

              {/* 글자 수 표시 */}
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={isOverLimit ? 'text-red-500' : 'text-text/60'}>
                  {remainingChars}
                </span>
                <span className="text-text/60"> / {MAX_LENGTH}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="px-2 py-1 text-xs text-text/60 hover:text-text transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleUpdate}
                disabled={!content.trim() || isOverLimit || isUpdating}
                className="px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary-hover disabled:bg-text/20 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdating ? '수정 중...' : '수정'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-text text-sm leading-relaxed">{comment.content}</p>
        )}
      </div>

      {/* 커스텀 Confirm 모달 */}
      {currentOptions && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          title={currentOptions.title || '확인'}
          message={currentOptions.message}
          confirmText={currentOptions.confirmText || '확인'}
          cancelText={currentOptions.cancelText || '취소'}
          type={currentOptions.type || 'warning'}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
      )}
    </motion.div>
  );
};

export default CommentItem;
