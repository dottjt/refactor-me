import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import Joi from 'joi';

const updateProductSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  deliveryPrice: Joi.number(),
});

export const putNewSingleProductValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const {
    name,
    description,
    price,
    deliveryPrice,
  } = ctx.body;

  const { error } = await updateProductSchema.validateAsync({
    productId,
    name,
    description,
    price,
    deliveryPrice,
  });

  if (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = error;
  } else {
    return next();
  }
};

const updateProductOptionsSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string(),
  description: Joi.string(),
  isNew: Joi.boolean(),
});

export const putNewSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const productOptionId = ctx.params.optionId;
  const {
    name,
    description,
    isNew,
  } = ctx.body;

  const { error } = await updateProductOptionsSchema.validateAsync({
    id: productOptionId,
    name,
    description,
    isNew,
    productId,
  });

  if (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = error;
  } else {
    return next();
  }
};
