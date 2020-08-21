import Router from '@koa/router';
import { Context } from "koa"
import { v4 as uuidv4 } from 'uuid';

import { knex } from "../../../util/knex"
import { Products, ProductOptions } from "../../../types/productTypes"
import { postNewSingleProductValidation, postNewSingleProductOptionValidation } from "../validation/postProductsValidation";

/**
 * Creates a new Product
 * @function postNewSingleProductRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.request.body.name - required - name body parameter
 * @param {string} ctx.request.body.description - required - description body parameter
 * @param {float} ctx.request.body.price - required - price body parameter
 * @param {float} ctx.request.body.deliveryPrice - required - deliveryPrice body parameter
 */
const postNewSingleProductRoute = async (ctx: Context) => {
  try {
    const item =
      await knex<Products>('products')
        .insert({
          id: uuidv4(),
          ...ctx.request.body,
        })
        .returning('*');

    ctx.body = { data: { item } };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Adds a new Product Option to the specified product
 * @function postNewSingleProductOptionRoute
 * @param {Context} ctx - Koa context object
 *
 * @param {string} ctx.params.id - required - Product ID url parameter
 *
 * @param {string} ctx.request.body.name - required - name body parameter
 * @param {string} ctx.request.body.description - required - description body parameter
 * @param {boolean} ctx.request.body.isNew - required - isNew body parameter
 */
const postNewSingleProductOptionRoute = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    const item =
      await knex<ProductOptions>('productOptions')
        .insert({
          id: uuidv4(),
          productId,
          ...ctx.request.body,
        })
        .returning('*');

    ctx.body = { data: { item } };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * POST Product Routes Collection
 * @function postProductRoutes
 */
export const postProductRoutes = (): Router => {
  const router = new Router();

  router.post('/products', postNewSingleProductValidation, postNewSingleProductRoute);
  router.post('/products/:id/options', postNewSingleProductOptionValidation, postNewSingleProductOptionRoute);

  return router;
}
