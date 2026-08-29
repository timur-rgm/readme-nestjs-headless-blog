import 'multer';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

import type { StoredFile } from '@project/types';

import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';
import { FileNotFoundError, UnsupportedFileTypeError } from './errors';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly fileRepository: FileRepository,
  ) {}

  public async saveFile(file: Express.Multer.File): Promise<FileEntity> {
    const { filename, path, subDirectory } = await this.writeFile(file);

    const fileEntity = FileEntity.fromObject({
      originalName: file.originalname,
      subDirectory,
      size: file.size,
      mimetype: file.mimetype,
      hashName: filename,
      path,
    });

    return this.fileRepository.save(fileEntity);
  }

  public async getFile(fileId: string): Promise<FileEntity> {
    const fileEntity = await this.fileRepository.findById(fileId);

    if (!fileEntity) {
      throw new FileNotFoundError(`File with id ${fileId} not found.`);
    }

    return fileEntity;
  }

  private async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    const fileExtension = extension(file.mimetype);

    if (!fileExtension) {
      throw new UnsupportedFileTypeError('Unsupported file MIME type');
    }

    const filename = `${randomUUID()}.${fileExtension}`;
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const subDirectory = join(year, month);

    const uploadDirectoryPath = this.getUploadDirectoryPath(subDirectory);
    const destinationFilePath = this.getDestinationFilePath(
      uploadDirectoryPath,
      filename,
    );

    try {
      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFilePath, file.buffer);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown file saving error';
      this.logger.error(`Error while saving file: ${errorMessage}`);
      throw new Error(`Can't save file`);
    }

    return {
      filename,
      fileExtension,
      subDirectory,
      path: destinationFilePath,
    };
  }

  private getUploadDirectoryPath(subDirectory: string): string {
    const uploadDirectory = this.configService.getOrThrow<string>(
      'application.uploadDirectory',
    );
    return join(uploadDirectory, subDirectory);
  }

  private getDestinationFilePath(
    uploadDirectoryPath: string,
    filename: string,
  ): string {
    return join(uploadDirectoryPath, filename);
  }
}
