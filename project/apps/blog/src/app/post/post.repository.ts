import { Injectable } from '@nestjs/common';
import { Post as PrismaPost, PostType as PrismaPostType } from '@prisma/client';

import { PostType } from '@project/types';
import { PrismaClientService } from '@project/models';
import type { EntityId, Repository } from '@project/core';

import { PostEntity } from './post.entity';
import { PostQuery } from './query/post.query';

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

  public async findById(id: EntityId): Promise<PostEntity | null> {
    const existingPostRow = await this.prismaClientService.post.findUnique({
      where: { id },
    });
    if (!existingPostRow) {
      return null;
    }
    return this.mapPostRowToPostEntity(existingPostRow);
  }

  public async findAll(query?: PostQuery): Promise<PostEntity[]> {
    const postRows = await this.prismaClientService.post.findMany();
    return postRows.map((postRow) => this.mapPostRowToPostEntity(postRow));
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
    switch (prismaPost.type) {
      case PrismaPostType.Link:
        return new PostEntity({
          id: prismaPost.id,
          type: PostType.Link,
          tags: prismaPost.tags,
          authorId: prismaPost.authorId,
          linkUrl: prismaPost.linkUrl!,
          description: prismaPost.description!,
        });
      case PrismaPostType.Quote:
        return new PostEntity({
          id: prismaPost.id,
          type: PostType.Quote,
          tags: prismaPost.tags,
          authorId: prismaPost.authorId,
          quote: prismaPost.quote!,
          quoteAuthor: prismaPost.quoteAuthor!,
        });
      case PrismaPostType.Photo:
        return new PostEntity({
          id: prismaPost.id,
          type: PostType.Photo,
          tags: prismaPost.tags,
          authorId: prismaPost.authorId,
          photoUrl: prismaPost.photoUrl!,
        });
      case PrismaPostType.Text:
        return new PostEntity({
          id: prismaPost.id,
          type: PostType.Text,
          tags: prismaPost.tags,
          authorId: prismaPost.authorId,
          title: prismaPost.title!,
          announce: prismaPost.announce!,
          text: prismaPost.text!,
        });
      case PrismaPostType.Video:
        return new PostEntity({
          id: prismaPost.id,
          type: PostType.Video,
          tags: prismaPost.tags,
          authorId: prismaPost.authorId,
          title: prismaPost.title!,
          videoUrl: prismaPost.videoUrl!,
        });
    }
  }
}
