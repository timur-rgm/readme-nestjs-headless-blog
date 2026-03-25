import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Timur',
  })
  public name!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password!: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  public avatarUrl?: string;
}
