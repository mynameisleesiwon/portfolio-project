import { useSearchParams } from 'react-router-dom';
import type { PostSearchParams, UrlSearchParams } from '../../types';

export const useUrlParams = () => {
  // React Router의 URL 파라미터 관리 훅
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 값 읽어오기
  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || '';
  const keyword = searchParams.get('keyword') || '';
  const searchType =
    (searchParams.get('searchType') as 'title' | 'content' | 'author') ||
    'title';

  // 현재 URL 파라미터들을 객체로 정리
  const urlParams: UrlSearchParams = {
    page,
    category,
    keyword,
    searchType,
  };

  // URL 파라미터 업데이트 함수
  const setUrlParams = (newParams: Partial<UrlSearchParams>) => {
    // 현재 URL 파라미터들을 복사
    const currentParams = new URLSearchParams(searchParams);

    // 새로운 파라미터들을 하나씩 처리
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === '' || (key === 'page' && value === 1)) {
        // 빈 값이거나 페이지가 1이면 URL에서 제거
        currentParams.delete(key);
      } else {
        currentParams.set(key, String(value));
      }
    });

    // 검색이나 카테고리가 변경되면 페이지를 1로 리셋
    if (
      'keyword' in newParams ||
      'category' in newParams ||
      'searchType' in newParams
    ) {
      if (!('page' in newParams)) {
        currentParams.delete('page');
      }
    }

    // URL 업데이트
    setSearchParams(currentParams);
  };

  // URL 파라미터 초기화 함수
  const resetUrlParams = () => {
    setSearchParams({}); // 모든 파라미터 삭제
  };

  // API 호출용으로 변환
  const toApiParams = () => {
    const apiParams: PostSearchParams = {
      _page: page,
      _limit: 10,
      _sort: 'createdAt',
      _order: 'desc',
    };

    // 카테고리가 있으면 추가
    if (category) {
      apiParams.category = category;
    }

    // 검색어가 있으면 검색 타입에 따라 추가
    if (keyword) {
      if (searchType === 'title') {
        apiParams.title_like = keyword; // 제목 검색
      } else if (searchType === 'content') {
        apiParams.content_like = keyword; // 내용 검색
      } else if (searchType === 'author') {
        apiParams.author_like = keyword; // 작성자 검색
      }
    }

    return apiParams;
  };

  // 컴포넌트에서 사용할 것들 반환
  return {
    urlParams, // 현재 URL 파라미터들
    setUrlParams, // URL 파라미터 변경 함수
    resetUrlParams, // URL 파라미터 초기화 함수
    toApiParams, // API 호출용 파라미터
  };
};
