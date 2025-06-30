// JWT 토큰 페이로드 타입 정의
export interface JwtPayload {
  sub: number; // 사용자 ID
  userId: string; // 로그인용 사용자 ID
  type: 'access' | 'refresh'; // 토큰 타입
  iat?: number; // 발급 시간 (JWT 표준)
  exp?: number; // 만료 시간 (JWT 표준)
}

// JWT 토큰 타입
export type TokenType = 'access' | 'refresh';

// JWT 검증된 사용자 정보 타입
export interface JwtUser {
  id: number;
  userId: string;
}
