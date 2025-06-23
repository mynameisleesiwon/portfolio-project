import axios from 'axios';
import type { SignUpRequest, SignInRequest, AuthResponse } from '../types';

// axios 인스턴스 생성
const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000', // 환경변수에서 백엔드 URL 가져오기
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API 클래스
export const authApiService = {
  // 회원가입 API
  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 로그인 API
  async signIn(userData: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/signin', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '로그인 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },
};

export default authApi;
