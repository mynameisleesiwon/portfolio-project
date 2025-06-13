// 게시글 타입 정의
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  category: string;
}

// 카테고리 타입 정의
export interface Category {
  id: number;
  name: string;
}

// URL 검색 파라미터
export interface UrlSearchParams {
  page: number;
  category: string;
  keyword: string;
  searchType: 'title' | 'content' | 'author';
}

// 게시글 검색 파라미터
export interface PostSearchParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  q?: string;
  category?: string;
  title_like?: string;
  content_like?: string;
  author_like?: string;
}

// 페이지네이션 정보
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 게시글 작성 타입
export interface PostCreateData
  extends Omit<Post, 'id' | 'createdAt' | 'views'> {}

// 게시글 수정 타입
export interface PostUpdateData extends Omit<Post, 'createdAt' | 'views'> {}
