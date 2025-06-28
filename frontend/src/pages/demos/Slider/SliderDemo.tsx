import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Slider from '../../../components/TechDemo/Slider/Slider';
import { useEffect } from 'react';

// 기술 태그
const techTags = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Swiper.js',
  'Axios',
  'TMDB API',
];

const SliderDemo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto w-full px-2 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 ">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Play size={24} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            슬라이드 컴포넌트
          </h1>

          <p className="text-text-muted mx-auto">
            Swiper.js를 활용하여 부드럽고 반응형인 슬라이더 컴포넌트를
            구현했습니다. <br />
            외부 API(TMDB) 연동을 통해 실시간 데이터를 처리하며, 커스텀 훅으로
            데이터 관리 로직을 분리하여 재사용성을 높였습니다. <br />
            스켈레톤 UI, 터치 제스처까지 고려한 완성도 높은 슬라이더입니다.
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
              href="https://github.com/mynameisleesiwon/portfolio-project/blob/main/frontend/src/pages/demos/Slider/SliderDemo.tsx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
            >
              <SiGithub className="w-4 h-4" />
              소스 코드 확인
            </a>
          </div>
        </div>

        {/* 메인 콘텐츠 - 슬라이더 */}
        <div className="space-y-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <Slider title="🔥 인기 영화" category="popular" />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-8 text-center">
          <Link
            to="/tech-demo"
            className="inline-block text-primary hover:text-primary-hover transition-colors font-medium"
          >
            ← 기능 목록으로 돌아가기
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SliderDemo;
