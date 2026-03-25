import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PostType } from '@project/types';

export class LinkPostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: PostType.Link,
    enum: PostType,
  })
  public type!: PostType.Link;

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
    description: 'Link URL',
    example: 'https://example.com',
  })
  public linkUrl!: string;

  @Expose()
  @ApiProperty({
    description: 'Link description',
    example: 'Short description',
  })
  public description!: string;
}
