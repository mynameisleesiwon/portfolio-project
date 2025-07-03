import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { authApiService } from '../services/authApi';

export const createApiClient = (
  baseURL: string,
  options: {
    requireAuth?: boolean;
    timeout?: number;
  } = {}
) => {
  const { requireAuth = true, timeout = 10000 } = options;

  // axios 인스턴스 생성
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰이 필요한 경우에만 인터셉터 설정
  if (requireAuth) {
    // 요청 인터셉터 - 토큰 자동 첨부
    client.interceptors.request.use(
      (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터 - 토큰 만료 시 자동 갱신
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = useAuthStore.getState().refreshToken;
            if (refreshToken) {
              const response = await authApiService.refreshToken(refreshToken);
              useAuthStore.getState().updateAccessToken(response.accessToken);

              // 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
              return client(originalRequest);
            }
          } catch (refreshError) {
            // refresh token도 만료된 경우 로그아웃 처리
            useAuthStore.getState().logout();

            // 리다이렉트 플래그 설정
            useAuthStore.getState().setShouldRedirect(true);

            throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return client;
};
