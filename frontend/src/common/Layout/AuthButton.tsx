import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';
import { LogIn, LogOut, User } from 'lucide-react';

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

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {/* 사용자 정보 표시 */}
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
          <img
            src={user?.profileImage || '/default-profile.png'}
            alt="프로필"
            className="w-6 h-6 rounded-full object-cover border border-primary"
          />
          <span className="truncate max-w-[80px]">{user?.nickname}</span>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted border border-border rounded-lg hover:bg-card-hover hover:text-text transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="로그아웃"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline">로그아웃</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAuthClick}
      className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="로그인"
    >
      <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span>로그인</span>
    </button>
  );
};

export default AuthButton;
