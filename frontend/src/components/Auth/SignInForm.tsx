import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/Auth/useAuth';
import type { SignInRequest } from '../../types';

const SignInForm = () => {
  // useAuth 훅 사용
  const { signIn, isLoading } = useAuth();

  // 폼 상태 관리
  const [formData, setFormData] = useState<SignInRequest>({
    userId: '',
    password: '',
  });

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 표시/숨김 토글 핸들러
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(formData);
    } catch (error) {
      // 에러는 useAuth에서 처리됨
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
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
            placeholder="사용자 ID를 입력하세요"
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-text-muted mt-1">테스트 계정 ID: test</p>
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text mb-2"
        >
          비밀번호
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
            onClick={togglePasswordVisibility}
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
        <p className="text-xs text-text-muted mt-1">
          테스트 계정 PW: test123!@#
        </p>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>로그인 중...</span>
          </>
        ) : (
          '로그인'
        )}
      </button>
    </motion.form>
  );
};

export default SignInForm;
