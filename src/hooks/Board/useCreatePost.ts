import { useState } from 'react';
import type { PostCreateData } from '../../types';
import { boardApi } from '../../services/boardApi';

interface UseCreatePostReturn {
  // 액션
  createPost: (data: PostCreateData) => Promise<boolean>;
  // 상태
  isLoading: boolean;
}

export const useCreatePost = (): UseCreatePostReturn => {
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 작성 함수
  const createPost = async (data: PostCreateData): Promise<boolean> => {
    try {
      setIsLoading(true);
      // api 호출
      await boardApi.createPost(data);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 작성에 실패했습니다.';
      // 사용자에게 에러 알림
      alert(`${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // 액션
    createPost,
    // 상태
    isLoading,
  };
};
