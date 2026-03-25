import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PostType } from '@project/types';

export class TextPostRdo {
  @Expose()
  @ApiProperty({
    description: 'Post ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post type',
    example: PostType.Text,
    enum: PostType,
  })
  public type!: PostType.Text;

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
    description: 'Post title',
    example: 'My post',
  })
  public title!: string;

  @Expose()
  @ApiProperty({
    description: 'Post announce',
    example: 'Short announce',
  })
  public announce!: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'Full text',
  })
  public text!: string;
}
