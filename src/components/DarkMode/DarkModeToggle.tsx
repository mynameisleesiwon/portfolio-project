import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors hover:bg-card-hover"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-yellow-300"></SunIcon>
      ) : (
        <MoonIcon className="h-5 w-5"></MoonIcon>
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
