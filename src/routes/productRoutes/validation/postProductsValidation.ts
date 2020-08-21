import { Context, Next } from 'koa';
import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required(),
});

export const postNewSingleProductValidation = async (ctx: Context, next: Next) => {
  const {
    name,
    description,
    price,
    deliveryPrice,
  } = ctx.body;

  const { error } = await createProductSchema.validateAsync({
    name,
    description,
    price,
    deliveryPrice,
  });

  return next();
};

const createProductOptionsSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  isNew: Joi.boolean().required(),
});

export const postNewSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const {
    name,
    description,
    isNew,
  } = ctx.body;

  const { error } = await createProductOptionsSchema.validateAsync({
    name,
    description,
    isNew,
    productId,
  });

  return next();
};
