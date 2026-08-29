import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.constant';

export class CreateUserDto {
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'User name',
    example: 'Timur',
  })
  public name!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
    required: false,
  })
  public avatarUrl?: string;
}
