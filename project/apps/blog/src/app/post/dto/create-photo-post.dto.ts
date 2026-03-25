import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/types';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Photo,
    enum: PostType,
  })
  public type!: PostType.Photo;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Photo URL',
    example: '/images/photo.jpg',
  })
  public photoUrl!: string;
}
