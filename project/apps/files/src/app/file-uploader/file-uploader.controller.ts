import 'multer';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MongoIdValidationPipe } from '@project/core';
import { fillRdo } from '@project/helpers';

import { FileNotFoundError, UnsupportedFileTypeError } from './errors';
import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@ApiTags('files')
@Controller('files')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.CREATED,
    description: 'File has been successfully uploaded.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File type is unsupported.',
  })
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadedFileRdo> {
    try {
      const fileEntity = await this.fileUploaderService.saveFile(file);
      return fillRdo(UploadedFileRdo, fileEntity.convertToObject());
    } catch (error) {
      this.mapFileErrorToHttp(error);
    }
  }

  @Get(':fileId')
  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'File metadata found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'File not found.',
  })
  public async getFile(
    @Param('fileId', MongoIdValidationPipe) fileId: string,
  ): Promise<UploadedFileRdo> {
    try {
      const fileEntity = await this.fileUploaderService.getFile(fileId);
      return fillRdo(UploadedFileRdo, fileEntity.convertToObject());
    } catch (error) {
      this.mapFileErrorToHttp(error);
    }
  }

  private mapFileErrorToHttp(error: unknown): never {
    if (error instanceof FileNotFoundError) {
      throw new NotFoundException(error.message);
    }
    if (error instanceof UnsupportedFileTypeError) {
      throw new BadRequestException(error.message);
    }
    throw error;
  }
}
