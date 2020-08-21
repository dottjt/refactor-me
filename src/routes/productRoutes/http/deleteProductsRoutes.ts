import Router from '@koa/router';
import { Context } from 'koa';

import { knex } from '../../../util/knex';
import { Products, ProductOptions } from '../../../types/productTypes';

/**
 * Delete a Product and its related Product Options
 * @function deleteSingleProductRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
const deleteSingleProductRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;

    await knex<Products>('products')
      .where({ id: productId })
      .delete();

    await knex<ProductOptions>('productOptions')
      .where({ productId: productId })
      .delete();

    ctx.body = { data: { id: productId } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Deletes the specified Product Option
 * @function deleteSingleProductOptionRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 * @param {string} ctx.params.optionId - required - Product Option ID url parameter
 */
const deleteSingleProductOptionRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    await knex<ProductOptions>('productOptions')
      .where({
        id: productOptionId,
        productId: productId,
      })
      .delete();

    ctx.body = { data: { id: productOptionId } };
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

  router.delete('/products/:id', deleteSingleProductRoute);
  router.delete('/products/:id/options/:optionId', deleteSingleProductOptionRoute);

  return router;
}
