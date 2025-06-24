import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티를 다루는 리포지토리
    private jwtService: JwtService,
  ) {}

  // 회원가입 메서드
  async signUp(signUpDto: SignUpDto) {
    const { userId, password, nickname } = signUpDto;

    // 사용자 ID 중복 검사
    const existingUser = await this.userRepository.findOne({
      where: { userId },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 사용자 ID입니다.');
    }

    // 닉네임 중복 검사
    const existingNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (existingNickname) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    // 비밀번호 해시화 (보안을 위해 평문 비밀번호를 암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    const user = this.userRepository.create({
      userId,
      password: hashedPassword,
      nickname,
    });

    // 데이터베이스에 저장
    const savedUser = await this.userRepository.save(user);

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...result } = savedUser;

    // JWT 토큰 생성
    const token = this.jwtService.generateToken(savedUser);

    return {
      user: result,
      token,
    };
  }

  // 로그인 메서드
  async signIn(signInDto: SignInDto) {
    const { userId, password } = signInDto;

    // 사용자 찾기
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    // 사용자가 존재하지 않거나 비밀번호가 틀린 경우
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        '사용자 ID 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...result } = user;

    // JWT 토큰 생성
    const token = this.jwtService.generateToken(user);

    return {
      user: result,
      token,
    };
  }
}
