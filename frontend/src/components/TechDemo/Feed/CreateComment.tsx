import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useCreateComment } from '../../../hooks/Feed/useCreateComment';

interface CreateCommentProps {
  feedId: string; // 댓글을 작성할 피드의 ID
  onSuccess: () => void; // 댓글 작성 성공 시 호출할 콜백
}

const CreateComment = ({ feedId, onSuccess }: CreateCommentProps) => {
  const [content, setContent] = useState('');
  const { user } = useAuthStore();
  const { createComment, isLoading: isSubmitting } = useCreateComment();

  // 글자 수 제한 (댓글은 피드보다 짧게)
  const MAX_LENGTH = 200;
  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || isOverLimit) {
      return;
    }

    const success = await createComment(content, feedId);

    if (success) {
      setContent('');
      onSuccess(); // 댓글 목록 새로고침
    }
  };

  return (
    <motion.div
      className="border-t border-border pt-4 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          {/* 사용자 아바타 */}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
            <img
              src={user?.profileImage || '/default-profile.png'}
              alt="프로필"
              className="w-8 h-8 rounded-full object-cover border border-primary"
            />
          </div>

          {/* 댓글 입력 영역 */}
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 작성하세요..."
                className="w-full min-h-[80px] p-3 border border-border rounded-lg bg-bg text-text placeholder-text/50 resize-none focus:outline-none focus:border-primary transition-colors text-sm"
                maxLength={MAX_LENGTH}
                disabled={isSubmitting}
              />

              {/* 글자 수 표시 */}
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={isOverLimit ? 'text-red-500' : 'text-text/60'}>
                  {remainingChars}
                </span>
                <span className="text-text/60"> / {MAX_LENGTH}</span>
              </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!content.trim() || isOverLimit || isSubmitting}
                className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:bg-text/20 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>작성 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>댓글 작성</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateComment;
