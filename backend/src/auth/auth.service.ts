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
import { JwtPayload } from 'src/types';
import { File as MulterFile } from 'multer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티를 다루는 리포지토리
    private jwtService: JwtService,
    private profileImageService: ProfileImageService,
  ) {}

  // 회원가입 메서드
  async signUp(signUpDto: SignUpDto, profileImage?: MulterFile) {
    const { userId, password, nickname } = signUpDto;
    let uploadedImageUrl: string | null = null;

    try {
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

      // 비밀번호 정책 검증
      const passwordValidation = this.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new ConflictException(passwordValidation.errors.join(', '));
      }

      // 프로필 이미지 업로드 (있는 경우)
      if (profileImage) {
        uploadedImageUrl =
          await this.profileImageService.uploadImage(profileImage);
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 새 사용자 생성
      const user = this.userRepository.create({
        userId,
        password: hashedPassword,
        nickname,
        profileImage: uploadedImageUrl,
      });

      // 데이터베이스에 저장
      const savedUser = await this.userRepository.save(user);

      // 비밀번호를 제외한 사용자 정보 반환
      const { password: _, ...result } = savedUser;

      // Access Token과 Refresh Token 생성
      const accessToken = this.jwtService.generateAccessToken(savedUser);
      const refreshToken = this.jwtService.generateRefreshToken(savedUser);

      return {
        user: result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      // 회원가입 실패 시 업로드된 이미지 삭제
      if (uploadedImageUrl) {
        try {
          await this.profileImageService.deleteImage(uploadedImageUrl);
        } catch (deleteError) {
          console.error('이미지 삭제 실패:', deleteError);
        }
      }
      throw error;
    }
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

    // Access Token과 Refresh Token 생성
    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateRefreshToken(user);

    return {
      user: result,
      accessToken,
      refreshToken,
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

  // 비밀번호 정책 검증을 위한 private 메서드
  private validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // 최소 8자 이상
    if (password.length < 8) {
      errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
    }

    // 최대 128자 이하
    if (password.length > 128) {
      errors.push('비밀번호는 최대 128자까지 가능합니다.');
    }

    // 소문자 1개 이상 포함
    if (!/[a-z]/.test(password)) {
      errors.push('비밀번호는 소문자를 1개 이상 포함해야 합니다.');
    }

    // 숫자 1개 이상 포함
    if (!/\d/.test(password)) {
      errors.push('비밀번호는 숫자를 1개 이상 포함해야 합니다.');
    }

    // 특수문자 1개 이상 포함
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('비밀번호는 특수문자를 1개 이상 포함해야 합니다.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Refresh Token을 사용한 Access Token 갱신
  async refreshAccessToken(refreshToken: string) {
    try {
      // Refresh Token 검증
      const decoded: JwtPayload = this.jwtService.verifyToken(refreshToken);

      // 토큰 타입 확인
      const tokenType = this.jwtService.getTokenType(refreshToken);
      if (tokenType !== 'refresh') {
        throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
      }

      // 사용자 정보 조회 (완전한 User 객체로 조회)
      const user = await this.userRepository.findOne({
        where: { id: decoded.sub },
      });

      if (!user) {
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }

      // 새로운 Access Token 생성
      const newAccessToken = this.jwtService.generateAccessToken(user);

      // 비밀번호를 제외한 사용자 정보 반환
      const { password: _, ...userWithoutPassword } = user;

      return {
        accessToken: newAccessToken,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }
  }
}
