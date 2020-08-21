import Router from '@koa/router';
import { Context } from 'koa';

import { knex } from '../../../util/knex';
import { Products, ProductOptions } from '../../../types/productTypes';

// deletes a product and its options.
/**
 * Deletes a Product and its Product Options
 * @function deleteSingleProduct
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
const deleteSingleProduct = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    await knex<Products>('products')
      .where({ id: productId })
      .delete();

    await knex<ProductOptions>('productOptions')
      .where({ productId: productId })
      .delete();

    ctx.body = { data: { productId: `product ${productId} deleted.` } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Deletes the specified Product Option
 * @function deleteSingleProductOption
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 * @param {string} ctx.params.optionId - required - Product Option ID url parameter
 */
const deleteSingleProductOption = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    await knex<ProductOptions>('productOptions')
      .where({
        id: productOptionId,
        productId: productId,
      })
      .delete();

    ctx.body = { data: { productId: `Product ${productOptionId} deleted.` } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * DELETE Product Routes Collection
 * @function deleteProductRoutes
 */
export const deleteProductRoutes = (): Router => {
  const router = new Router();

  router.delete('/products/:id', deleteSingleProduct);
  router.delete('/products/:id/options/:optionId', deleteSingleProductOption);

  return router;
}
