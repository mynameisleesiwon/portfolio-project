import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

// 회원가입 시 전달받을 데이터의 형식을 정의하는 DTO
export class SignUpDto {
  // 사용자 ID - 로그인에 사용할 고유한 식별자
  @IsString()
  @IsNotEmpty({ message: '사용자 ID는 필수입니다.' })
  @MinLength(4, { message: '사용자 ID는 최소 4자 이상이어야 합니다.' })
  @MaxLength(20, { message: '사용자 ID는 최대 20자까지 가능합니다.' })
  userId: string;

  // 비밀번호
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  password: string;

  // 닉네임
  @IsString()
  @IsNotEmpty({ message: '닉네임은 필수입니다.' })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자까지 가능합니다.' })
  nickname: string;
}
