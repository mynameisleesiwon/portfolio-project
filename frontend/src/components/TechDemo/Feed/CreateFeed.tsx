import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useCreateFeed } from '../../../hooks/Feed/useCreateFeed';

interface CreateFeedProps {
  onSuccess: () => void; // 피드 작성 성공 시 호출할 콜백
}

const CreateFeed = ({ onSuccess }: CreateFeedProps) => {
  const [content, setContent] = useState('');
  const { user } = useAuthStore();
  const { createFeed, isLoading: isSubmitting } = useCreateFeed();

  // 글자 수 제한
  const MAX_LENGTH = 500;
  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || isOverLimit) {
      return;
    }

    const success = await createFeed(content);

    if (success) {
      setContent('');
      onSuccess();
    }
  };

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* 사용자 아바타 */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              <img
                src={user?.profileImage || '/default-profile.png'}
                alt="프로필"
                className="w-10 h-10 rounded-full object-cover border border-primary"
              />
            </div>

            {/* 사용자 정보 */}
            <div>
              <div className="font-semibold text-text">{user?.nickname}</div>
            </div>
          </div>
        </div>

        {/* 텍스트 영역  */}
        <div className="mb-4 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="무슨 생각을 하고 계신가요?"
            className="w-full min-h-[120px] p-3 border border-border rounded-lg bg-bg text-text placeholder-text/50 resize-none focus:outline-none focus:border-primary transition-colors"
            maxLength={MAX_LENGTH}
            disabled={isSubmitting}
          />

          {/* 글자 수 표시  */}
          <div className="absolute bottom-3 right-3 text-xs">
            <span className={isOverLimit ? 'text-red-500' : 'text-text/60'}>
              {remainingChars}
            </span>
            <span className="text-text/60"> / {MAX_LENGTH}</span>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="flex justify-end">
          {/* 제출 버튼  */}
          <button
            type="submit"
            disabled={!content.trim() || isOverLimit || isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:bg-text/20 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>작성 중...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>피드 작성</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateFeed;
