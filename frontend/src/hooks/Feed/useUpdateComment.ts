import { useState } from 'react';
import { commentApiService } from '../../services/commentApi';
import { useToastStore } from '../../store/toastStore';

interface UseUpdateCommentReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  updateComment: (id: string, content: string) => Promise<boolean>;
  clearError: () => void;
}

export const useUpdateComment = (): UseUpdateCommentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  // 댓글 수정 함수
  const updateComment = async (
    id: string,
    content: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await commentApiService.updateComment(id, content);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '댓글 수정에 실패했습니다.';
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
    updateComment,
    clearError,
  };
};
