import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { fillRdo } from '@project/helpers';

import type { CreatePostDto } from './dto/create-post.dto';
import { CreatePostValidationPipe } from './pipes';
import {
  LinkPostRdo,
  QuotePostRdo,
  PhotoPostRdo,
  PostListRdo,
  PostRdo,
  TextPostRdo,
  VideoPostRdo,
} from './rdo';
import { PostExistsError, PostNotFoundError } from './errors';
import { PostQuery } from './query/post.query';
import { PostService } from './post.service';

@Controller('posts')
@ApiExtraModels(
  LinkPostRdo,
  QuotePostRdo,
  PhotoPostRdo,
  PostListRdo,
  TextPostRdo,
  VideoPostRdo,
)
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Post already exists.',
  })
  public async create(
    @Body(new CreatePostValidationPipe()) dto: CreatePostDto,
  ): Promise<PostRdo> {
    try {
      const post = await this.postService.create(dto, 'test-author-id');
      return fillRdo(PostRdo, post.convertToObject());
    } catch (error) {
      this.mapPostErrorToHttp(error);
    }
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post list',
    type: PostListRdo,
  })
  public async getAll(@Query() query?: PostQuery): Promise<PostListRdo> {
    const posts = await this.postService.getAll(query);
    return fillRdo(PostListRdo, {
      ...posts,
      entities: posts.entities.map((post) => post.convertToObject()),
    });
  }

  @Get('/:id')
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  public async getById(@Param('id') id: string): Promise<PostRdo> {
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
