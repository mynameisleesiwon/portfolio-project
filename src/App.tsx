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

function App() {
  const location = useLocation();

  return (
    <div
      className=" bg-bg text-text flex flex-col"
      style={{ minHeight: '100dvh' }}
    >
      {/* 헤더 */}
      <Header />

      {/* 메인 */}
      <main className="container mx-auto flex-grow flex justify-center">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* 홈 */}
            <Route path="/" element={<Home />} />
            {/* 기능 모음 */}
            <Route path="/tech-demo" element={<TechDemo />} />
            {/* 게시판 */}
            <Route path="/tech-demo/board" element={<BoardDemo />} />
            <Route path="/tech-demo/board/create" element={<BoardCreate />} />
            <Route path="/tech-demo/board/edit/:id" element={<BoardEdit />} />
            <Route path="/tech-demo/board/:id" element={<BoardDetail />} />
            {/* 슬라이더 */}
            <Route path="/tech-demo/slider" element={<SliderDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}

export default App;
