import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigAccountModule,
  getMongooseOptions,
} from '@project/config-account';

import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigAccountModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
