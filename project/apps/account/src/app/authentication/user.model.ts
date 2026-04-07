import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import type { AuthUser } from '@project/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  public id!: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public name!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Prop()
  public avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
