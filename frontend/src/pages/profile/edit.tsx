import { useAuth } from '../../hooks/Auth/useAuth';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, User, Undo2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import { authApiService } from '../../services/authApi';
import type { UpdateProfileRequest } from '../../types';

const ProfileEdit = () => {
  const { user, getProfile, updateProfile, checkNickname } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  // 폼 상태
  const [formData, setFormData] = useState({
    nickname: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // SignUpForm과 동일한 변수명 사용
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

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

  // 사용자 정보가 로드되면 폼 초기화
  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
      });
      setOriginalImage(user.profileImage || null);
      setProfileImageFile(null);
      setProfileImagePreview('');
      setHasImageChanged(false);
      setIsImageDeleted(false);
    }
  }, [user]);

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file); // File 객체 저장
      setProfileImagePreview(URL.createObjectURL(file)); // 미리보기용 URL
      setHasImageChanged(true);
      setIsImageDeleted(false);
    }
  };

  // 원래 이미지로 되돌리기
  const handleRestoreImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview('');
    setHasImageChanged(false);
    setIsImageDeleted(false);
  };

  // 프로필 이미지 삭제 (미리보기만)
  const handleDeleteImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview('');
    setHasImageChanged(true);
    setIsImageDeleted(true);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.nickname !== user?.nickname) {
        const nicknameCheck = await checkNickname(formData.nickname);
        if (!nicknameCheck.isAvailable) {
          addToast('error', nicknameCheck.message);
          return;
        }
      }

      const updateData: UpdateProfileRequest = {
        nickname: formData.nickname,
      };

      if (isImageDeleted) {
        updateData.profileImage = null;
      } else if (profileImageFile) {
        // 새 이미지 업로드
        const profileImageUrl = await authApiService.uploadProfileImage(
          profileImageFile
        );
        updateData.profileImage = profileImageUrl;
      }

      await updateProfile(updateData);
      navigate('/profile');
    } catch (error) {
      // 에러는 updateProfile에서 이미 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full px-4 py-6 min-h-[calc(100vh-200px)] grid items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            프로필 수정
          </h1>
          <p className="text-text-muted">프로필 정보를 수정하세요</p>
        </div>

        {/* 수정 폼 */}
        <div className="bg-gradient-to-br from-card to-card-hover border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 프로필 이미지 */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={
                    isImageDeleted
                      ? '/default-profile.png'
                      : profileImagePreview ||
                        originalImage ||
                        '/default-profile.png'
                  }
                  alt="프로필"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-xl"
                />
                <label className="absolute -bottom-2 -right-2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover transition-colors cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                {hasImageChanged && (
                  <button
                    type="button"
                    onClick={handleRestoreImage}
                    className="flex items-center gap-1 px-3 py-1 border border-border bg-card text-text rounded-lg text-sm font-medium hover:bg-card-hover transition-colors"
                  >
                    <Undo2 className="w-4 h-4" />
                    원래대로
                  </button>
                )}
                {(originalImage || profileImagePreview) && !isImageDeleted && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="flex items-center gap-1 px-3 py-1 border border-border bg-card text-text rounded-lg text-sm font-medium hover:bg-card-hover transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    사진 삭제
                  </button>
                )}
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-text mb-2"
              >
                닉네임
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nickname: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-bg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-border text-text rounded-xl hover:bg-bg transition-all duration-200 font-medium"
              >
                <X className="w-5 h-5" />
                취소
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isLoading ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileEdit;
