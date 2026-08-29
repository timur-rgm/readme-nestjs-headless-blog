import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillRdo } from '@project/helpers';

import { CommentNotFoundError, CommentOwnershipError } from './errors';
import { CommentQuery } from './query/comment.query';
import { CommentListRdo, CommentRdo } from './rdo';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostNotFoundError } from '../post/errors';

@Controller()
@ApiTags('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/comments')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.',
    type: CommentRdo,
  })
  public async create(@Body() dto: CreateCommentDto): Promise<CommentRdo> {
    const createdEntity = await this.commentService.create(dto, 'test-user-id');
    return fillRdo(CommentRdo, createdEntity.convertToObject());
  }

  @Get('/posts/:postId/comments')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment list',
    type: CommentListRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  public async getByPostId(
    @Param('postId') postId: string,
    @Query() query?: CommentQuery,
  ): Promise<CommentListRdo> {
    try {
      const commentPaginationResult = await this.commentService.getByPostId(
        postId,
        query,
      );
      return fillRdo(CommentListRdo, {
        ...commentPaginationResult,
        entities: commentPaginationResult.entities.map((entity) =>
          entity.convertToObject(),
        ),
      });
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  @Delete('/comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only the comment author can delete this comment.',
  })
  public async deleteById(@Param('id') id: string): Promise<void> {
    try {
      await this.commentService.deleteById(id, 'test-user-id');
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  private mapErrorToHttp(error: unknown): never {
    if (error instanceof CommentNotFoundError) {
      throw new NotFoundException(error.message);
    }
    if (error instanceof CommentOwnershipError) {
      throw new ForbiddenException(error.message);
    }
    if (error instanceof PostNotFoundError) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}
