import { Injectable } from '@nestjs/common';

import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import {
  UserNotFoundError,
  UserExistsError,
  UserWrongPasswordError,
} from './errors';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: UserRepository) {}

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const { email, name, password, avatarUrl } = dto;

    const user = await this.blogUserRepository.findByEmail(email);
    if (user) {
      throw new UserExistsError(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity({
      email,
      name,
      avatarUrl,
      passwordHash: '',
    }).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;

    const user = await this.blogUserRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError(AUTH_USER_NOT_FOUND);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UserWrongPasswordError(AUTH_USER_PASSWORD_WRONG);
    }

    return user;
  }

  public async getById(id: string): Promise<UserEntity> {
    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(AUTH_USER_NOT_FOUND);
    }
    return user;
  }
}
