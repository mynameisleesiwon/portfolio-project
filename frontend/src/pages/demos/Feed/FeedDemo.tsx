import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useFeeds } from '../../../hooks/Feed/useFeeds';
import { useAuthStore } from '../../../store/authStore';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import CreateFeed from '../../../components/TechDemo/Feed/CreateFeed';

const techTags = [
  'React',
  'TypeScript',
  'NestJS',
  'PostgreSQL',
  'JWT',
  'Tailwind CSS',
];

const FeedDemo = () => {
  const { feeds, isLoading, error, refetch } = useFeeds();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 피드 작성 성공 시 처리
  const handleFeedCreated = () => {
    refetch(); // 피드 목록 새로고침
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full px-2 py-6">
      {/* 페이지 헤더 */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MessageCircle size={24} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">소셜 피드</h1>

        <p className="text-text-muted mx-auto">
          NestJS 백엔드와 연동된 소셜 피드 시스템입니다.
          <br />
          JWT 인증을 활용하여 사용자별 피드를 제공하고, 피드 작성, 좋아요, 댓글
          기능을 구현했습니다.
          <br />
          실시간 데이터 업데이트와 반응형 디자인으로 모던한 소셜 미디어 경험을
          제공합니다.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="bg-card border border-border rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* 피드 작성 폼 - 로그인한 유저에게만 표시 */}
        {isAuthenticated && <CreateFeed onSuccess={handleFeedCreated} />}

        {/* 로그인 안내 */}
        {!isAuthenticated && (
          <motion.div
            className="mb-6 p-4 bg-bg-secondary border border-border rounded-lg text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-text/70 mb-2">
              피드를 작성하려면 로그인이 필요합니다.
            </p>
            <Link
              to="/auth/signin"
              className="inline-flex items-center space-x-1 text-primary hover:text-primary-hover transition-colors"
            >
              <span>로그인하기</span>
            </Link>
          </motion.div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="py-8">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* 피드 목록 */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {feeds.length === 0 ? (
              <div className="text-center py-8 text-text/60">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-text/40" />
                <p className="text-lg font-medium mb-2">아직 피드가 없습니다</p>
                <p className="text-sm">
                  {isAuthenticated
                    ? '첫 번째 피드를 작성해보세요!'
                    : '로그인하고 첫 번째 피드를 작성해보세요!'}
                </p>
              </div>
            ) : (
              feeds.map((feed) => (
                <div
                  key={feed.id}
                  className="border border-border rounded-lg p-4 hover:bg-bg-secondary transition-colors"
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
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-text">
                          {feed.user.nickname}
                        </span>
                        <span className="text-xs text-text/60">
                          {new Date(feed.createdAt).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-text/80 leading-relaxed whitespace-pre-wrap">
                        {feed.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </motion.div>

      {/* 하단 버튼 */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Link
          to="/tech-demo"
          className="inline-block text-primary hover:text-primary-hover transition-colors"
        >
          ← 기능 목록으로 돌아가기
        </Link>
      </motion.div>
    </div>
  );
};

export default FeedDemo;
