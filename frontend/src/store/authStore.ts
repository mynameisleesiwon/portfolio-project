import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  // 상태
  user: User | null;
  token: string | null; // 토큰 상태 추가
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, token: string) => void; // 토큰 파라미터 추가
  logout: () => void;
  clearError: () => void;
}

// Auth 상태 관리 스토어
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      token: null, // 토큰 초기 상태 추가
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 로딩 상태 설정
      setLoading: (isLoading) => set({ isLoading }),

      // 에러 설정
      setError: (error) => set({ error }),

      // 로그인 (토큰 포함)
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        }),

      // 로그아웃
      logout: () =>
        set({
          user: null,
          token: null, // 토큰도 제거
          isAuthenticated: false,
          error: null,
        }),

      // 에러 초기화
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        // localStorage에 저장할 상태만 선택
        user: state.user,
        token: state.token, // 토큰도 저장
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
