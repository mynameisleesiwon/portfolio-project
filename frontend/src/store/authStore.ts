import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  // 상태
  user: User | null;
  accessToken: string | null; // Access Token
  refreshToken: string | null; // Refresh Token
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void; // 두 토큰 모두 받기
  logout: () => void;
  clearError: () => void;
  updateAccessToken: (accessToken: string) => void; // Access Token만 업데이트
  updateUser: (user: User) => void; // 사용자 정보만 업데이트
  shouldRedirect: boolean;
  setShouldRedirect: (should: boolean) => void;
}

// Auth 상태 관리 스토어
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      shouldRedirect: false,

      // 로딩 상태 설정
      setLoading: (isLoading) => set({ isLoading }),

      // 에러 설정
      setError: (error) => set({ error }),

      // 로그인 (토큰 포함)
      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          error: null,
        }),

      // 로그아웃
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
          shouldRedirect: false,
        }),

      // Access Token만 업데이트 (토큰 갱신 시 사용)
      updateAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

      // 사용자 정보만 업데이트 (프로필 업데이트 시 사용)
      updateUser: (user) =>
        set({
          user,
        }),

      // 에러 초기화
      clearError: () => set({ error: null }),

      // 리다이렉트 설정
      setShouldRedirect: (should) => set({ shouldRedirect: should }),
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        // localStorage에 저장할 상태만 선택
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken, // Refresh Token도 저장
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
