import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth') // '/auth' 경로로 시작하는 모든 요청을 처리
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 API 엔드포인트
  @Post('signup') // POST /auth/signup
  async signUp(@Body() signUpDto: SignUpDto) {
    // 클라이언트에서 보낸 회원가입 데이터를 받아서 처리
    const result = await this.authService.signUp(signUpDto);

    return {
      message: '회원가입이 성공적으로 완료되었습니다.',
      user: result,
    };
  }

  // 로그인 API 엔드포인트
  @Post('signin') // POST /auth/signin
  @HttpCode(HttpStatus.OK) // 성공 시 200 상태 코드 반환
  async signIn(@Body() signInDto: SignInDto) {
    // 클라이언트에서 보낸 로그인 데이터를 받아서 처리
    const result = await this.authService.signIn(signInDto);

    return {
      message: '로그인이 성공적으로 완료되었습니다.',
      user: result,
    };
  }
}
