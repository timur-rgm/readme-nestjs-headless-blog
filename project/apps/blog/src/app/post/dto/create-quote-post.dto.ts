import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/types';

export class CreateQuotePostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Quote,
    enum: PostType,
  })
  public type!: PostType.Quote;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote',
  })
  public quote!: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Author Name',
  })
  public quoteAuthor!: string;
}
