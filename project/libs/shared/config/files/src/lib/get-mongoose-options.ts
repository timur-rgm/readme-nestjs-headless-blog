import type { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@project/helpers';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: getMongoConnectionString({
      username: config.getOrThrow<string>('mongo.user'),
      password: config.getOrThrow<string>('mongo.password'),
      host: config.getOrThrow<string>('mongo.host'),
      port: config.getOrThrow<number>('mongo.port'),
      authDatabase: config.getOrThrow<string>('mongo.authBase'),
      databaseName: config.getOrThrow<string>('mongo.name'),
    }),
  }),
});
