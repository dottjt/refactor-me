import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required(),
}).options({ abortEarly: false, allowUnknown: false });

export const postNewSingleProductValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await createProductSchema.validateAsync({
      ...ctx.request.body,
    });

    return next();
  } catch (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};

const createProductOptionsSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
}).options({ abortEarly: false, allowUnknown: false });

export const postNewSingleProductOptionValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;

    await createProductOptionsSchema.validateAsync({
      productId,
      ...ctx.request.body,
    });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};
