import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';

const AuthButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // 로그아웃
      signOut();
      navigate('/');
    } else {
      // 로그인 페이지로 이동
      navigate('/auth/signin');
    }
  };

  return (
    <button
      onClick={handleAuthClick}
      className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
    >
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span>{user?.nickname}</span>
          <span>로그아웃</span>
        </div>
      ) : (
        '로그인'
      )}
    </button>
  );
};

export default AuthButton;
