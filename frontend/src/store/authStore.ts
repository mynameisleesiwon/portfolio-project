import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  // 상태
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User) => void;
  logout: () => void;
  clearError: () => void;
}

// Auth 상태 관리 스토어
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 사용자 설정
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      // 로딩 상태 설정
      setLoading: (isLoading) => set({ isLoading }),

      // 에러 설정
      setError: (error) => set({ error }),

      // 로그인
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          error: null,
        }),

      // 로그아웃
      logout: () =>
        set({
          user: null,
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
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
