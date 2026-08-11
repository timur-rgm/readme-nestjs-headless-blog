import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Post as PrismaPost,
  PostType as PrismaPostType,
} from '@prisma/client';

import { PaginationResult, PostType } from '@project/types';
import { PrismaClientService } from '@project/models';
import type { EntityId, Repository } from '@project/core';

import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';
import {
  POST_DEFAULT_LIMIT,
  POST_DEFAULT_PAGE,
  POST_DEFAULT_SORT_DIRECTION,
} from './post.constant';

const postTypeToPrismaPostType: Record<PostType, PrismaPostType> = {
  [PostType.Link]: PrismaPostType.Link,
  [PostType.Quote]: PrismaPostType.Quote,
  [PostType.Photo]: PrismaPostType.Photo,
  [PostType.Text]: PrismaPostType.Text,
  [PostType.Video]: PrismaPostType.Video,
};

@Injectable()
export class PostRepository implements Repository<PostEntity> {
  constructor(private readonly prismaClientService: PrismaClientService) {}

  public async save(entity: PostEntity): Promise<PostEntity> {
    const postData = entity.convertToObject();
    const createdPostRow = await this.prismaClientService.post.create({
      data: { ...postData, type: postTypeToPrismaPostType[postData.type] },
    });
    return this.mapPostRowToPostEntity(createdPostRow);
  }

  public async findAll(
    query?: PostQuery,
  ): Promise<PaginationResult<PostEntity>> {
    const {
      limit = POST_DEFAULT_LIMIT,
      page = POST_DEFAULT_PAGE,
      sortDirection = POST_DEFAULT_SORT_DIRECTION,
    } = query ?? {};

    const orderBy: Prisma.PostOrderByWithRelationInput = {
      createdAt: sortDirection,
    };
    const skip = (page - 1) * limit;

    const [postRows, totalItems] = await Promise.all([
      this.prismaClientService.post.findMany({
        orderBy,
        skip,
        take: limit,
      }),
      this.prismaClientService.post.count(),
    ]);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      entities: postRows.map((postRow) => this.mapPostRowToPostEntity(postRow)),
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
    };
  }

  public async findById(id: EntityId): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findUnique({
      where: { id },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async update(id: EntityId, entity: PostEntity): Promise<PostEntity> {
    const postData = entity.convertToObject();
    const updatedPostRow = await this.prismaClientService.post.update({
      where: { id },
      data: {
        ...postData,
        type: postTypeToPrismaPostType[postData.type],
      },
    });
    return this.mapPostRowToPostEntity(updatedPostRow);
  }

  public async deleteById(id: EntityId): Promise<void> {
    await this.prismaClientService.post.delete({
      where: { id },
    });
  }

  public async findByLinkUrl(linkUrl: string): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findFirst({
      where: { linkUrl },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async findByQuote(
    quote: string,
    quoteAuthor: string,
  ): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findFirst({
      where: { quote, quoteAuthor },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async findByPhotoUrl(photoUrl: string): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findFirst({
      where: { photoUrl },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async findByTitleAndText(
    title: string,
    text: string,
  ): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findFirst({
      where: { title, text },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async findByVideoUrl(videoUrl: string): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findFirst({
      where: { videoUrl },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  private mapPostRowToPostEntity(prismaPost: PrismaPost): PostEntity {
    const basePost = {
      id: prismaPost.id,
      createdAt: prismaPost.createdAt,
      updatedAt: prismaPost.updatedAt,
      tags: prismaPost.tags,
      authorId: prismaPost.authorId,
    };

    switch (prismaPost.type) {
      case PrismaPostType.Link:
        return new PostEntity({
          ...basePost,
          type: PostType.Link,
          linkUrl: prismaPost.linkUrl!,
          description: prismaPost.description ?? undefined,
        });
      case PrismaPostType.Quote:
        return new PostEntity({
          ...basePost,
          type: PostType.Quote,
          quote: prismaPost.quote!,
          quoteAuthor: prismaPost.quoteAuthor!,
        });
      case PrismaPostType.Photo:
        return new PostEntity({
          ...basePost,
          type: PostType.Photo,
          photoUrl: prismaPost.photoUrl!,
        });
      case PrismaPostType.Text:
        return new PostEntity({
          ...basePost,
          type: PostType.Text,
          title: prismaPost.title!,
          announce: prismaPost.announce!,
          text: prismaPost.text!,
        });
      case PrismaPostType.Video:
        return new PostEntity({
          ...basePost,
          type: PostType.Video,
          title: prismaPost.title!,
          videoUrl: prismaPost.videoUrl!,
        });
    }
  }
}
