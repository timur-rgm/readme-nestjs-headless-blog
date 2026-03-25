import { AuthenticationError } from './authentication.error';

export class UserExistsError extends AuthenticationError {
  constructor(message: string) {
    super(message);
  }
}
