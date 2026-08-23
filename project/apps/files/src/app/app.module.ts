import { Module } from '@nestjs/common';

import { ConfigFilesModule } from '@project/config-files';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [ConfigFilesModule, FileUploaderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
