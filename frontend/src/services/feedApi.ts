import axios from 'axios';
import type {
  CreateFeedResponse,
  DeleteFeedResponse,
  FeedsResponse,
  UpdateFeedResponse,
} from '../types';
import { useAuthStore } from '../store/authStore';

// axios 인스턴스 생성
const feedApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 첨부
feedApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Feed API 클래스
export const feedApiService = {
  // 피드 목록 조회 API
  async getFeeds(): Promise<FeedsResponse> {
    try {
      const response = await feedApi.get('/feeds');
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
      const response = await feedApi.post('/feeds', { content });
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
      const response = await feedApi.put(`/feeds/${id}`, { content });
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
      const response = await feedApi.delete(`/feeds/${id}`);
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

export default feedApi;
