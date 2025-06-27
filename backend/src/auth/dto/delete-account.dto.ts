import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  password: string;
}
