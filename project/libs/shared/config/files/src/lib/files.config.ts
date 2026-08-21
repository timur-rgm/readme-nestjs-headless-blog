import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface FilesConfig {
  environment: Environment;
  port: number;
  uploadDirectory: string;
}

const validationSchema: Joi.ObjectSchema<FilesConfig> = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().empty('').default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
});

const validateConfig = (config: unknown): FilesConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(
      `[Files Application Config Validation Error]: ${error.message}`,
    );
  }

  return value;
};

const getConfig = (): FilesConfig =>
  validateConfig({
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  });

export default registerAs('application', getConfig);
