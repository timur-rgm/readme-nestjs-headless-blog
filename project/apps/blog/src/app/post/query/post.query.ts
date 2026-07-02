import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection } from '@project/types';

export class PostQuery {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection;
}
