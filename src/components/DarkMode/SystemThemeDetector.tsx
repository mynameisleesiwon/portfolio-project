import { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

const SystemThemeDetector = () => {
  const { setDarkMode, themeSource } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // 시스템 설정 변경 감지
    const handleChange = (event: MediaQueryListEvent) => {
      // 시스템 설정으로 테마가 설정된 경우에만 반응
      if (themeSource === 'system') {
        setDarkMode(event.matches, 'system');
      }
    };

    // 초기 시스템 설정 적용 (시스템 설정으로 테마가 설정된 경우에만)
    if (themeSource === 'system') {
      setDarkMode(mediaQuery.matches, 'system');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setDarkMode, themeSource]);

  return null;
};

export default SystemThemeDetector;
