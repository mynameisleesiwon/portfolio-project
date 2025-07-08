import axios from 'axios';
import type {
  CreateFeedResponse,
  DeleteFeedResponse,
  FeedsResponse,
  LikeCountResponse,
  ToggleLikeResponse,
  UpdateFeedResponse,
} from '../types';
import { createApiClient } from '../utils/apiClient';

// 토큰이 필요한 API용 클라이언트 (모든 피드 API에 인증 필요)
const privateFeedApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: true }
);

// Feed API 클래스
export const feedApiService = {
  // 피드 목록 조회 API
  async getFeeds(): Promise<FeedsResponse> {
    try {
      const response = await privateFeedApi.get('/feeds');
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

  // 좋아요 토글 API
  async toggleLike(feedId: string): Promise<ToggleLikeResponse> {
    try {
      const response = await privateFeedApi.post(`/feeds/${feedId}/like`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '좋아요 처리 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 좋아요 수 조회 API
  async getLikeCount(feedId: string): Promise<LikeCountResponse> {
    try {
      const response = await privateFeedApi.get(`/feeds/${feedId}/like-count`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '좋아요 수 조회 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },
};
