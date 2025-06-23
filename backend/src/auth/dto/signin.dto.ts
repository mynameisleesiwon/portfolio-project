import { IsString, IsNotEmpty } from 'class-validator';

// 로그인 시 전달받을 데이터의 형식을 정의하는 DTO
export class SignInDto {
  // 사용자 ID
  @IsString()
  @IsNotEmpty({ message: '사용자 ID는 필수입니다.' })
  userId: string;

  // 비밀번호
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  password: string;
}
