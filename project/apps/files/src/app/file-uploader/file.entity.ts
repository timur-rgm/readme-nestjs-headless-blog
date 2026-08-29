import type { Entity } from '@project/core';
import type { File } from '@project/types';

export class FileEntity implements File, Entity<string, File> {
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public originalName!: string;
  public subDirectory!: string;
  public size!: number;
  public mimetype!: string;
  public hashName!: string;
  public path!: string;

  constructor(file: File) {
    this.fillFromObject(file);
  }

  public convertToObject(): File {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      originalName: this.originalName,
      subDirectory: this.subDirectory,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
    };
  }

  public static fromObject(file: File): FileEntity {
    return new FileEntity(file);
  }

  private fillFromObject(file: File): void {
    this.id = file.id;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
  }
}
