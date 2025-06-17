import type { PostCreateData } from '../../types';
import { boardApi } from '../../services/boardApi';

interface UseCreatePostReturn {
  // 액션
  createPost: (data: PostCreateData) => Promise<boolean>;
}

export const useCreatePost = (): UseCreatePostReturn => {
  // 게시글 작성 함수
  const createPost = async (data: PostCreateData): Promise<boolean> => {
    try {
      // api 호출
      await boardApi.createPost(data);

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 작성에 실패했습니다.';

      // 사용자에게 에러 알림
      alert(`${errorMessage}`);

      return false;
    }
  };

  return {
    // 액션
    createPost,
  };
};
