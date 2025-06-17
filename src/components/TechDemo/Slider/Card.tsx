// src/components/MovieSlider/MovieCard.tsx
import React from 'react';
import { Star, Calendar } from 'lucide-react';
import type { Movie } from '../../../types';

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  // 포스터 URL 생성
  const getPosterUrl = (posterPath: string | null): string => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  // 평점을 별점으로 변환 (10점 만점을 5점 만점으로)
  const getStarRating = (voteAverage: number): number => {
    return Math.round((voteAverage / 2) * 2) / 2; // 0.5 단위로 반올림
  };

  // 개봉년도 추출
  const getReleaseYear = (releaseDate: string): string => {
    return new Date(releaseDate).getFullYear().toString();
  };

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden 
         transition-all duration-300 cursor-pointer hover:scale-105 
        w-48 h-120 flex flex-col"
      tabIndex={0}
      role="button"
      aria-label={`${movie.title} 상세 정보 보기`}
    >
      {/* 포스터 이미지  */}
      <div className="relative h-60 overflow-hidden flex-shrink-0">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={`${movie.title} 포스터`}
          className="w-full h-full  transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* 평점 오버레이 */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">
            {getStarRating(movie.vote_average).toFixed(1)}
          </span>
        </div>

        {/* 호버 시 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 영화 정보 영역 */}
      <div className="flex-1 p-4 flex flex-col">
        {/* 제목  */}
        <h3 className="font-semibold text-text text-sm mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-1 ">
          {movie.title}
        </h3>

        {/* 개봉년도  */}
        <div className="flex items-center gap-1 text-text-muted text-xs mb-2 flex-shrink-0">
          <Calendar className="w-3 h-3" />
          <span>{getReleaseYear(movie.release_date)}</span>
        </div>

        {/* 줄거리  */}
        <div className="flex-1 mb-3">
          <p className="text-text-muted text-xs leading-relaxed line-clamp-6">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>
        </div>

        {/* 하단 정보 */}
        <div className="pt-3 border-t border-border flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-text-muted">
              {movie.vote_average.toFixed(1)} (
              {movie.vote_count.toLocaleString()})
            </span>
          </div>

          {/* 인기도 표시 */}
          <div className="text-xs text-text-muted">
            인기도 {Math.round(movie.popularity)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
