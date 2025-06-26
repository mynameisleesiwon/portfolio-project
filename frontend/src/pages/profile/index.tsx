import { useAuth } from '../../hooks/Auth/useAuth';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, getProfile } = useAuth();
  const navigate = useNavigate();

  // 버튼 클릭 핸들러
  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangePassword = () => {
    navigate('/profile/password');
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // 페이지 로드 시 최신 프로필 정보 가져오기
    const fetchProfile = async () => {
      try {
        await getProfile();
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    };

    fetchProfile();
  }, [getProfile]);

  return (
    <div className="max-w-screen-lg mx-auto w-full px-4 py-6 min-h-[calc(100vh-200px)] grid items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* 프로필 카드 */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-card to-card-hover border border-border rounded-2xl p-8 shadow-lg">
            {/* 프로필 이미지 섹션 */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src={user?.profileImage || '/default-profile.png'}
                  alt="프로필"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-xl"
                />
              </div>
            </div>

            {/* 사용자 기본 정보 */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-2">
                {user?.nickname}
              </h2>
              <p className="text-lg text-text-muted mb-4">@{user?.userId}</p>

              {/* 가입일 정보 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg/50 border border-border rounded-full text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-text-muted">가입일:</span>
                <span className="font-medium text-text">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('ko-KR')
                    : '알 수 없음'}
                </span>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={handleEditProfile}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <Edit className="w-5 h-5" />
                프로필 수정
              </button>
              {/* <button
                onClick={handleChangePassword}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-secondary text-white rounded-xl hover:bg-secondary-hover transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <Settings className="w-5 h-5" />
                비밀번호 변경
              </button> */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
