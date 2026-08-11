import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { COMMENT_MAX_LIMIT } from '../comment.constant';

export class CommentQuery {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(COMMENT_MAX_LIMIT)
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @IsOptional()
  public page?: number;
}
