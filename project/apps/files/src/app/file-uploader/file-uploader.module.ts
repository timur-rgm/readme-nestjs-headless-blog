import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FileModel, FileSchema } from './file.model';
import { FileRepository } from './file.repository';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.getOrThrow<string>(
          'application.uploadDirectory',
        );

        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],
  providers: [FileUploaderService, FileRepository],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
