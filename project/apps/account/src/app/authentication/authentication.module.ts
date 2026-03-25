import { Module } from '@nestjs/common';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserRepository],
})
export class AuthenticationModule {}
