import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Timur',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatarUrl!: string;
}
