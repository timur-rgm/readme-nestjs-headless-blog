import 'multer';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(private readonly configService: ConfigService) {}

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = extension(file.mimetype);
    const filename = `${randomUUID()}.${fileExtension}`;

    const uploadDirectoryPath = this.getUploadDirectoryPath();
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

    return destinationFilePath;
  }

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const uploadDirectory = this.configService.getOrThrow<string>(
      'application.uploadDirectory',
    );
    return join(uploadDirectory, year, month);
  }

  private getDestinationFilePath(
    uploadDirectoryPath: string,
    filename: string,
  ): string {
    return join(uploadDirectoryPath, filename);
  }
}
