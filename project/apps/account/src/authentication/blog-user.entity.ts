import type { AuthUser } from '@project/types';
import type { Entity } from '@project/core';

export class BlogUserEntity implements AuthUser, Entity<string> {
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
}
