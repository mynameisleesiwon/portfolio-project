import { useEffect, useState } from 'react';
import type { Comment } from '../../types';
import { commentApiService } from '../../services/commentApi';
import { useToastStore } from '../../store/toastStore';

interface UseCommentsReturn {
  // 데이터
  comments: Comment[];

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  refetch: () => void;
}

export const useComments = (feedId: string): UseCommentsReturn => {
  // 상태 관리
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  // 데이터 가져오기 함수
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await commentApiService.getCommentsByFeedId(feedId);
      setComments(response.comments);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '댓글을 불러오는데 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // feedId가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    if (feedId) {
      fetchComments();
    }
  }, [feedId]);

  // 컴포넌트에서 사용할 것들 반환
  return {
    // 데이터
    comments,

    // 상태
    isLoading,
    error,

    // 액션
    refetch: fetchComments,
  };
};
