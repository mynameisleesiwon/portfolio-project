import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreVertical, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useUpdateFeed } from '../../../hooks/Feed/useUpdateFeed';
import { useDeleteFeed } from '../../../hooks/Feed/useDeleteFeed';
import { useConfirm } from '../../../hooks/useConfirm';
import ConfirmModal from '../../../common/components/ConfirmModal';
import type { Feed } from '../../../types';
import { useToggleLike } from '../../../hooks/Feed/useToggleLike';
import CommentList from './CommentList';
import { koreanTimeAgo } from '../../../utils/date-utils';

interface FeedItemProps {
  feed: Feed;
  onUpdate: () => void;
  onDelete: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

const FeedItem = ({
  feed,
  onUpdate,
  onDelete,
  isMenuOpen,
  onMenuToggle,
  onMenuClose,
}: FeedItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(feed.content);
  const [showComments, setShowComments] = useState(false); // 댓글 표시 여부

  const [likeCount, setLikeCount] = useState(feed.likeCount || 0);
  const [isLiked, setIsLiked] = useState(feed.isLiked || false);

  const { user } = useAuth();
  const { updateFeed, isLoading: isUpdating } = useUpdateFeed();
  const { deleteFeed, isLoading: isDeleting } = useDeleteFeed();

  const { toggleLike, isLoading: isLiking } = useToggleLike();

  const {
    isOpen: isConfirmOpen,
    confirm,
    close: closeConfirm,
    currentOptions,
    handleConfirm,
  } = useConfirm();

  const isOwner = user?.id === feed.userId;
  const MAX_LENGTH = 500;
  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  const handleUpdate = async () => {
    if (!content.trim() || isOverLimit) return;

    const success = await updateFeed(feed.id, content);
    if (success) {
      setIsEditing(false);
      onUpdate();
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '피드 삭제',
      message: '정말로 이 피드를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      type: 'danger',
    });

    if (confirmed) {
      const success = await deleteFeed(feed.id);
      if (success) {
        onDelete();
      }
    }
  };

  const handleCancel = () => {
    setContent(feed.content);
    setIsEditing(false);
    onMenuClose();
  };

  // 좋아요 토글 핸들러
  const handleToggleLike = async () => {
    const result = await toggleLike(feed.id);
    if (result) {
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
    }
  };

  // 댓글 수 업데이트 핸들러
  const handleCommentUpdate = () => {
    // 댓글 수를 1씩 증가/감소시키는 대신, 부모 컴포넌트에서 전체 피드 목록을 새로고침하도록 함
    onUpdate();
  };

  return (
    <motion.div
      className="border border-border rounded-lg p-4 hover:bg-bg-secondary transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        {/* 사용자 아바타 */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          <img
            src={feed.user?.profileImage || '/default-profile.png'}
            alt="프로필"
            className="w-10 h-10 rounded-full object-cover border border-primary"
          />
        </div>

        {/* 피드 내용 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-text">
                {feed.user.nickname}
              </span>
              <span className="text-xs text-text/60">
                {koreanTimeAgo(feed.createdAt)}
              </span>
            </div>

            {/* 수정/삭제 메뉴 */}
            {isOwner && (
              <div className="relative">
                <button
                  onClick={onMenuToggle}
                  className="p-2 hover:bg-bg-secondary rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <MoreVertical className="w-4 h-4 text-text/60" />
                </button>

                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 top-7 bg-card border border-border rounded-xl shadow-lg backdrop-blur-sm z-10 min-w-[90px] overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        onMenuClose();
                      }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-bg-secondary transition-colors duration-200 flex items-center gap-3 border-b border-border/50 last:border-b-0"
                    >
                      <Edit className="w-4 h-4 text-primary" />
                      <span className="font-medium">수정</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-bg-secondary transition-colors duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4 text-text-muted" />
                      <span className="font-medium text-text-muted">
                        {isDeleting ? '삭제 중...' : '삭제'}
                      </span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* 피드 내용 */}
          {isEditing ? (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[100px] p-3 border border-border rounded-lg bg-bg text-text resize-none focus:outline-none focus:border-primary"
                  maxLength={MAX_LENGTH}
                  disabled={isUpdating}
                />

                {/* 글자 수 표시 - CreateFeed와 동일한 위치 */}
                <div className="absolute bottom-3 right-3 text-xs">
                  <span
                    className={isOverLimit ? 'text-red-500' : 'text-text/60'}
                  >
                    {remainingChars}
                  </span>
                  <span className="text-text/60"> / {MAX_LENGTH}</span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="px-3 py-1 text-sm border border-border rounded hover:bg-bg-secondary disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={!content.trim() || isOverLimit || isUpdating}
                    className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50"
                  >
                    {isUpdating ? '수정 중...' : '수정'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-text/80 leading-relaxed whitespace-pre-wrap mb-3">
                {feed.content}
              </p>

              <div className="flex items-center gap-2">
                {/* 좋아요 버튼 */}
                <motion.button
                  onClick={handleToggleLike}
                  disabled={isLiking}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isLiked
                      ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                      : 'bg-bg-secondary text-text/60 border border-border hover:bg-bg-secondary/80 hover:border-primary/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <motion.div
                    animate={{
                      scale: isLiked ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                    />
                  </motion.div>
                  <span className="text-sm">{likeCount}</span>
                </motion.button>

                {/* 댓글 버튼 */}
                <motion.button
                  onClick={() => setShowComments(!showComments)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    showComments
                      ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                      : 'bg-bg-secondary text-text/60 border border-border hover:bg-bg-secondary/80 hover:border-primary/30'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{feed.commentCount || 0}</span>
                </motion.button>
              </div>
              {/* 댓글 목록 */}
              {showComments && (
                <CommentList
                  feedId={feed.id}
                  onCommentUpdate={handleCommentUpdate}
                />
              )}
            </div>
          )}
        </div>
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

export default FeedItem;
