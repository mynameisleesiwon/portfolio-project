import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 타입 정의
type ThemeState = {
  isDarkMode: boolean; // 다크 모드 상태를 저장하는 변수
  toggleDarkMode: () => void; // 다크 모드 토글 함수
  setDarkMode: (isDark: boolean) => void; // 다크 모드 직접 설정 함수
};

// 스토어 생성
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // 초기 상태: HTML에 'dark' 클래스가 있는지 확인
      isDarkMode: document.documentElement.classList.contains('dark'),

      // 다크 모드 토글 함수
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newDarkMode };
        }),

      // 다크 모드 직접 설정 함수
      setDarkMode: (isDark) =>
        set(() => {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: isDark };
        }),
    }),
    { name: 'theme-storage' }
  )
);
