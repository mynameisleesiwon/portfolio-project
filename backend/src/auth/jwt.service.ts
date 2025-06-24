import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) {}

  // 사용자의 정보를 받아서 JWT 토큰 생성
  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      userId: user.userId,
      nickname: user.nickname,
    };

    return this.jwtService.sign(payload);
  }

  // JWT 토큰 검증
  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
