import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import type { TokenPair } from '@project/types';

export class TokenPairRdo implements TokenPair {
  @ApiProperty({
    description: 'JWT access token for API authorization',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token for obtaining a new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  public refreshToken!: string;
}
