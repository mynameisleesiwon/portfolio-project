import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-text">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-md mb-8 text-text-muted">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 bg-primary hover:bg-primary-hover"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
