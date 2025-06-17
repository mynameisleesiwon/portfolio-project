import type { JSX } from 'react';

// 데모 카드 타입 정의
export interface DemoCardType {
  id: string;
  title: string;
  description: string;
  detailDescription: string;
  icon: JSX.Element;
  status: 'active' | 'coming-soon';
  techStack: string[];
  features: string[];
  route: string;
}

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

// 카테고리 타입 정의
export interface Category {
  id: number;
  name: string;
}

// 게시글 작성 타입
export interface PostCreateData
  extends Omit<Post, 'id' | 'createdAt' | 'views'> {}

// 게시글 수정 타입
export interface PostUpdateData extends Omit<Post, 'createdAt' | 'views'> {}

// TMDB API 관련 타입 정의
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export type MovieCategory =
  | 'popular'
  | 'now_playing'
  | 'upcoming'
  | 'top_rated';

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
