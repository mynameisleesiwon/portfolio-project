import { useEffect, useState } from 'react';
import type { Post } from '../../types';
import { boardApi } from '../../services/boardApi';

interface UsePostDetailReturn {
  // 데이터
  post: Post | null;

  // 상태
  error: string | null;

  // 액션
  refetch: () => void;
  deletePost: () => Promise<boolean>;
}

export const usePostDetail = (postId: string): UsePostDetailReturn => {
  // 상태관리
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 게시글 데이터 가져오기 함수
  const fetchPost = async () => {
    if (!postId) {
      setError('잘못된 게시글 ID입니다.');
      return;
    }

    try {
      setError(null);
      // 게시글 조회
      const postData = await boardApi.getPost(postId);
      setPost(postData);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '게시글을 불러오는데 실패했습니다.';
      setError(errorMessage);
      setPost(null);
    }
  };

  // 게시글 삭제 함수
  const deletePost = async (): Promise<boolean> => {
    if (!post) {
      console.error('삭제할 게시글이 없습니다.');
      return false;
    }

    try {
      await boardApi.deletePost(String(post.id));

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.';
      setError(errorMessage);
      return false;
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  // 컴포넌트에서 사용할 것들 반환
  return {
    // 데이터
    post,

    // 상태
    error,

    // 액션
    refetch: fetchPost,
    deletePost,
  };
};
