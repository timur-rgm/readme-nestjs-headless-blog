import {
  BadRequestException,
  Injectable,
  type PipeTransform,
  type Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { isPlainObject } from '@project/helpers';
import { PostType } from '@project/types';

import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import {
  POST_PAYLOAD_IS_NOT_OBJECT,
  POST_TYPE_IS_INVALID,
} from '../post.constant';

const postTypeToCreatePostDtoClass: Record<PostType, Type> = {
  [PostType.Link]: CreateLinkPostDto,
  [PostType.Photo]: CreatePhotoPostDto,
  [PostType.Quote]: CreateQuotePostDto,
  [PostType.Text]: CreateTextPostDto,
  [PostType.Video]: CreateVideoPostDto,
};

@Injectable()
export class CreatePostValidationPipe implements PipeTransform {
  transform(value: unknown) {
    if (!isPlainObject(value)) {
      throw new BadRequestException(POST_PAYLOAD_IS_NOT_OBJECT);
    }

    const currentPostType = value['type'] as PostType;
    const postTypes = Object.values(PostType);

    if (!postTypes.includes(currentPostType)) {
      throw new BadRequestException(POST_TYPE_IS_INVALID);
    }

    const dtoClass = postTypeToCreatePostDtoClass[currentPostType];
    const dto = plainToInstance(dtoClass, value);

    const errors = validateSync(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    const validationMessages = errors.flatMap((error) =>
      Object.values(error.constraints ?? {}),
    );

    if (validationMessages.length > 0) {
      throw new BadRequestException(validationMessages);
    }

    return dto;
  }
}
