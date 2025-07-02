import { useState } from 'react';
import { feedApiService } from '../../services/feedApi';
import { useToastStore } from '../../store/toastStore';

interface UseCreateFeedReturn {
  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  createFeed: (content: string) => Promise<boolean>;
  clearError: () => void;
}

export const useCreateFeed = (): UseCreateFeedReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastStore();

  // 피드 생성 함수
  const createFeed = async (content: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await feedApiService.createFeed(content);

      addToast('success', '피드가 성공적으로 작성되었습니다!');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '피드 작성에 실패했습니다.';
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
    createFeed,
    clearError,
  };
};
