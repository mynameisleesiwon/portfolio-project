import { useState } from 'react';
import { commentApiService } from '../../services/commentApi';
import { useToastStore } from '../../store/toastStore';

interface UseDeleteCommentReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  deleteComment: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export const useDeleteComment = (): UseDeleteCommentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  // 댓글 삭제 함수
  const deleteComment = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await commentApiService.deleteComment(id);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '댓글 삭제에 실패했습니다.';
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
    deleteComment,
    clearError,
  };
};
