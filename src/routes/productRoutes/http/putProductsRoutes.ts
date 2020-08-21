import Router from '@koa/router';
import { Context } from "koa"

import { knex } from "../../../util/knex"
import { Products, ProductOptions } from "../../../types/productTypes"
import { putNewSingleProductValidation, putNewSingleProductOptionValidation } from "../validation/putProductsValidation";

/**
 * Updates a Product
 * @function putUpdateSingleProductRoute
 * @param {Context} ctx - Koa context object
 *
 * @param {string} ctx.params.id - required - Product Option ID url parameter
 *
 * @param {string} ctx.request.body.description - optional - description body parameter
 * @param {float} ctx.request.body.price - optional - price body parameter
 * @param {float} ctx.request.body.deliveryPrice - optional - deliveryPrice body parameter
 */
export const putUpdateSingleProductRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;

    const product =
      await knex<Products>('products')
        .where({ id: productId })
        .update({
          ...ctx.request.body,
        })
        .returning('*');

    ctx.body = { data: { product } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Updates the specified Product Option
 * @function putUpdateSingleProductOptionRoute
 * @param {Context} ctx - Koa context object
 *
 * @param {string} ctx.params.id - required - Product Option ID url parameter
 * @param {string} ctx.params.optionId - required - name body parameter
 *
 * @param {string} ctx.request.body.name - optional - name body parameter
 * @param {string} ctx.request.body.description - optional - description body parameter
 */
export const putUpdateSingleProductOptionRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const {
      name,
      description,
    } = ctx.request.body;

    const productOption =
      await knex<ProductOptions>('productOptions')
        .where({
          id: productOptionId,
          productId: productId,
        })
        .update({
          name,
          description,
        })
        .returning('*');

    ctx.body = { data: { productOption } };

  } catch(error) {
    throw new Error(error);
  }
}

/**
 * PUT Product Routes Collection
 * @function putProductRoutes
 */
export const putProductRoutes = (): Router => {
  const router = new Router();

  router.put('/products/:id', putNewSingleProductValidation, putUpdateSingleProductRoute);
  router.put('/products/:id/options/:optionId', putNewSingleProductOptionValidation, putUpdateSingleProductOptionRoute);

  return router;
}
