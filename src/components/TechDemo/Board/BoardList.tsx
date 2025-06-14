import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../common/components/ErrorMessage';
import SearchBar from './SearchBar';
import type { Post } from '../../../types';
import BoardItem from './BoardItem';
import Pagination from '../../../common/components/Pagination';
import { useUrlParams } from '../../../hooks/Board/userUrlParams';
import { usePosts } from '../../../hooks/Board/usePosts';
import { useCategories } from '../../../hooks/Board/useCategories';
import LoadingSpinner from '../../../common/components/LoadingSpinner';

const BoardList = () => {
  const navigate = useNavigate();

  // URL 상태 관리
  const { urlParams, setUrlParams } = useUrlParams();

  // 게시글 데이터 관리 훅
  const {
    posts,
    totalPages,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePosts(urlParams);

  // 카테고리 데이터 관리 훅
  const { categories } = useCategories();

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrlParams({ category: e.target.value });
  };

  // 검색 핸들러
  const handleSearch = (
    keyword: string,
    searchType: 'title' | 'content' | 'author'
  ) => {
    setUrlParams({ keyword, searchType });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setUrlParams({ page });
  };

  // 새 글 작성 핸들러
  const handleCreatePost = () => {
    navigate('/tech-demo/board/create');
  };

  // 에러 표시
  if (postsError) {
    return (
      <ErrorMessage
        title="데이터를 불러올 수 없습니다"
        message="서버에 연결할 수 없거나 오류가 발생했습니다."
        onRetry={refetchPosts}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        {/* 필터 옵션 */}
        <div className="flex gap-2">
          <select
            value={urlParams.category}
            onChange={handleCategoryChange}
            className="px-3 py-2 rounded-lg border border-border bg-card text-text focus:outline-none focus:border-primary"
          >
            <option value="">모든 카테고리</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 게시글 목록 */}
        <div className="border-t border-border bg-card rounded-lg overflow-hidden">
          {postsLoading ? (
            // 로딩 상태 - 로딩 컴포넌트 표시
            <LoadingSpinner text="게시글을 불러오고 있어요..." />
          ) : posts.length > 0 ? (
            // 데이터 있음 - 게시글 목록 표시
            posts.map((post: Post, index: number) => (
              <BoardItem key={post.id} post={post} index={index} />
            ))
          ) : (
            // 데이터 없음 - 빈 상태 표시
            <div className="py-12 text-center text-text-muted">
              게시글이 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {!postsLoading && totalPages > 1 && (
          <Pagination
            currentPage={urlParams.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* 글쓰기 */}
        <div className="flex">
          <button
            onClick={handleCreatePost}
            className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            글쓰기
          </button>
        </div>

        {/* 검색 바 */}
        <SearchBar
          keyword={urlParams.keyword}
          searchType={urlParams.searchType}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default BoardList;
