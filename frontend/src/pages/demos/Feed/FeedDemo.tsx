import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const techTags = [
  'React',
  'TypeScript',
  'NestJS',
  'PostgreSQL',
  'JWT',
  'Tailwind CSS',
];

const FeedDemo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

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
        className="bg-card border border-border rounded-lg p-6 min-h-[200px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="text-lg text-text/60">🚧 곧 공개될 예정입니다!</span>
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
