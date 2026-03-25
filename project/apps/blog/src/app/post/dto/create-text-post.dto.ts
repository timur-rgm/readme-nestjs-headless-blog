import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/types';

export class CreateTextPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Text,
    enum: PostType,
  })
  public type!: PostType.Text;

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
    description: 'Post announce',
    example: 'Short announce',
  })
  public announce!: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Full text',
  })
  public text!: string;
}
