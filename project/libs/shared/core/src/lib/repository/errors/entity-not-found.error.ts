import { RepositoryError } from './repository.error';

export class EntityNotFoundError extends RepositoryError {
  constructor(message: string) {
    super(message);
  }
}
