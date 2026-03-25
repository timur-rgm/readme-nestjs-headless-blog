import { PostType } from './post-type.enum';

export interface PostBase {
  id?: string;
  type: PostType;
  tags?: string[];
}

export interface LinkPost extends PostBase {
  type: PostType.Link;
  linkUrl: string;
  description: string;
}

export interface QuotePost extends PostBase {
  type: PostType.Quote;
  quote: string;
  quoteAuthor: string;
}

export interface TextPost extends PostBase {
  type: PostType.Text;
  title: string;
  announce: string;
  text: string;
}

export interface PhotoPost extends PostBase {
  type: PostType.Photo;
  photoUrl: string;
}

export interface VideoPost extends PostBase {
  type: PostType.Video;
  title: string;
  videoUrl: string;
}

export type Post = LinkPost | QuotePost | TextPost | PhotoPost | VideoPost;
