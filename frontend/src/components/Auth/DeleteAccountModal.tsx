import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { authApiService } from '../../services/authApi';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const { logout } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (confirmText !== '탈퇴') {
      addToast('error', '정확히 "탈퇴"를 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      addToast('error', '비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await authApiService.deleteAccount(password);
      addToast('success', '회원 탈퇴가 완료되었습니다.');
      logout();
      navigate('/');
    } catch (error) {
      addToast(
        'error',
        error instanceof Error
          ? error.message
          : '회원 탈퇴 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setPassword('');
      setConfirmText('');
      setShowPassword(false);
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-text">회원 탈퇴</h2>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 hover:bg-bg rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 경고 메시지 */}
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며, 복구할 수
                없습니다. 정말로 탈퇴하시겠습니까?
              </p>
            </div>

            {/* 비밀번호 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="현재 비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-bg rounded-md transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-text-muted" />
                  ) : (
                    <Eye className="w-4 h-4 text-text-muted" />
                  )}
                </button>
              </div>
            </div>

            {/* 최종 확인 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">
                최종 확인
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                placeholder="탈퇴를 입력하세요"
              />
              <p className="text-xs text-text-muted mt-1">
                정확히 "탈퇴"를 입력해주세요.
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-text hover:bg-bg transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={
                  isLoading || !password.trim() || confirmText !== '탈퇴'
                }
                className="flex-1 px-4 py-3 bg-text-muted/10 hover:bg-text-muted/20 text-text-muted border border-border hover:border-text-muted/30 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? '처리 중...' : '탈퇴하기'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
