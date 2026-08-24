export interface File {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  originalName: string;
  subDirectory: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
}
