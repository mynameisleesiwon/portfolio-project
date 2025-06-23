import { useEffect, useState } from 'react';
import type { Post, PostSearchParams, UrlSearchParams } from '../../types';
import { boardApi } from '../../services/boardApi';

interface UsePostsReturn {
  // 데이터
  posts: Post[];
  totalPages: number;

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  refetch: () => void;
}

export const usePosts = (urlParams: UrlSearchParams): UsePostsReturn => {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 데이터 가져오기 함수
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // API 파라미터 생성
      const apiParams: PostSearchParams = {
        _page: urlParams.page,
        _limit: 10,
        _sort: 'createdAt',
        _order: 'desc',
      };

      // 카테고리 필터 추가
      if (urlParams.category) {
        apiParams.category = urlParams.category;
      }

      // 검색어 처리
      if (urlParams.keyword) {
        switch (urlParams.searchType) {
          case 'title':
            apiParams.title_like = urlParams.keyword;
            break;
          case 'content':
            apiParams.content_like = urlParams.keyword;
            break;
          case 'author':
            apiParams.author_like = urlParams.keyword;
            break;
        }
      }

      // 실제 API 호출
      const result = await boardApi.getPosts(apiParams);

      setPosts(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      setError('게시글을 불러오는데 실패했습니다.');

      setPosts([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  // URL 파라미터가 변경되면 자동으로 데이터 다시 가져오기
  useEffect(() => {
    fetchPosts();
  }, [
    urlParams.page,
    urlParams.category,
    urlParams.keyword,
    urlParams.searchType,
  ]);

  // 페이지 수 계산
  const totalPages = Math.ceil(totalCount / 10);

  // 컴포넌트에서 사용할 것들 반환
  return {
    // 데이터
    posts,
    totalPages,

    // 상태
    isLoading,
    error,

    // 액션
    refetch: fetchPosts,
  };
};
