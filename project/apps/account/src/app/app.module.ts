import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigAccountModule } from '@project/config-account';
import { getMongoConnectionString } from '@project/helpers';

import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigAccountModule,
    // TODO: refactor
    MongooseModule.forRootAsync({
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
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
