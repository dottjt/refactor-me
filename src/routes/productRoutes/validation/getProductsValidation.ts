import Joi from 'joi';
import { Context, Next } from 'koa';
import { productIdSchema, productIdAndOptionIdSchema } from '../util/productValidationUtil';

export const getAllProductsValidation = async (ctx: Context, next: Next) => {
    next();
};

export const getSingleProductValidation = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const result = await productIdSchema.validateAsync({ productId });

    next();
};

export const getAllProductOptionsValidation = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const result = await productIdSchema.validateAsync({ productId });

    next();
};

export const getSingleProductOptionValidation = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const result = await productIdAndOptionIdSchema.validateAsync({
        productId, productOptionId
    });

    next();
};
