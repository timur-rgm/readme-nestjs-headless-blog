import { compare, genSalt, hash } from 'bcrypt';

import type { AuthUser } from '@project/types';
import type { Entity } from '@project/core';

import { SALT_ROUNDS } from './authentication.constant';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email!: string;
  public name!: string;
  public avatarUrl?: string;
  public passwordHash!: string;

  constructor(user: AuthUser) {
    this.fillFromObject(user);
  }

  public convertToObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatarUrl: this.avatarUrl,
      passwordHash: this.passwordHash,
    };
  }

  public fillFromObject(user: AuthUser): void {
    this.email = user.email;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
