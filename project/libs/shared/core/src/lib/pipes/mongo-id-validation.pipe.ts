import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

const BAD_MONGO_ID_ERROR = 'Bad entity ID';
const MONGO_ID_PIPE_PARAMS_ONLY_ERROR =
  'MongoIdValidationPipe must be used only with params.';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MONGO_ID_PIPE_PARAMS_ONLY_ERROR);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}
