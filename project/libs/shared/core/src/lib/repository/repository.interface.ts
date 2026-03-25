import type { Entity, EntityIdType } from './entity.interface';

export interface Repository<T extends Entity<EntityIdType>> {
  save(entity: T): Promise<T>;
  findById(id: T['id']): Promise<T | null>;
  update(id: T['id'], entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
