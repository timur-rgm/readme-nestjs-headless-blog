import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUrl } from 'class-validator';

import { PostType } from '@project/types';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreatePhotoPostDto extends CreateBasePostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Photo,
    enum: PostType,
  })
  public type!: PostType.Photo;

  @IsUrl()
  @ApiProperty({
    description: 'Photo URL',
    example: '/images/photo.jpg',
  })
  public photoUrl!: string;
}
