import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment.',
  })
  public text!: string;

  @IsUUID()
  @ApiProperty({
    description: 'Post ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  public postId!: string;
}
