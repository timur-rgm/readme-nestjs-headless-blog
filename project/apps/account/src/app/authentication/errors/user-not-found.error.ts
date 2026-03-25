import { AuthenticationError } from './authentication.error';

export class UserNotFoundError extends AuthenticationError {
  constructor(message: string) {
    super(message);
  }
}
