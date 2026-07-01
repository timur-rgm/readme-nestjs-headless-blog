import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection } from '@project/types';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_POST_PAGE_COUNT,
  DEFAULT_POST_SORT_DIRECTION,
} from '../post.constant';

export class PostQuery {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number = DEFAULT_POST_PAGE_COUNT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_POST_SORT_DIRECTION;
}
