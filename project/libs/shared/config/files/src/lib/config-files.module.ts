import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import filesConfig from './files.config';
import mongoConfig from './mongo.config';

const ENV_FILE_PATH = 'apps/files/files.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class ConfigFilesModule {}
