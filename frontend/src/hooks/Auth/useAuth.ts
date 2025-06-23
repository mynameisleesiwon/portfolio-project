import { useAuthStore } from '../../store/authStore';
import type { SignUpRequest, SignInRequest, AuthResponse } from '../../types';
import { authApiService } from '../../services/authApi';
import { useToastStore } from '../../store/toastStore';
import { useNavigate } from 'react-router-dom';

// 인증 관련 커스텀 훅
export const useAuth = () => {
  const navigate = useNavigate();
  // Auth Store에서 상태와 액션 가져오기
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setLoading,
    setError,
    login,
    logout,
    clearError,
  } = useAuthStore();

  const { addToast } = useToastStore();

  // 회원가입 함수
  const signUp = async (userData: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response: AuthResponse = await authApiService.signUp(userData);
      login(response.user); // Auth Store에 사용자 정보 저장
      addToast('success', '회원가입에 성공했습니다!');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 로그인 함수
  const signIn = async (userData: SignInRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response: AuthResponse = await authApiService.signIn(userData);
      login(response.user); // Auth Store에 사용자 정보 저장
      addToast('success', '로그인에 성공했습니다!');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const signOut = () => {
    logout(); // Auth Store에서 로그아웃 처리
    addToast('success', '로그아웃되었습니다.');
    navigate('/');
  };

  return {
    // 데이터
    user,
    isAuthenticated,

    // 상태
    isLoading,
    error,

    // 액션
    signUp,
    signIn,
    signOut,
    clearError,
  };
};
