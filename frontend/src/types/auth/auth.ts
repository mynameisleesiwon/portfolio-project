// 회원가입 요청 데이터 타입
export interface SignUpRequest {
  userId: string;
  password: string;
  nickname: string;
  profileImage?: string | null | File;
}

// 로그인 요청 데이터 타입
export interface SignInRequest {
  userId: string;
  password: string;
}

// 사용자 정보 응답 타입 (비밀번호 제외)
export interface User {
  id: number;
  userId: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: string | null; // 프로필 이미지 URL (nullable)
}

// API 응답 타입
export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string; // Access Token
  refreshToken: string; // Refresh Token
}

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenResponse {
  message: string;
  accessToken: string;
  user: User;
}

// 보호된 API 응답 타입 (프로필 조회용)
export interface ProfileResponse {
  message: string;
  user: User;
}

// 에러 응답 타입
export interface AuthError {
  message: string;
  statusCode?: number;
}

// 회원 탈퇴 응답 타입
export interface DeleteAccountResponse {
  message: string;
}
