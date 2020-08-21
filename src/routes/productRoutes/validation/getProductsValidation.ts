import Joi from 'joi';
import { Context, Next } from 'koa';
import { productIdSchema, productOptionIdAndProductIdSchema } from '../util/productValidationUtil';

export const getAllProductsValidation = async (ctx: Context, next: Next) => {
  return next();
};

export const getSingleProductValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const { error } = await productIdSchema.validateAsync({ productId });

  return next();
};

export const getAllProductOptionsValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const { error } = await productIdSchema.validateAsync({ productId });

  return next();
};

export const getSingleProductOptionValidation = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;
  const productOptionId = ctx.params.optionId;
  const { error } = await productOptionIdAndProductIdSchema.validateAsync({
    productId, productOptionId
  });

  return next();
};
