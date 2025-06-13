import { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

const SystemThemeDetector = () => {
  const { setDarkMode } = useThemeStore();

  useEffect(() => {
    // 저장된 사용자 설정이 없을 때만 시스템 설정 적용
    const savedTheme = localStorage.getItem('theme-storage');
    if (!savedTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(mediaQuery.matches);

      // 시스템 테마 변경 감지 (저장된 설정이 없을 때만)
      const handleChange = (event: MediaQueryListEvent) => {
        setDarkMode(event.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [setDarkMode]);

  return null;
};

export default SystemThemeDetector;
