import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { PostType } from '@project/types';

export class PostRdo {
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
  public type!: PostType;

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
    required: false,
  })
  public linkUrl?: string;

  @Expose()
  @ApiProperty({
    description: 'Link description',
    example: 'Short description',
    required: false,
  })
  public description?: string;

  @Expose()
  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote',
    required: false,
  })
  public quote?: string;

  @Expose()
  @ApiProperty({
    description: 'Quote author',
    example: 'Author Name',
    required: false,
  })
  public quoteAuthor?: string;

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'My post',
    required: false,
  })
  public title?: string;

  @Expose()
  @ApiProperty({
    description: 'Post announce',
    example: 'Short announce',
    required: false,
  })
  public announce?: string;

  @Expose()
  @ApiProperty({
    description: 'Post text',
    example: 'Full text',
    required: false,
  })
  public text?: string;

  @Expose()
  @ApiProperty({
    description: 'Photo URL',
    example: '/images/photo.jpg',
    required: false,
  })
  public photoUrl?: string;

  @Expose()
  @ApiProperty({
    description: 'Video URL',
    example: 'https://youtube.com/watch?v=123',
    required: false,
  })
  public videoUrl?: string;
}
