import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/core';

import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  public async findByLinkUrl(linkUrl: string): Promise<PostEntity | null> {
    const posts = Array.from(this.entities.values());
    const post = posts.find((post) => post.linkUrl === linkUrl) ?? null;
    return Promise.resolve(post);
  }

  public async findByQuote(
    quote: string,
    quoteAuthor: string,
  ): Promise<PostEntity | null> {
    const posts = Array.from(this.entities.values());
    const post =
      posts.find(
        (post) => post.quote === quote && post.quoteAuthor === quoteAuthor,
      ) ?? null;
    return Promise.resolve(post);
  }

  public async findByPhotoUrl(photoUrl: string): Promise<PostEntity | null> {
    const posts = Array.from(this.entities.values());
    const post = posts.find((post) => post.photoUrl === photoUrl) ?? null;
    return Promise.resolve(post);
  }

  public async findByTitleAndText(
    title: string,
    text: string,
  ): Promise<PostEntity | null> {
    const posts = Array.from(this.entities.values());
    const post =
      posts.find((post) => post.title === title && post.text === text) ?? null;
    return Promise.resolve(post);
  }

  public async findByVideoUrl(videoUrl: string): Promise<PostEntity | null> {
    const posts = Array.from(this.entities.values());
    const post = posts.find((post) => post.videoUrl === videoUrl) ?? null;
    return Promise.resolve(post);
  }
}
