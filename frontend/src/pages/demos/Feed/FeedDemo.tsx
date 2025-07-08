import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFeeds } from '../../../hooks/Feed/useFeeds';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import CreateFeed from '../../../components/TechDemo/Feed/CreateFeed';
import FeedItem from '../../../components/TechDemo/Feed/FeedItem';

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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 피드 작성 성공 시 처리
  const handleFeedCreated = () => {
    refetch(); // 피드 목록 새로고침
  };

  // 메뉴 열기/닫기 처리
  const handleMenuToggle = (feedId: string) => {
    setOpenMenuId(openMenuId === feedId ? null : feedId);
  };

  // 메뉴 닫기 처리
  const handleMenuClose = () => {
    setOpenMenuId(null);
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
        {/* 피드 작성 폼 */}
        <CreateFeed onSuccess={handleFeedCreated} />

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
                <p className="text-sm">첫 번째 피드를 작성해보세요!</p>
              </div>
            ) : (
              feeds.map((feed) => (
                <FeedItem
                  key={feed.id}
                  feed={feed}
                  onUpdate={refetch}
                  onDelete={refetch}
                  isMenuOpen={openMenuId === feed.id}
                  onMenuToggle={() => handleMenuToggle(feed.id)}
                  onMenuClose={handleMenuClose}
                />
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
