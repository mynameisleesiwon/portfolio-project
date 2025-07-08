import { useState } from 'react';
import { feedApiService } from '../../services/feedApi';

interface UseToggleLikeReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  toggleLike: (
    feedId: string
  ) => Promise<{ isLiked: boolean; likeCount: number } | null>;
  clearError: () => void;
}

export const useToggleLike = (): UseToggleLikeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 좋아요 토글 함수
  const toggleLike = async (
    feedId: string
  ): Promise<{ isLiked: boolean; likeCount: number } | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await feedApiService.toggleLike(feedId);

      return {
        isLiked: response.isLiked,
        likeCount: response.likeCount,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '좋아요 처리에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 에러 초기화
  const clearError = () => {
    setError(null);
  };

  return {
    // 상태
    isLoading,
    error,

    // 액션
    toggleLike,
    clearError,
  };
};
