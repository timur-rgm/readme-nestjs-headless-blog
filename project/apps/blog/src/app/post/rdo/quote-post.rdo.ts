import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PostType } from '@project/types';

export class QuotePostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: PostType.Quote,
    enum: PostType,
  })
  public type!: PostType.Quote;

  @Expose()
  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @Expose()
  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote',
  })
  public quote!: string;

  @Expose()
  @ApiProperty({
    description: 'Quote author',
    example: 'Author Name',
  })
  public quoteAuthor!: string;
}
