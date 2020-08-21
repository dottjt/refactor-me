import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { productIdSchema, productOptionIdAndProductIdSchema } from '../util/productValidationUtil';

export const deleteSingleProductValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const { error } = await productIdSchema.validateAsync({ productId });

  if (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = error;
  } else {
    return next();
  }
};

export const deleteSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const productOptionId = ctx.params.optionId;
  const { error } = await productOptionIdAndProductIdSchema.validateAsync({
    productId, productOptionId
  });

  if (error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = error;
  } else {
    return next();
  }
};
