import axios from 'axios';
import type {
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  CheckNicknameResponse,
  DeleteAccountResponse,
  RefreshTokenResponse,
} from '../types';
import { createApiClient } from '../utils/apiClient';

// 토큰이 필요한 API용 클라이언트
const authApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: true }
);

// 토큰이 불필요한 API용 클라이언트 (회원가입, 로그인, 닉네임 체크 등)
const publicAuthApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: false }
);

// Auth API 클래스
export const authApiService = {
  // 회원가입 API
  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    try {
      const formData = new FormData();
      formData.append('userId', userData.userId);
      formData.append('password', userData.password);
      formData.append('nickname', userData.nickname);

      if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
      }

      const response = await publicAuthApi.post('/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      const response = await publicAuthApi.post('/auth/signin', userData);
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

  // 프로필 조회 API
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await authApi.get('/auth/profile');
      return response.data;
    } catch (error) {
      // 에러는 useAuth에서 처리하므로 여기서는 그대로 전달
      throw error;
    }
  },

  // 프로필 이미지 업로드 API
  async uploadProfileImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await publicAuthApi.post(
        '/auth/upload-profile-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '프로필 이미지 업로드 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 프로필 업데이트 API
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    try {
      const response = await authApi.put('/auth/update-profile', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '프로필 업데이트 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 닉네임 중복 검사 API
  async checkNickname(nickname: string): Promise<CheckNicknameResponse> {
    try {
      const response = await publicAuthApi.get(
        `/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '닉네임 중복 검사 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 회원 탈퇴 API
  async deleteAccount(password: string): Promise<DeleteAccountResponse> {
    try {
      const response = await authApi.delete('/auth/delete-account', {
        data: { password },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 토큰 갱신 API (쿠키에서 자동으로 Refresh Token 전송)
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const response = await publicAuthApi.post('/auth/refresh');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '토큰 갱신 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 로그아웃 API
  async logout(): Promise<{ message: string }> {
    try {
      const response = await authApi.post('/auth/logout');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '로그아웃 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },
};
