import { useState } from 'react';
import { boardApi } from '../../services/boardApi';
import type { PostCreateData } from '../../types';

interface UseUpdatePostReturn {
  // 액션
  updatePost: (id: string, data: PostCreateData) => Promise<boolean>;
  // 상태
  isLoading: boolean;
}

export const useUpdatePost = (): UseUpdatePostReturn => {
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 수정 함수
  const updatePost = async (
    id: string,
    data: PostCreateData
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // api 호출

      await boardApi.updatePost(id, { ...data, id });
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 수정에 실패했습니다.';
      alert(`${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // 액션
    updatePost,
    // 상태
    isLoading,
  };
};
