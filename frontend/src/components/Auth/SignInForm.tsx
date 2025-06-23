import { useState } from 'react';
import { motion } from 'framer-motion';
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

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-border rounded-md bg-card text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="사용자 ID를 입력하세요"
          disabled={isLoading}
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text mb-2"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-border rounded-md bg-card text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="비밀번호를 입력하세요"
          disabled={isLoading}
        />
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </motion.form>
  );
};

export default SignInForm;
