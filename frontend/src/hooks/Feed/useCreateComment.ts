import { useState } from 'react';
import { commentApiService } from '../../services/commentApi';
import { useToastStore } from '../../store/toastStore';

interface UseCreateCommentReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  createComment: (content: string, feedId: string) => Promise<boolean>;
  clearError: () => void;
}

export const useCreateComment = (): UseCreateCommentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  // 댓글 생성 함수
  const createComment = async (
    content: string,
    feedId: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await commentApiService.createComment(content, feedId);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '댓글 작성에 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      return false;
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
    createComment,
    clearError,
  };
};
