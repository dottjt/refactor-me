import { Context, Next } from 'koa';
import { fullProductSchema, fullProductOptionsSchema } from '../util/productValidationUtil';

export const putNewSingleProductValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const {
    name,
    description,
    price,
    deliveryPrice,
  } = ctx.body;

  const { error } = await fullProductSchema.validateAsync({
    productId,
    name,
    description,
    price,
    deliveryPrice,
  });

  next();
};

export const putNewSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const {
    id,
    name,
    description,
    isNew,
  } = ctx.body;

  const { error } = await fullProductOptionsSchema.validateAsync({
    id,
    name,
    description,
    isNew,
    productId,
  });

  next();
};
