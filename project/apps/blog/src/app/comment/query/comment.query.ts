import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { COMMENT_MAX_LIMIT } from '../comment.constant';

export class CommentQuery {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(COMMENT_MAX_LIMIT)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Number of comments per page',
    example: 50,
    minimum: 1,
    maximum: COMMENT_MAX_LIMIT,
  })
  public limit?: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Comment page number',
    example: 1,
    minimum: 1,
  })
  public page?: number;
}
