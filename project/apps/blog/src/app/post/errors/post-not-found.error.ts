import { PostError } from './post.error';

export class PostNotFoundError extends PostError {
  constructor(message: string) {
    super(message);
  }
}
