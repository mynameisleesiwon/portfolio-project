import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

// 저장된 다크 모드 설정
const savedDarkMode = localStorage.getItem('theme-storage');
if (savedDarkMode) {
  try {
    const isDarkMode = JSON.parse(savedDarkMode).state.isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (error) {
    console.error('Failed to parse theme settings:', error);
  }
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
