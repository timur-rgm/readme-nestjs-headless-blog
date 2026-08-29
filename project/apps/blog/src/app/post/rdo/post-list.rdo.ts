import { Expose, Type } from 'class-transformer';
import type { PaginationResult } from '@project/types';
import { PostRdo } from './post.rdo';

export class PostListRdo implements PaginationResult<PostRdo> {
  @Expose()
  @Type(() => PostRdo)
  entities!: PostRdo[];

  @Expose()
  public totalPages!: number;

  @Expose()
  public totalItems!: number;

  @Expose()
  public currentPage!: number;

  @Expose()
  public itemsPerPage!: number;
}
