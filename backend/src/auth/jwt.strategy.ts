import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// JWT 전략 클래스 - JWT 토큰을 검증하고 사용자 정보를 추출하는 역할
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // 환경변수에서 JWT 비밀키 가져오기
    const jwtSecret = configService.get('JWT_SECRET');

    // JWT_SECRET이 설정되지 않았으면 에러 발생 (보안상 중요)
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Passport JWT 전략 설정
    super({
      // HTTP 요청에서 JWT 토큰을 추출하는 방법
      // Authorization: Bearer <token> 헤더에서 토큰 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 토큰 만료 시간 검증 여부 (false = 만료된 토큰 거부)
      ignoreExpiration: false,

      // JWT 토큰 서명 검증에 사용할 비밀키
      secretOrKey: jwtSecret,
    });
  }

  // JWT 토큰이 유효할 때 호출되는 메서드
  // payload: JWT 토큰을 디코딩한 페이로드 (사용자 정보 포함)
  async validate(payload: any) {
    // 토큰에서 추출한 사용자 정보를 반환
    // 이 정보는 요청 객체에 자동으로 추가됨 (req.user)
    return {
      id: payload.sub, // 사용자 ID (JWT 표준: sub)
      userId: payload.userId, // 로그인용 사용자 ID
    };
  }
}
