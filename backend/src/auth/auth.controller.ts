import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { File as MulterFile } from 'multer';
import { ProfileImageService } from './profile-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('auth') // '/auth' 경로로 시작하는 모든 요청을 처리
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileImageService: ProfileImageService, // 서비스 주입
  ) {}

  // 회원가입 API 엔드포인트
  @Post('signup') // POST /auth/signup
  @UseInterceptors(FileInterceptor('profileImage')) // Multer로 이미지 파일 파싱
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() profileImage?: MulterFile,
    @Res({ passthrough: true }) res?: Response,
  ) {
    // 클라이언트에서 보낸 회원가입 데이터를 받아서 처리
    const result = await this.authService.signUp(signUpDto, profileImage);

    // Refresh Token을 httpOnly 쿠키로 설정
    if (res) {
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return {
      message: '회원가입이 성공적으로 완료되었습니다.',
      user: result.user,
      accessToken: result.accessToken, // Access Token만 응답에 포함
    };
  }

  // 로그인 API 엔드포인트
  @Post('signin') // POST /auth/signin
  @HttpCode(HttpStatus.OK) // 성공 시 200 상태 코드 반환
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res?: Response,
  ) {
    // 클라이언트에서 보낸 로그인 데이터를 받아서 처리
    const result = await this.authService.signIn(signInDto);

    // Refresh Token을 httpOnly 쿠키로 설정
    if (res) {
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return {
      message: '로그인이 성공적으로 완료되었습니다.',
      user: result.user,
      accessToken: result.accessToken, // Access Token만 응답에 포함
    };
  }

  // 보호된 엔드포인트 - JWT 토큰 필요한 API
  @Get('profile')
  @UseGuards(JwtAuthGuard) // JwtAuthGuard를 사용해서 토큰 검증
  async getProfile(@Req() req) {
    // req.user에 사용자 정보가 자동으로 추가됨
    const user = await this.authService.findUserById(req.user.id);

    if (!user) {
      return {
        message: '사용자를 찾을 수 없습니다.',
        user: null,
      };
    }

    return {
      message: '프로필 조회가 성공적으로 완료되었습니다.',
      user,
    };
  }

  /**
   * 프로필 이미지 업로드 엔드포인트
   * - 프론트엔드에서 FormData로 파일을 전송하면, 환경에 따라 업로드 후 URL 반환
   * - POST /auth/upload-profile-image
   */
  @Post('upload-profile-image')
  @UseInterceptors(FileInterceptor('file')) // Multer로 파일 파싱
  async uploadProfileImage(@UploadedFile() file: MulterFile) {
    if (!file) {
      return { url: null, message: '파일이 업로드되지 않았습니다.' };
    }
    // 환경에 따라 로컬 또는 Cloudinary에 업로드 후 URL 반환
    const url = await this.profileImageService.uploadImage(file);
    return { url };
  }

  /**
   * 프로필 업데이트 엔드포인트
   * - PUT /auth/update-profile
   */
  @Put('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    const result = await this.authService.updateProfile(
      req.user.id,
      updateProfileDto,
    );

    return {
      message: '프로필이 성공적으로 업데이트되었습니다.',
      user: result.user,
    };
  }

  /**
   * 닉네임 중복 검사 엔드포인트
   * - GET /auth/check-nickname?nickname=test
   */
  @Get('check-nickname')
  async checkNickname(@Query('nickname') nickname: string) {
    const isAvailable =
      await this.authService.checkNicknameAvailability(nickname);

    return {
      isAvailable,
      message: isAvailable
        ? '사용 가능한 닉네임입니다.'
        : '이미 사용 중인 닉네임입니다.',
    };
  }

  /**
   * 회원 탈퇴 엔드포인트
   * - DELETE /auth/delete-account
   */
  @Delete('delete-account')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(
    @Body() deleteAccountDto: DeleteAccountDto,
    @Req() req: any,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<any> {
    await this.authService.deleteAccount(
      req.user.id,
      deleteAccountDto.password,
    );

    // 계정 삭제 시 Refresh Token 쿠키도 삭제
    if (res) {
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 0,
        path: '/',
      });
    }

    return {
      message: '계정이 성공적으로 삭제되었습니다.',
    };
  }

  // Refresh Token을 사용한 Access Token 갱신 엔드포인트
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req) {
    const refreshToken = req.cookies.refreshToken; // 쿠키에서 추출

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 없습니다.');
    }

    const result = await this.authService.refreshAccessToken(refreshToken);

    return {
      message: 'Access Token이 성공적으로 갱신되었습니다.',
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  // 로그아웃 엔드포인트
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    // Refresh Token 쿠키 삭제
    if (res) {
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 0,
        path: '/',
      });
    }

    return {
      message: '로그아웃이 성공적으로 완료되었습니다.',
    };
  }
}
