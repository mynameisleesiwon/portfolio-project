import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  // 상태
  user: User | null;
  accessToken: string | null; // Access Token만 메모리에 저장
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, accessToken: string) => void; // Refresh Token은 쿠키에서 관리
  logout: () => void;
  clearError: () => void;
  updateAccessToken: (accessToken: string) => void;
  updateUser: (user: User) => void;
  shouldRedirect: boolean;
  setShouldRedirect: (should: boolean) => void;
}

// Auth 상태 관리 스토어
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      accessToken: null, // 메모리에만 저장
      isAuthenticated: false,
      isLoading: false,
      error: null,
      shouldRedirect: false,

      // 로딩 상태 설정
      setLoading: (isLoading) => set({ isLoading }),

      // 에러 설정
      setError: (error) => set({ error }),

      // 로그인 (Access Token만 저장)
      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
          error: null,
        }),

      // 로그아웃
      logout: () =>
        set({
          user: null,
          accessToken: null,
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
      name: 'auth-storage',
      partialize: (state) => ({
        // localStorage에 저장할 상태만 선택 (Access Token 제외)
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // accessToken은 localStorage에 저장하지 않음 (메모리만)
      }),
    }
  )
);
