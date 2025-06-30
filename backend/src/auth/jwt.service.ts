import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { JwtPayload, TokenType } from 'src/types';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) {}

  // Access Token 생성 (짧은 만료 시간)
  generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      userId: user.userId,
      type: 'access', // 토큰 타입 구분
    };

    return this.jwtService.sign(payload, { expiresIn: '15m' }); // 15분
  }

  // Refresh Token 생성 (긴 만료 시간)
  generateRefreshToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      userId: user.userId,
      type: 'refresh', // 토큰 타입 구분
    };

    return this.jwtService.sign(payload, { expiresIn: '7d' }); // 7일
  }

  // JWT 토큰 검증
  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }

  // 토큰 타입 확인
  getTokenType(token: string): TokenType | null {
    try {
      const decoded = this.jwtService.verify(token) as JwtPayload;
      return decoded.type || null;
    } catch {
      return null;
    }
  }
}
