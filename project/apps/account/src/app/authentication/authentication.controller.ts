import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { fillRdo } from '@project/helpers';
import { MongoIdValidationPipe } from '@project/core';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  TokenGenerationError,
  UserExistsError,
  UserNotFoundError,
  UserWrongPasswordError,
} from './errors';
import { TokenPairRdo } from './rdo/token-pair.rdo';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authorizationService: AuthenticationService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  public async register(@Body() dto: CreateUserDto): Promise<UserRdo> {
    try {
      const userEntity = await this.authorizationService.register(dto);
      return fillRdo(UserRdo, userEntity.convertToObject());
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  @Post('login')
  @ApiResponse({
    type: TokenPairRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@Body() dto: LoginUserDto): Promise<TokenPairRdo> {
    try {
      return this.authorizationService.login(dto);
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
  public async getById(
    @Param('id', MongoIdValidationPipe) id: string,
  ): Promise<UserRdo> {
    try {
      const userEntity = await this.authorizationService.getById(id);
      return fillRdo(UserRdo, userEntity.convertToObject());
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  private mapAuthErrorToHttp(error: unknown): never {
    if (error instanceof TokenGenerationError) {
      throw new InternalServerErrorException(error.message);
    }
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
