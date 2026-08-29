import { Injectable } from '@nestjs/common';

import { CommentEntity } from './comment.entity';
import {
  COMMENT_NOT_FOUND,
  COMMENT_OWNERSHIP_REQUIRED,
} from './comment.constant';
import { CommentNotFoundError, CommentOwnershipError } from './errors';
import { CommentQuery } from './query/comment.query';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationResult } from '@project/types';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  public async create(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<CommentEntity> {
    const entity = new CommentEntity({ ...dto, userId });
    return this.commentRepository.save(entity);
  }

  public async getByPostId(
    postId: string,
    query?: CommentQuery,
  ): Promise<PaginationResult<CommentEntity>> {
    await this.postService.ensureExists(postId);
    return this.commentRepository.findByPostId(postId, query);
  }

  public async deleteById(id: string, userId: string): Promise<void> {
    const existingEntity = await this.commentRepository.findById(id);

    if (!existingEntity) {
      throw new CommentNotFoundError(COMMENT_NOT_FOUND);
    }

    if (existingEntity.userId !== userId) {
      throw new CommentOwnershipError(COMMENT_OWNERSHIP_REQUIRED);
    }

    await this.commentRepository.deleteById(id);
  }
}

