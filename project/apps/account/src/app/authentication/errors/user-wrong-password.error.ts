import { AuthenticationError } from './authentication.error';

export class UserWrongPasswordError extends AuthenticationError {
  constructor(message: string) {
    super(message);
  }
}
