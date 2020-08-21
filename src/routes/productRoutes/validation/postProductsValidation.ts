import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required(),
}).options({ allowUnknown: false });

export const postNewSingleProductValidation = async (ctx: Context, next: Next) => {
  try {
    await createProductSchema.validateAsync({
      ...ctx.request.body,
    });
    return next();
  } catch (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { message: error.details.message } }
  }
};

const createProductOptionsSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  isNew: Joi.boolean().required(),
}).options({ allowUnknown: false });

export const postNewSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  try {
    const productId = ctx.params.id;

    await createProductOptionsSchema.validateAsync({
      productId,
      ...ctx.request.body,
    });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = error;
  }
};
