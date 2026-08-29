import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadedFileRdo {
  @ApiProperty({
    description: 'Unique file ID',
    example: '66cc7e8a7d89f81cfad430f8',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Original file name',
    example: 'cat.jpg',
  })
  @Expose()
  public originalName!: string;

  @ApiProperty({
    description: 'Unique stored file name',
    example: '0d4bb720-4512-4cf8-8da1-1b80bbd8a7ac.jpg',
  })
  @Expose()
  public hashName!: string;

  @ApiProperty({
    description: 'File subdirectory',
    example: '2026/08',
  })
  @Expose()
  public subDirectory!: string;

  @ApiProperty({
    description: 'File MIME type',
    example: 'image/jpeg',
  })
  @Expose()
  public mimetype!: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 154238,
  })
  @Expose()
  public size!: number;
}
