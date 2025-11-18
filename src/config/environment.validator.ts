import Joi from 'joi';

export const environmentValidator = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.string().required(),
  JWT_REFRESH_EXPIRES: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().required().default(3000),
  DB_USER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_BUCKET: Joi.string().required(),
  UPSTASH_REDIS_REST_URL: Joi.string().required(),
  UPSTASH_REDIS_REST_TOKEN: Joi.string().required(),
});
