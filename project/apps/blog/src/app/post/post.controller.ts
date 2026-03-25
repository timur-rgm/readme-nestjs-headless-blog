import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { fillRdo } from '@project/helpers';

import type { CreatePostDto } from './dto/create-post.dto';
import {
  LinkPostRdo,
  QuotePostRdo,
  PhotoPostRdo,
  PostRdo,
  TextPostRdo,
  VideoPostRdo,
} from './rdo';
import { PostExistsError, PostNotFoundError } from './errors';
import { PostService } from './post.service';

@Controller('posts')
@ApiExtraModels(
  LinkPostRdo,
  QuotePostRdo,
  PhotoPostRdo,
  TextPostRdo,
  VideoPostRdo,
)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(LinkPostRdo) },
        { $ref: getSchemaPath(QuotePostRdo) },
        { $ref: getSchemaPath(PhotoPostRdo) },
        { $ref: getSchemaPath(TextPostRdo) },
        { $ref: getSchemaPath(VideoPostRdo) },
      ],
    },
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    try {
      const post = await this.postService.create(dto);
      return fillRdo(PostRdo, post.convertToObject());
    } catch (error) {
      this.mapPostErrorToHttp(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post list',
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(LinkPostRdo) },
          { $ref: getSchemaPath(QuotePostRdo) },
          { $ref: getSchemaPath(TextPostRdo) },
          { $ref: getSchemaPath(PhotoPostRdo) },
          { $ref: getSchemaPath(VideoPostRdo) },
        ],
      },
    },
  })
  @Get('/')
  public async getAll() {
    const posts = await this.postService.getAll();
    return fillRdo(
      PostRdo,
      posts.map((post) => post.convertToObject()),
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post found',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(LinkPostRdo) },
        { $ref: getSchemaPath(QuotePostRdo) },
        { $ref: getSchemaPath(TextPostRdo) },
        { $ref: getSchemaPath(PhotoPostRdo) },
        { $ref: getSchemaPath(VideoPostRdo) },
      ],
    },
  })
  @Get('/:id')
  public async getById(@Param('id') id: string) {
    try {
      const post = await this.postService.getById(id);
      return fillRdo(PostRdo, post.convertToObject());
    } catch (error) {
      this.mapPostErrorToHttp(error);
    }
  }

  private mapPostErrorToHttp(error: unknown): never {
    if (error instanceof PostExistsError) {
      throw new ConflictException(error.message);
    }
    if (error instanceof PostNotFoundError) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}
