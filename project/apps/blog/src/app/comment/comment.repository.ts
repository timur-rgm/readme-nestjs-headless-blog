import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaClientService } from '@project/models';
import type { Repository } from '@project/core';

import {
  COMMENT_DEFAULT_LIMIT,
  COMMENT_DEFAULT_PAGE,
} from './comment.constant';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';
import { PaginationResult } from '@project/types';

@Injectable()
export class CommentRepository implements Repository<CommentEntity> {
  constructor(private readonly prismaClientService: PrismaClientService) {}

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const createdRow = await this.prismaClientService.comment.create({
      data: entity.convertToObject(),
    });
    return new CommentEntity(createdRow);
  }

  public async findById(id: string): Promise<CommentEntity | null> {
    const existingRow = await this.prismaClientService.comment.findUnique({
      where: { id },
    });

    if (!existingRow) {
      return null;
    }

    return new CommentEntity(existingRow);
  }

  public async findByPostId(
    postId: string,
    query?: CommentQuery,
  ): Promise<PaginationResult<CommentEntity>> {
    const { limit = COMMENT_DEFAULT_LIMIT, page = COMMENT_DEFAULT_PAGE } =
      query ?? {};

    const where: Prisma.CommentWhereInput = { postId };
    const orderBy: Prisma.CommentOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    const skip = (page - 1) * limit;

    const [commentRows, totalCommentRows] = await Promise.all([
      this.prismaClientService.comment.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prismaClientService.comment.count({ where }),
    ]);
    const totalPages = Math.ceil(totalCommentRows / limit);

    return {
      entities: commentRows.map((row) => new CommentEntity(row)),
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalCommentRows,
      totalPages,
    };
  }

  public async update(
    id: string,
    entity: CommentEntity,
  ): Promise<CommentEntity> {
    const updatedRow = await this.prismaClientService.comment.update({
      where: { id },
      data: entity.convertToObject(),
    });
    return new CommentEntity(updatedRow);
  }

  public async deleteById(id: string): Promise<void> {
    await this.prismaClientService.comment.delete({ where: { id } });
  }
}
