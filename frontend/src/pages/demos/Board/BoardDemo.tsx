import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import BoardList from '../../../components/TechDemo/Board/BoardList';
import { Link } from 'react-router-dom';
import { SiGithub } from 'react-icons/si';
import { useEffect } from 'react';

// 기술 태그
const techTags = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Firebase',
  'Firestore',
];

const BoardDemo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto w-full px-2 py-6 ">
      {/* 페이지 헤더 */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Book size={24} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 ">게시판</h1>

        <p className="text-text-muted mx-auto">
          React + TypeScript와 Firebase를 활용한 게시판 시스템입니다. <br />
          Firestore를 통한 실시간 데이터베이스 연동과 커스텀 훅을 통해 CRUD,
          검색, 카테고리 필터링, 페이지네이션 기능을 구현했습니다. <br />
          그리고 Tailwind CSS를 활용해 반응형 디자인을 구현했습니다.
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

        <div className="mt-6">
          <a
            href="https://github.com/mynameisleesiwon/portfolio-project/blob/main/frontend/src/pages/demos/%08Board/BoardDemo.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
          >
            <SiGithub className="w-4 h-4" />
            소스 코드 확인
          </a>
        </div>
      </motion.div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="bg-card border border-border rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <BoardList />
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

export default BoardDemo;
