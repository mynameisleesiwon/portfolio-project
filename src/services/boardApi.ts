import axios from 'axios';
import {
  type Category,
  type Post,
  type PostCreateData,
  type PostSearchParams,
} from '../types';

// axios 인스턴스 생성
const board_api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/mynameisleesiwon/demo',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 게시글 API 클래스
export const boardApi = {
  // 게시글 목록 조회
  async getPosts(
    params: PostSearchParams = {}
  ): Promise<{ data: Post[]; totalCount: number }> {
    try {
      const response = await board_api.get('/posts', {
        params,
      });

      // 비구조화 할당으로 필터링만 남기기
      const { _page, _limit, _sort, _order, ...filterParams } = params;

      const countResponse = await board_api.get('/posts', {
        params: filterParams,
      });

      const totalCount = countResponse.data.length;

      return {
        data: response.data,
        totalCount,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('게시글 목록을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },

  // 카테고리 목록 조회
  async getCategories(): Promise<Category[]> {
    try {
      const response = await board_api.get('/categories');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('카테고리 목록을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },

  // 단일 게시글 조회
  async getPost(id: string): Promise<Post | null> {
    try {
      const response = await board_api.get(`/posts/${id}`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },

  // 게시글 삭제
  async deletePost(id: string): Promise<void> {
    try {
      await board_api.delete(`/posts/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('게시글 삭제에 실패했습니다.');
      }
      throw error;
    }
  },

  // 게시글 작성
  async createPost(data: PostCreateData): Promise<Post> {
    try {
      // 새 게시글 데이터 구성
      const newPost = {
        ...data,
        createdAt: new Date().toISOString(),
        views: 0,
      };

      const response = await board_api.post('/posts', newPost);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('게시글 작성에 실패했습니다.');
      }
      throw error;
    }
  },

  // 게시글 수정
  async updatePost(id: number, data: PostCreateData): Promise<Post> {
    try {
      const response = await board_api.patch(`/posts/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('수정하려는 게시글을 찾을 수 없습니다.');
        }
        throw new Error('게시글 수정에 실패했습니다.');
      }
      throw error;
    }
  },
};
