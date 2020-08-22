import { Context, Next } from 'koa';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { productIdSchema, productOptionIdAndProductIdSchema } from '../../../util/productValidationUtil';

export const getAllProductsValidation = async (ctx: Context, next: Next): Promise<void> => {
  return next();
};

export const getSingleProductValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;
    await productIdSchema.validateAsync({ productId });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};

export const getAllProductOptionsValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;
    await productIdSchema.validateAsync({ productId });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};

export const getSingleProductOptionValidation = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    await productOptionIdAndProductIdSchema.validateAsync({
      productId, productOptionId
    });

    return next();
  } catch(error) {
    ctx.status = UNPROCESSABLE_ENTITY;
    ctx.body = { data: { errors: error.details } };
  }
};
