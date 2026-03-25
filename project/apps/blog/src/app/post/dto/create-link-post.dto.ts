import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/types';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Link,
    enum: PostType,
  })
  public type!: PostType.Link;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com',
  })
  public linkUrl!: string;

  @ApiProperty({
    description: 'Link description',
    example: 'Short description',
  })
  public description!: string;
}
