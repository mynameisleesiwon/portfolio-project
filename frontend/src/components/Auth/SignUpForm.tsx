import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Loader2, Eye, EyeOff, AtSign, Camera } from 'lucide-react';
import { useAuth } from '../../hooks/Auth/useAuth';
import type { SignUpRequest } from '../../types';
import { validatePassword } from '../../utils/password-validator';
import { useToastStore } from '../../store/toastStore';

const SignUpForm = () => {
  const { signUp, isLoading } = useAuth();
  const { addToast } = useToastStore();

  // 폼 상태 (텍스트 필드만)
  const [formData, setFormData] = useState<Omit<SignUpRequest, 'profileImage'>>(
    {
      userId: '',
      password: '',
      nickname: '',
    }
  );

  // 프로필 이미지 파일 및 미리보기
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  // 같은 이미지를 다시 선택할 때 onChange가 동작하도록
  // 파일 input의 value를 강제로 초기화(리셋)하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 정책 검증
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      // 에러 메시지를 토스트로 표시
      addToast('error', passwordValidation.errors.join(', '));
      return;
    }

    await signUp({
      ...formData,
      profileImage: profileImageFile || undefined, // File 객체 직접 전달
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* 프로필 이미지 업로드 (아바타) */}
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="profileImage"
          className="cursor-pointer relative group"
          title="프로필 이미지 변경"
        >
          <img
            src={profileImagePreview || '/default-profile.png'}
            alt="프로필 미리보기"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow transition-all group-hover:opacity-80"
          />
          {/* 카메라 아이콘 오버레이 */}
          <span className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 shadow group-hover:bg-primary-hover">
            <Camera className="w-4 h-4" />
          </span>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
            ref={fileInputRef}
          />
        </label>
        <span className="text-xs text-muted-foreground mt-2">
          프로필 이미지는 선택 사항입니다.
        </span>
        {/* 기본 이미지로 되돌리기 버튼 */}
        {profileImagePreview && (
          <button
            type="button"
            onClick={() => {
              setProfileImageFile(null);
              setProfileImagePreview('');
              // input value 리셋
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="mt-2 text-xs text-primary underline hover:text-primary-hover"
            disabled={isLoading}
          >
            기본 이미지로 되돌리기
          </button>
        )}
      </div>

      {/* 사용자 ID 입력 */}
      <div>
        <label
          htmlFor="userId"
          className="block text-sm font-medium text-text mb-2"
        >
          사용자 ID
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-card text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="사용자 ID를 입력하세요 (4-20자)"
            disabled={isLoading}
          />
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
          <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-card text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="닉네임을 입력하세요 (2-20자)"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label
          htmlFor="password"
          className="flex items-center text-sm font-medium text-text mb-2"
        >
          비밀번호
          <span className="text-xs text-muted-foreground font-normal ml-1">
            (8자 이상, 소문자+숫자+특수문자 포함)
          </span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-card text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="비밀번호를 입력하세요"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text transition-colors p-1 rounded-md hover:bg-border"
            disabled={isLoading}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>회원가입 중...</span>
          </>
        ) : (
          '회원가입'
        )}
      </button>
    </motion.form>
  );
};

export default SignUpForm;
