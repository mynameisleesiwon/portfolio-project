import { motion } from 'framer-motion';
import { Book, MessageCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { DemoCardType } from '../types';
import DemoCardSection from '../components/TechDemo/DemoCardSection';
import { useEffect } from 'react';

const TechDemo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 데모 카드 데이터
  const demoCards: DemoCardType[] = [
    {
      id: 'board',
      title: '게시판',
      description: 'Firebase 기반 게시판 시스템 (CRUD, 검색, 필터링)',
      detailDescription:
        'React + TypeScript로 구현한 게시판 시스템입니다. Firebase Firestore를 통해 실시간 데이터베이스를 구성하고, 커스텀 훅을 활용하여 컴포넌트와 데이터 관리 로직을 분리함으로써 깔끔한 아키텍처를 구현했습니다. 게시글 CRUD부터 검색, 카테고리 필터링, 페이지네이션까지 실무에서 필요한 핵심 기능들을 완성했습니다.',
      icon: <Book className="w-8 h-8" />,
      status: 'active',
      techStack: [
        'React',
        'TypeScript',
        'Firebase',
        'Firestore',
        'Tailwind CSS',
        'Framer Motion',
      ],
      features: [
        '게시글 CRUD 기능',
        '게시글 검색 기능',
        '카테고리별 필터링',
        '페이지네이션',
        '반응형 디자인',
      ],
      route: '/tech-demo/board',
    },
    {
      id: 'slider',
      title: '슬라이더 컴포넌트',
      description:
        'Swiper.js 기반 인터랙티브 슬라이더 (외부 API + 스켈레톤 UI)',
      detailDescription:
        'Swiper.js를 활용하여 부드럽고 반응형인 슬라이더 컴포넌트를 구현했습니다. 외부 API(TMDB) 연동을 통해 실시간 데이터를 처리하며, 커스텀 훅으로 데이터 관리 로직을 분리하여 재사용성을 높였습니다. 로딩 상태에서는 스켈레톤 UI를 제공하고, 터치 제스처를 지원하여 접근성까지 고려한 완성도 높은 슬라이더를 구현했습니다.',
      icon: <Play className="w-8 h-8" />,
      status: 'active',
      techStack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Swiper.js',
        'TMDB API',
      ],
      features: [
        'Swiper.js 라이브러리 활용',
        '외부 API 데이터 연동',
        '스켈레톤 UI 구현',
        '커스텀 훅 데이터 분리',
        '반응형 브레이크포인트',
      ],
      route: '/tech-demo/slider',
    },
    {
      id: 'feed',
      title: '소셜 피드',
      description: 'NestJS 기반 소셜 피드 시스템 (인증 기반)',
      detailDescription:
        'NestJS 백엔드와 연동된 소셜 피드 시스템입니다. JWT 인증을 활용하여 사용자별 피드를 제공하고, 피드 작성, 좋아요, 댓글 기능을 구현했습니다. 실시간 데이터 업데이트와 반응형 디자인으로 모던한 소셜 미디어 경험을 제공합니다.',
      icon: <MessageCircle className="w-8 h-8" />,
      status: 'coming-soon',
      techStack: [
        'React',
        'TypeScript',
        'NestJS',
        'PostgreSQL',
        'JWT',
        'Tailwind CSS',
      ],
      features: [
        '피드 CRUD 기능',
        '좋아요 시스템',
        '댓글 시스템',
        '사용자별 피드',
        '실시간 업데이트',
      ],
      route: '/tech-demo/feed',
    },
  ];

  // 카드 클릭 핸들러
  const handleCardClick = (demo: DemoCardType) => {
    if (demo.status === 'active') {
      navigate(demo.route);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full px-4 py-6 flex flex-col justify-center">
      {/* 헤더 섹션 */}
      <motion.div
        className="text-center mb-16 mt-16 md:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          웹 개발 기능 모음
        </h1>
        <p className="text-lg md:text-xl text-text/70 max-w-4xl mx-auto leading-relaxed">
          실무에 필요한 핵심 웹 개발 기능을 직접 구현해보았습니다.
          <br />
          React, TypeScript, Tailwind CSS를 활용하여 사용자 경험을 고려한
          인터랙티브한 기능들을 <br />
          개발하고 지속적으로 개선하고 있습니다.
        </p>
      </motion.div>

      {/* 데모 카드 섹션 */}
      <DemoCardSection demos={demoCards} onCardClick={handleCardClick} />
    </div>
  );
};

export default TechDemo;
