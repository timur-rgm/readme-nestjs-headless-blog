import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max } from 'class-validator';

import { SortDirection } from '@project/types';

import { POST_MAX_LIMIT } from '../post.constant';

export class PostQuery {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Max(POST_MAX_LIMIT)
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsOptional()
  public page?: number;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection;
}
