import { Context, Next } from 'koa';
import { productIdSchema, productIdAndOptionIdSchema } from '../util/productValidationUtil';

export const deleteSingleProduct = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const { error } = await productIdSchema.validateAsync({ productId });

    next();
};

export const deleteSingleProductOption = async (ctx: Context, next: Next) => {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const { error } = await productIdAndOptionIdSchema.validateAsync({
        productId, productOptionId
    });
    
    next();
};
