import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import applicationConfig from './application.config';
import jwtConfig from './jwt.config';
import mongoConfig from './mongo.config';

const ENV_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class ConfigAccountModule {}

