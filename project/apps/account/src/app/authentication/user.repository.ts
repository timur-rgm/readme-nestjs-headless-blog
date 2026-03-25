import { Injectable } from "@nestjs/common";

import { BaseMemoryRepository } from '@project/core';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends BaseMemoryRepository<UserEntity> {
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email) ?? null;
    return Promise.resolve(user);
  }
}
