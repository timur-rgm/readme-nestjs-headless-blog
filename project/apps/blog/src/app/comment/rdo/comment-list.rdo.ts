import { Expose, Type } from 'class-transformer';
import type { PaginationResult } from '@project/types';
import { CommentRdo } from './comment.rdo';

export class CommentListRdo implements PaginationResult<CommentRdo> {
  @Expose()
  @Type(() => CommentRdo)
  entities!: CommentRdo[];

  @Expose()
  public totalPages!: number;

  @Expose()
  public totalItems!: number;

  @Expose()
  public currentPage!: number;

  @Expose()
  public itemsPerPage!: number;
}
