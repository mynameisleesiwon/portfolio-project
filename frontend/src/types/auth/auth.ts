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
  token: string; // 토큰 필드 추가
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
