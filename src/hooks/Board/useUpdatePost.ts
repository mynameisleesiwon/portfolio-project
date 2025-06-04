import { boardApi } from '../../services/boardApi';
import type { PostCreateData } from '../../types';

interface UseUpdatePostReturn {
  // 액션
  updatePost: (id: number, data: PostCreateData) => Promise<boolean>;
}

export const useUpdatePost = (): UseUpdatePostReturn => {
  // 게시글 수정 함수
  const updatePost = async (
    id: number,
    data: PostCreateData
  ): Promise<boolean> => {
    try {
      // api 호출
      await boardApi.updatePost(id, data);

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 수정에 실패했습니다.';

      alert(`${errorMessage}`);

      return false;
    }
  };

  return {
    // 액션
    updatePost,
  };
};
