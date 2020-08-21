import { Context, Next } from 'koa';
import { productIdSchema, productOptionIdAndProductIdSchema } from '../util/productValidationUtil';

export const deleteSingleProduct = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const { error } = await productIdSchema.validateAsync({ productId });

    return next();
};

export const deleteSingleProductOption = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const { error } = await productOptionIdAndProductIdSchema.validateAsync({
        productId, productOptionId
    });

    return next();
};
