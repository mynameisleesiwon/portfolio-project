// 회원가입 요청 데이터 타입
export interface SignUpRequest {
  userId: string;
  password: string;
  nickname: string;
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
}

// API 응답 타입
export interface AuthResponse {
  message: string;
  user: User;
}

// 에러 응답 타입
export interface AuthError {
  message: string;
  statusCode?: number;
}
