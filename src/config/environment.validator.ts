import Joi from 'joi';

export const environmentValidator = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.string().required(),
  JWT_REFRESH_EXPIRES: Joi.string().required(),
});
