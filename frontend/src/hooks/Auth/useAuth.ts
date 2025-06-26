import { useAuthStore } from '../../store/authStore';
import type {
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  ProfileResponse,
  UpdateProfileRequest,
  CheckNicknameResponse,
} from '../../types';
import { authApiService } from '../../services/authApi';
import { useToastStore } from '../../store/toastStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      login(response.user, response.token); // Auth Store에 사용자 정보 저장, 토큰도 함께 저장
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
      login(response.user, response.token); // Auth Store에 사용자 정보 저장, 토큰도 함께 저장
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
    logout(); // Auth Store에서 로그아웃 처리 (토큰도 제거됨)
    addToast('success', '로그아웃되었습니다.');
    navigate('/');
  };

  // useAuth.ts - getProfile 함수 추가
  const getProfile = async (): Promise<ProfileResponse> => {
    try {
      const response = await authApiService.getProfile();
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 보호된 엔드포인트에서 401 = 토큰 만료
        logout();
        addToast('error', '토큰이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/auth/signin');
      } else {
        // 다른 에러 처리
        const errorMessage =
          error instanceof Error
            ? error.message
            : '프로필 조회에 실패했습니다.';
        setError(errorMessage);
        addToast('error', errorMessage);
      }
      throw error;
    }
  };

  // 프로필 업데이트 함수
  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApiService.updateProfile(data);

      // Zustand store 업데이트
      login(response.user, useAuthStore.getState().token!);

      addToast('success', '프로필이 성공적으로 업데이트되었습니다!');
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '프로필 업데이트에 실패했습니다.';
      setError(errorMessage);
      addToast('error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 닉네임 중복 검사 함수
  const checkNickname = async (
    nickname: string
  ): Promise<CheckNicknameResponse> => {
    try {
      const response = await authApiService.checkNickname(nickname);
      return response;
    } catch (error) {
      throw error;
    }
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
    getProfile,
    clearError,
    updateProfile,
    checkNickname,
  };
};
