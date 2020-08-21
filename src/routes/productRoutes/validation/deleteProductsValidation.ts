import Joi from 'joi';
import { Context, Next } from 'koa';
import { productIdSchema, productIdAndOptionIdSchema } from '../util/productValidationUtil';

// GET PRODUCTS

// 1. `GET /products` - gets all products.
// 2. `GET /products?name={name}` - finds all products matching the specified name.


export const deleteSingleProduct = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const result = await productIdSchema.validateAsync({ productId });

    next();
};

export const deleteSingleProductOption = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const result = await productIdAndOptionIdSchema.validateAsync({
        productId, productOptionId
    });

    next();
};
