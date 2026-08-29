import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';

export class LoginUserDto {
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  public email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password!: string;
}
