import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const validationSchema: Joi.ObjectSchema<MongoConfig> = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().empty('').default(DEFAULT_MONGO_PORT),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

const validateConfig = (config: unknown): MongoConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`[DB Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getConfig = (): MongoConfig =>
  validateConfig({
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

export default registerAs('db', getConfig);
