import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JWT 인증 가드 - JWT 전략을 사용해서 요청을 보호하는 역할
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // AuthGuard('jwt')를 상속받아 JWT 전략을 사용하는 가드 생성
}
