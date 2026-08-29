import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { PostType } from '@project/types';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateVideoPostDto extends CreateBasePostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Video,
    enum: PostType,
  })
  public type!: PostType.Video;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @ApiProperty({
    description: 'Post title',
    example: 'My post',
  })
  public title!: string;

  @IsUrl()
  @ApiProperty({
    description: 'Video URL',
    example: 'https://youtube.com/watch?v=123',
  })
  public videoUrl!: string;
}
