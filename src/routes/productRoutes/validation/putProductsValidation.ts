import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi from 'joi';

const updateProductSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  deliveryPrice: Joi.number(),
}).options({ abortEarly: false, allowUnknown: false });

export const putNewSingleProductValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;

    await updateProductSchema.validateAsync({
      productId,
      ...ctx.request.body,
    });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};

const updateProductOptionsSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string(),
  description: Joi.string(),
}).options({ abortEarly: false, allowUnknown: false });

export const putNewSingleProductOptionValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    await updateProductOptionsSchema.validateAsync({
      id: productOptionId,
      productId,
      ...ctx.request.body
    });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};
