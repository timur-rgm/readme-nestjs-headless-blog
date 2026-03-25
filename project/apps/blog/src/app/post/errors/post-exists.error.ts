import { PostError } from './post.error';

export class PostExistsError extends PostError {
  constructor(message: string) {
    super(message);
  }
}
