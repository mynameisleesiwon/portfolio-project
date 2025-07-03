import axios from 'axios';
import type {
  CreateFeedResponse,
  DeleteFeedResponse,
  FeedsResponse,
  UpdateFeedResponse,
} from '../types';
import { createApiClient } from '../utils/apiClient';

// 토큰이 불필요한 API용 클라이언트 (조회용)
const publicFeedApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: false }
);

// 토큰이 필요한 API용 클라이언트 (생성/수정/삭제용)
const privateFeedApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: true }
);

// Feed API 클래스
export const feedApiService = {
  // 피드 목록 조회 API
  async getFeeds(): Promise<FeedsResponse> {
    try {
      const response = await publicFeedApi.get('/feeds');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '피드 목록 조회 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 피드 생성 API
  async createFeed(content: string): Promise<CreateFeedResponse> {
    try {
      const response = await privateFeedApi.post('/feeds', { content });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '피드 작성 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 피드 수정 API
  async updateFeed(id: string, content: string): Promise<UpdateFeedResponse> {
    try {
      const response = await privateFeedApi.put(`/feeds/${id}`, { content });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '피드 수정 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 피드 삭제 API
  async deleteFeed(id: string): Promise<DeleteFeedResponse> {
    try {
      const response = await privateFeedApi.delete(`/feeds/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '피드 삭제 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },
};
