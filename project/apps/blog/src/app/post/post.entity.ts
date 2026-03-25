import type { Entity } from '@project/core';
import { PostType, type PostBase, type Post } from '@project/types';

export class PostEntity implements PostBase, Entity<string> {
  public id?: string;
  public type!: PostType;
  public tags?: string[];

  public linkUrl?: string;
  public description?: string;
  public quote?: string;
  public quoteAuthor?: string;
  public title?: string;
  public announce?: string;
  public text?: string;
  public photoUrl?: string;
  public videoUrl?: string;

  constructor(post: Post) {
    this.fillFromObject(post);
  }

  public convertToObject() {
    const basePost = {
      id: this.id,
      type: this.type,
      tags: this.tags,
    };

    switch (this.type) {
      case PostType.Link:
        return {
          ...basePost,
          type: PostType.Link,
          linkUrl: this.linkUrl!,
          description: this.description!,
        };
      case PostType.Quote:
        return {
          ...basePost,
          type: PostType.Quote,
          quote: this.quote!,
          quoteAuthor: this.quoteAuthor!,
        };
      case PostType.Text:
        return {
          ...basePost,
          type: PostType.Text,
          title: this.title!,
          announce: this.announce!,
          text: this.text!,
        };
      case PostType.Photo:
        return {
          ...basePost,
          type: PostType.Photo,
          photoUrl: this.photoUrl!,
        };
      case PostType.Video:
        return {
          ...basePost,
          type: PostType.Video,
          title: this.title!,
          videoUrl: this.videoUrl!,
        };
    }
  }

  public fillFromObject(post: Post): void {
    this.id = post.id;
    this.type = post.type;
    this.tags = post.tags;

    this.clearSpecificFields();

    switch (post.type) {
      case PostType.Link:
        this.linkUrl = post.linkUrl;
        this.description = post.description;
        break;
      case PostType.Quote:
        this.quote = post.quote;
        this.quoteAuthor = post.quoteAuthor;
        break;
      case PostType.Photo:
        this.photoUrl = post.photoUrl;
        break;
      case PostType.Text:
        this.title = post.title;
        this.announce = post.announce;
        this.text = post.text;
        break;
      case PostType.Video:
        this.title = post.title;
        this.videoUrl = post.videoUrl;
        break;
    }
  }

  private clearSpecificFields(): void {
    this.linkUrl = undefined;
    this.description = undefined;
    this.quote = undefined;
    this.quoteAuthor = undefined;
    this.title = undefined;
    this.announce = undefined;
    this.text = undefined;
    this.photoUrl = undefined;
    this.videoUrl = undefined;
  }
}
