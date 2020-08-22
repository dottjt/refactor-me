import Router from '@koa/router';
import { Context } from 'koa';

import { knex } from '../../../util/knex';
import { Products, ProductOptions } from '../../../types/productTypes';
import { deleteSingleProductValidation, deleteSingleProductOptionValidation } from '../validation/deleteProductsValidation';

/**
 * Delete a Product and its related Product Options
 * @function deleteSingleProductRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
const deleteSingleProductRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;

    // NOTE: This will also delete all associated productOptions as specified in the productOptions migration file.
    const result = await knex<Products>('products')
      .where({ id: productId })
      .delete();

    const message = result === 1 ? (
      'Product successfully deleted.'
    ) : (
      'Product not found.'
    );

    ctx.body = { data: { message } };
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

    const result = await knex<ProductOptions>('productOptions')
      .where({
        id: productOptionId,
        productId: productId,
      })
      .delete();

    const message = result === 1 ? (
      'Product Option successfully deleted.'
    ) : (
      'Product Option not found.'
    );

    ctx.body = { data: { message } };
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

  router.delete('/products/:id', deleteSingleProductValidation, deleteSingleProductRoute);
  router.delete('/products/:id/options/:optionId', deleteSingleProductOptionValidation, deleteSingleProductOptionRoute);

  return router;
}
