import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileImageService } from './profile-image.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티를 다루는 리포지토리
    private jwtService: JwtService,
    private profileImageService: ProfileImageService,
  ) {}

  // 회원가입 메서드
  async signUp(signUpDto: SignUpDto) {
    const { userId, password, nickname, profileImage } = signUpDto;

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
      profileImage: profileImage ?? null, // 프로필 이미지가 없으면 null로 저장
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

  // 사용자 정보 조회
  async findUserById(id: number): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'userId',
        'nickname',
        'profileImage',
        'createdAt',
        'updatedAt',
      ],
    });
    return user;
  }

  // 프로필 업데이트 메서드
  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const { nickname, profileImage } = updateProfileDto;

    // 사용자 찾기
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 닉네임 중복 검사 (자신의 닉네임이 아닌 경우)
    if (nickname !== user.nickname) {
      const existingNickname = await this.userRepository.findOne({
        where: { nickname },
      });

      if (existingNickname) {
        throw new ConflictException('이미 사용 중인 닉네임입니다.');
      }
    }

    // 프로필 이미지 처리 로직
    if (profileImage === null && user.profileImage) {
      // 사진 삭제 요청: 기존 이미지 파일 삭제 후 null로 설정
      await this.profileImageService.deleteImage(user.profileImage);
      user.profileImage = null;
    } else if (profileImage && profileImage !== user.profileImage) {
      // 새 이미지 업로드: 기존 이미지 파일 삭제 후 새 이미지로 설정
      if (user.profileImage) {
        await this.profileImageService.deleteImage(user.profileImage);
      }
      user.profileImage = profileImage;
    }
    // profileImage가 undefined면 기존 이미지 유지 (닉네임만 변경하는 경우)

    // 프로필 업데이트
    user.nickname = nickname;

    const updatedUser = await this.userRepository.save(user);

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...result } = updatedUser;

    return {
      user: result,
    };
  }

  // 닉네임 중복 검사 메서드
  async checkNicknameAvailability(nickname: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { nickname },
    });

    return !existingUser; // 사용자가 없으면 true (사용 가능)
  }

  // 회원 탈퇴 메서드
  async deleteAccount(userId: number, password: string) {
    // 사용자 찾기
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }

    // 프로필 이미지가 있으면 삭제
    if (user.profileImage) {
      await this.profileImageService.deleteImage(user.profileImage);
    }

    // 사용자 데이터 삭제
    await this.userRepository.remove(user);

    return {
      message: '회원 탈퇴가 성공적으로 완료되었습니다.',
    };
  }
}
