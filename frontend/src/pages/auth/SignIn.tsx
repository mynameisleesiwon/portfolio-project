import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SignInForm from '../../components/Auth/SignInForm';

const SignIn = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* 제목 */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            계정에 로그인하세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <SignInForm />

        {/* 회원가입 링크 */}
        <div className="text-center">
          <p className="text-sm text-text-muted">
            계정이 없으신가요?{' '}
            <Link
              to="/auth/signup"
              className="text-primary hover:text-primary-hover font-medium"
            >
              회원가입
            </Link>
          </p>
        </div>

        {/* 홈으로 돌아가기 링크 */}
        <div className="text-center">
          <Link
            to="/"
            className="text-primary hover:text-primary-hover font-medium text-sm"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
