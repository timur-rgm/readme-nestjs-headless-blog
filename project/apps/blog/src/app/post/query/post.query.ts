import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { PostType, SortDirection } from '@project/types';

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

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Post author ID',
    example: '69d210c70ca335bbad96f91c',
  })
  authorId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Post tag',
    example: 'nestjs',
  })
  tag?: string;

  @IsIn(Object.values(PostType))
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Post type',
    enum: PostType,
    example: PostType.Photo,
  })
  type?: PostType;
}
