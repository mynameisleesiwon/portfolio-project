import React from 'react';
import { useMovies } from '../../../hooks/Slider/useMovies';
import type { MovieCategory } from '../../../types';
import ErrorMessage from '../../../common/components/ErrorMessage';
import CardSkeleton from './CardSkeleton';
import Card from './Card';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  title: string;
  category: MovieCategory;
}

const Slider: React.FC<SliderProps> = ({ title, category }) => {
  const { movies, isLoading, error, refetch } = useMovies(category);

  // 에러 표시
  if (error) {
    return (
      <ErrorMessage
        title="데이터를 불러올 수 없습니다"
        message="서버에 연결할 수 없거나 오류가 발생했습니다."
        onRetry={refetch}
      />
    );
  }

  return (
    <div>
      {/* 섹션 제목 */}
      <h2 className="text-2xl font-bold text-text mb-6">{title}</h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={16}
          loop={!isLoading && movies.length > 0}
          navigation={
            !isLoading
              ? {
                  prevEl: `.swiper-button-prev-${category}`,
                  nextEl: `.swiper-button-next-${category}`,
                }
              : false
          }
          className="movie-slider"
        >
          {isLoading
            ? // 스켈레톤 UI
              Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  style={{ width: '192px' }}
                >
                  <CardSkeleton />
                </SwiperSlide>
              ))
            : // 실제 영화 데이터
              movies.map((movie) => (
                <SwiperSlide key={movie.id} style={{ width: '192px' }}>
                  <Card movie={movie} />
                </SwiperSlide>
              ))}
        </Swiper>

        {/* 네비게이션 버튼 - 로딩 중이 아닐 때만 표시 */}
        {!isLoading && movies.length > 0 && (
          <>
            <button
              className={`swiper-button-prev-${category} absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 -ml-5 hover:scale-110`}
              aria-label="이전 영화들 보기"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className={`swiper-button-next-${category} absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 -mr-5 hover:scale-110`}
              aria-label="다음 영화들 보기"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
