import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty({ message: '닉네임은 필수입니다.' })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자까지 가능합니다.' })
  nickname: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  profileImage?: string;
}
