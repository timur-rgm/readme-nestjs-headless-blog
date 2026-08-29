import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { StringValue } from 'ms';

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: StringValue;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: StringValue;
}

const validationSchema: Joi.ObjectSchema<JwtConfig> = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
  refreshTokenSecret: Joi.string().required(),
  refreshTokenExpiresIn: Joi.string().required(),
});

const validateConfig = (config: unknown): JwtConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`[Account JWT Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getConfig = (): JwtConfig =>
  validateConfig({
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

export default registerAs('jwt', getConfig);
