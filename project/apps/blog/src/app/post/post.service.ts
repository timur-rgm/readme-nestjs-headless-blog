import { Injectable } from '@nestjs/common';

import { PostType } from '@project/types';

import type { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { POST_EXISTS, POST_NOT_FOUND } from './post.constant';
import { PostExistsError, PostNotFoundError } from './errors';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostDto): Promise<PostEntity> {
    const isPostExisting = await this.checkIsPostExisting(dto);
    if (isPostExisting) {
      throw new PostExistsError(POST_EXISTS);
    }
    const postEntity = new PostEntity(dto);
    return this.postRepository.save(postEntity);
  }

  public async getAll(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }

  public async getById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new PostNotFoundError(POST_NOT_FOUND);
    }
    return post;
  }

  private async checkIsPostExisting(dto: CreatePostDto): Promise<boolean> {
    let post: PostEntity | null;
    switch (dto.type) {
      case PostType.Link:
        post = await this.postRepository.findByLinkUrl(dto.linkUrl);
        break;
      case PostType.Quote:
        post = await this.postRepository.findByQuote(
          dto.quote,
          dto.quoteAuthor,
        );
        break;
      case PostType.Photo:
        post = await this.postRepository.findByPhotoUrl(dto.photoUrl);
        break;
      case PostType.Text:
        post = await this.postRepository.findByTitleAndText(
          dto.title,
          dto.text,
        );
        break;
      case PostType.Video:
        post = await this.postRepository.findByVideoUrl(dto.videoUrl);
        break;
      default:
        return false;
    }
    return !!post;
  }
}
