import { Module } from '@nestjs/common';
import { ConfigAccountModule } from '@project/config-account';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, ConfigAccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
