import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import type { File } from '@project/types';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileModel extends Document implements File {
  public id!: string;

  @Prop({ required: true })
  public originalName!: string;

  @Prop({ required: true })
  public subDirectory!: string;

  @Prop({ required: true })
  public size!: number;

  @Prop({ required: true })
  public mimetype!: string;

  @Prop({ required: true })
  public hashName!: string;

  @Prop({ required: true })
  public path!: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
