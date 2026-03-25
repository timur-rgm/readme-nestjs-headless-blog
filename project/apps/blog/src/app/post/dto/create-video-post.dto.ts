import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/types';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Video,
    enum: PostType,
  })
  public type!: PostType.Video;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Post title',
    example: 'My post',
  })
  public title!: string;

  @ApiProperty({
    description: 'Video URL',
    example: 'https://youtube.com/watch?v=123',
  })
  public videoUrl!: string;
}
