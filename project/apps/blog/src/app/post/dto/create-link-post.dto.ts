import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { PostType } from '@project/types';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateLinkPostDto extends CreateBasePostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Link,
    enum: PostType,
  })
  public type!: PostType.Link;

  @IsUrl()
  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com',
  })
  public linkUrl!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({
    description: 'Link description',
    example: 'Short description',
    required: false,
  })
  public description?: string;
}
