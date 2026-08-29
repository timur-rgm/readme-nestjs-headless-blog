import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { PostType } from '@project/types';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateQuotePostDto extends CreateBasePostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Quote,
    enum: PostType,
  })
  public type!: PostType.Quote;

  @IsString()
  @MinLength(20)
  @MaxLength(300)
  @ApiProperty({
    description: 'Quote text',
    example: 'Some quote',
  })
  public quote!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'Quote author',
    example: 'Author Name',
  })
  public quoteAuthor!: string;
}
