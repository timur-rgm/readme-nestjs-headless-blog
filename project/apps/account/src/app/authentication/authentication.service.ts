import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';

import type { TokenPair, TokenPayload, User } from '@project/types';

import {
  AUTH_TOKEN_GENERATION_FAILED,
  AUTH_UNKNOWN_TOKEN_GENERATION_ERROR,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import {
  TokenGenerationError,
  UserExistsError,
  UserNotFoundError,
  UserWrongPasswordError,
} from './errors';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const { email, name, password, avatarUrl } = dto;

    const existingUserEntity = await this.userRepository.findByEmail(email);
    if (existingUserEntity) {
      throw new UserExistsError(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity({
      email,
      name,
      avatarUrl,
      passwordHash: '',
    }).setPassword(password);

    return this.userRepository.save(userEntity);
  }

  public async login(dto: LoginUserDto): Promise<TokenPair> {
    const userEntity = await this.verify(dto);
    return this.createTokenPair(userEntity);
  }

  public async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(AUTH_USER_NOT_FOUND);
    }
    return user;
  }

  private async verify(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;

    const userEntity = await this.userRepository.findByEmail(email);
    if (!userEntity) {
      throw new UserNotFoundError(AUTH_USER_NOT_FOUND);
    }

    const isPasswordValid = await userEntity.comparePassword(password);
    if (!isPasswordValid) {
      throw new UserWrongPasswordError(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity;
  }

  private async createTokenPair(user: User): Promise<TokenPair> {
    const payload: TokenPayload = {
      sub: user.id!,
      email: user.email,
    };

    console.log(user, payload);

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshTokenSecret = this.configService.getOrThrow<string>(
        'jwt.refreshTokenSecret',
      );
      const refreshTokenExpiresIn = this.configService.getOrThrow<StringValue>(
        'jwt.refreshTokenExpiresIn',
      );
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : AUTH_UNKNOWN_TOKEN_GENERATION_ERROR;
      this.logger.error('[Token generation error]: ' + errorMessage);
      throw new TokenGenerationError(AUTH_TOKEN_GENERATION_FAILED);
    }
  }
}
