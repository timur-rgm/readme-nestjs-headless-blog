import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { PostType } from '@project/types';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateTextPostDto extends CreateBasePostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Text,
    enum: PostType,
  })
  public type!: PostType.Text;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @ApiProperty({
    description: 'Post title',
    example: 'My post',
  })
  public title!: string;

  @IsString()
  @MinLength(50)
  @MaxLength(255)
  @ApiProperty({
    description: 'Post announce',
    example: 'Short announce',
  })
  public announce!: string;

  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  @ApiProperty({
    description: 'Post text',
    example: 'Full text',
  })
  public text!: string;
}
