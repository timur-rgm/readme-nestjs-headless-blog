import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

import { SortDirection } from '@project/types';

import { POST_MAX_LIMIT } from '../post.constant';

export class PostQuery {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(POST_MAX_LIMIT)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Number of posts per page',
    example: 25,
    minimum: 1,
    maximum: POST_MAX_LIMIT,
  })
  public limit?: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Post page number',
    example: 1,
    minimum: 1,
  })
  public page?: number;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Post sorting direction',
    enum: SortDirection,
    example: SortDirection.Desc,
  })
  public sortDirection?: SortDirection;
}
