import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillRdo } from '@project/helpers';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import {
  UserExistsError,
  UserNotFoundError,
  UserWrongPasswordError,
} from './errors';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authorizationService: AuthenticationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    try {
      const user = await this.authorizationService.register(dto);
      return fillRdo(UserRdo, user.convertToObject());
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    try {
      const user = await this.authorizationService.verify(dto);
      return fillRdo(UserRdo, user.convertToObject());
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get(':id')
  public async getById(@Param('id') id: string) {
    try {
      const user = await this.authorizationService.getById(id);
      return fillRdo(UserRdo, user.convertToObject());
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  private mapAuthErrorToHttp(error: unknown): never {
    if (error instanceof UserExistsError) {
      throw new ConflictException(error.message);
    }
    if (error instanceof UserNotFoundError) {
      throw new NotFoundException(error.message);
    }
    if (error instanceof UserWrongPasswordError) {
      throw new UnauthorizedException(error.message);
    }
    throw error;
  }
}
