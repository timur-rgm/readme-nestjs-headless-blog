import { Document, Model } from 'mongoose';

import { EntityNotFoundError } from './errors';
import type { Entity, EntityIdType } from './entity.interface';
import type { Repository } from './repository.interface';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document,
> implements Repository<EntityType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {}

  public async save(entity: EntityType): Promise<EntityType> {
    const createdDocument = new this.model(entity.convertToObject());
    await createdDocument.save();

    entity.id = createdDocument.id;
    return entity;
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType,
  ): Promise<EntityType> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(id, entity.convertToObject(), {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedDocument) {
      throw new EntityNotFoundError('Entity not found');
    }

    return entity;
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new EntityNotFoundError('Entity not found');
    }
  }

  protected createEntityFromDocument(
    document: DocumentType | null,
  ): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }
}
