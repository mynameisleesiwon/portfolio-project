import { useEffect, useState } from 'react';
import type { Feed } from '../../types';
import { feedApiService } from '../../services/feedApi';
import { useToastStore } from '../../store/toastStore';

interface UseFeedsReturn {
  // 데이터
  feeds: Feed[];

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  refetch: () => void;
}

export const useFeeds = (): UseFeedsReturn => {
  // 상태 관리
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  // 데이터 가져오기 함수
  const fetchFeeds = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await feedApiService.getFeeds();
      setFeeds(response.feeds);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '피드를 불러오는데 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      setFeeds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchFeeds();
  }, []);

  // 컴포넌트에서 사용할 것들 반환
  return {
    // 데이터
    feeds,

    // 상태
    isLoading,
    error,

    // 액션
    refetch: fetchFeeds,
  };
};
