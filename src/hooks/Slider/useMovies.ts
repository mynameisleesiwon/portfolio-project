import { useEffect, useState } from 'react';
import type { Movie, MovieCategory, TMDBResponse } from '../../types';
import { sliderApi } from '../../services/sliderApi';

interface UseMoviesReturn {
  // 데이터
  movies: Movie[];

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  refetch: () => void;
}

// 영화 데이터 관리 커스텀 훅
export const useMovies = (
  category: MovieCategory,
  maxResults: number = 20
): UseMoviesReturn => {
  // 상태 관리
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카테고리별 API 함수 매핑
  const getMoviesByCategory = async (
    cat: MovieCategory,
    page: number = 1
  ): Promise<TMDBResponse> => {
    switch (cat) {
      case 'popular':
        return sliderApi.getPopularMovie(page);
      default:
        return sliderApi.getPopularMovie(page);
    }
  };

  // 데이터 가져오기 함수
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMoviesByCategory(category);

      // 지정된 개수만큼 영화 데이터 설정
      setMovies(response.results.slice(0, maxResults));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '영화 정보를 불러오는데 실패했습니다.';

      setError(errorMessage);
      setMovies([]);
    } finally {
      // 스켈레톤 UI 보여주기 위해 1초후에 로딩 해제
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // 초기 데이터 로드 및 카테고리 변경 시 새로고침
  useEffect(() => {
    fetchMovies();
  }, [category, maxResults]);

  // 데이터 새로고침
  const refetch = () => {
    fetchMovies();
  };

  return {
    // 데이터
    movies,

    // 상태
    isLoading,
    error,

    // 액션
    refetch,
  };
};
