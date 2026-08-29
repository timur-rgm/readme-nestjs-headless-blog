import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Headers,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { fillRdo } from '@project/helpers';
import { MongoIdValidationPipe } from '@project/core';
import type { Request } from 'express';
import type { TokenPayload } from '@project/types';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtAccessGuard, JwtRefreshGuard } from './guards';
import {
  RefreshTokenInvalidError,
  TokenGenerationError,
  UserExistsError,
  UserNotFoundError,
  UserWrongPasswordError,
} from './errors';
import { TokenPairRdo, UserRdo } from './rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authorizationService: AuthenticationService) {}

  @Post('register')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists.',
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
      const tokenPair = await this.authorizationService.login(dto);
      return fillRdo(TokenPairRdo, tokenPair);
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: TokenPairRdo,
    status: HttpStatus.OK,
    description: 'Tokens have been successfully refreshed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Refresh token is invalid or expired.',
  })
  public async refreshToken(
    @Headers('authorization') authorization: string,
    @Req() request: Request & { user: TokenPayload },
  ): Promise<TokenPairRdo> {
    try {
      const refreshToken = authorization.replace('Bearer ', '');
      const tokenPair = await this.authorizationService.refreshToken(
        request.user,
        refreshToken,
      );
      return fillRdo(TokenPairRdo, tokenPair);
    } catch (error) {
      this.mapAuthErrorToHttp(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
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
    if (error instanceof RefreshTokenInvalidError) {
      throw new UnauthorizedException(error.message);
    }
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
