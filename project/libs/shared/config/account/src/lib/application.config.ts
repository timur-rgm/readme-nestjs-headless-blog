import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface ApplicationConfig {
  environment: Environment;
  port: number;
}

const validationSchema: Joi.ObjectSchema<ApplicationConfig> = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().empty('').default(DEFAULT_PORT),
});

const validateConfig = (config: unknown): ApplicationConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getConfig = (): ApplicationConfig =>
  validateConfig({
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  });

export default registerAs('application', getConfig);
