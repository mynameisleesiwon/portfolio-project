import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import TechDemo from './pages/TechDemo';
import NotFound from './pages/NotFound';
import Header from './common/Layout/Header';
import Footer from './common/Layout/Footer';
import BoardCreate from './pages/demos/\bBoard/BoardCreate';
import BoardEdit from './pages/demos/\bBoard/BoardEdit';
import BoardDetail from './pages/demos/\bBoard/BoardDetail';
import BoardDemo from './pages/demos/\bBoard/BoardDemo';
import SliderDemo from './pages/demos/Slider/SliderDemo';
import SystemThemeDetector from './components/DarkMode/SystemThemeDetector';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ToastContainer from './common/components/ToastContainer';
import { useToastStore } from './store/toastStore';
import ProtectedRoute from './common/components/ProtectedRoute';
import Profile from './pages/profile';
import ProfileEdit from './pages/profile/edit';

function App() {
  const location = useLocation();

  // Auth 페이지인지 확인 (로그인/회원가입 페이지)
  const isAuthPage = location.pathname.startsWith('/auth');

  const { toasts, removeToast } = useToastStore();

  return (
    <div
      className=" bg-bg text-text flex flex-col"
      style={{ minHeight: '100dvh' }}
    >
      {/* 토스트 컨테이너 추가 */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* 시스템 테마 감지 */}
      <SystemThemeDetector />

      {/* 헤더 - Auth 페이지가 아닐 때만 표시 */}
      {!isAuthPage && <Header />}

      {/* 메인 */}
      <main className="container mx-auto flex-grow flex justify-center">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* 홈 */}
            <Route path="/" element={<Home />} />
            {/* 기능 모음 */}
            <Route path="/tech-demo" element={<TechDemo />} />
            {/* 인증 */}
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            {/* 보호된 페이지 : 프로필 수정  */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            {/* 게시판 */}
            <Route path="/tech-demo/board" element={<BoardDemo />} />
            <Route path="/tech-demo/board/create" element={<BoardCreate />} />
            <Route path="/tech-demo/board/edit/:id" element={<BoardEdit />} />
            <Route path="/tech-demo/board/:id" element={<BoardDetail />} />
            {/* 슬라이더 */}
            <Route path="/tech-demo/slider" element={<SliderDemo />} />
            {/* 404페이지 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 푸터 - Auth 페이지가 아닐 때만 표시 */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
