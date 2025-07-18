import axios from 'axios';
import type { TMDBResponse } from '../types';
import { createApiClient } from '../utils/apiClient';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// axios 인스턴스 생성
const tmdb_api = createApiClient(API_BASE_URL, {
  requireAuth: false,
  withCredentials: false,
});

// TMDB API 클래스
export const sliderApi = {
  // 인기 영화 목록 조회
  async getPopularMovie(page: number = 1): Promise<TMDBResponse> {
    try {
      const response = await tmdb_api.get('/movie/popular', {
        params: {
          api_key: TMDB_API_KEY,
          page,
          language: 'ko-KR',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('인기 영화 목록을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },
};
