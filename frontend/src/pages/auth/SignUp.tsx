import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/Auth/SignUpForm';

const SignUp = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/');
  };

  return (
    <div
      className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ minHeight: 'calc(100dvh - 100px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* SIWON 로고 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="text-4xl font-bold text-primary cursor-pointer inline-block hover:text-primary-hover transition-colors"
            onClick={handleLogo}
          >
            SIWON
          </div>
        </motion.div>

        {/* 회원가입 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8 shadow-lg backdrop-blur-sm"
        >
          {/* 제목 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text mb-2">회원가입</h2>
            <p className="text-sm text-text-muted">새로운 계정을 만드세요</p>
          </div>

          {/* 회원가입 폼 */}
          <SignUpForm />
        </motion.div>

        {/* 로그인 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-text-muted">
            이미 계정이 있으신가요?{' '}
            <Link
              to="/auth/signin"
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              로그인
            </Link>
          </p>
        </motion.div>

        {/* 홈으로 돌아가기 링크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
          >
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
