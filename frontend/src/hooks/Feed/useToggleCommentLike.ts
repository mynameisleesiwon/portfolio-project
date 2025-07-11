import { useState } from 'react';
import { commentApiService } from '../../services/commentApi';

interface UseToggleCommentLikeReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  toggleCommentLike: (
    commentId: string
  ) => Promise<{ isLiked: boolean; likeCount: number } | null>;
  clearError: () => void;
}

export const useToggleCommentLike = (): UseToggleCommentLikeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 댓글 좋아요 토글 함수
  const toggleCommentLike = async (
    commentId: string
  ): Promise<{ isLiked: boolean; likeCount: number } | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await commentApiService.toggleCommentLike(commentId);

      return {
        isLiked: response.isLiked,
        likeCount: response.likeCount,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '댓글 좋아요 처리에 실패했습니다.';
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
    toggleCommentLike,
    clearError,
  };
};
