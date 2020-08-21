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
 * @param {string} ctx.body.name - required - name body parameter
 * @param {string} ctx.body.description - required - description body parameter
 * @param {float} ctx.body.price - required - price body parameter
 * @param {float} ctx.body.deliveryPrice - required - deliveryPrice body parameter
 */
const postNewSingleProductRoute = async (ctx: Context) => {
  try {
    const {
      name,
      description,
      price,
      deliveryPrice,
    } = ctx.body;

    const product =
      await knex<Products>('products')
        .insert({
          id: uuidv4(),
          name,
          description,
          price,
          deliveryPrice,
        })
        .returning('*');

    ctx.body = { data: { product } };
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
 * @param {string} ctx.body.name - required - name body parameter
 * @param {string} ctx.body.description - required - description body parameter
 * @param {boolean} ctx.body.isNew - required - isNew body parameter
 */
const postNewSingleProductOptionRoute = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const {
      name,
      description,
      isNew,
    } = ctx.body;

    const productOption =
      await knex<ProductOptions>('product_options')
        .insert({
          id: uuidv4(),
          name,
          description,
          isNew,
          productId,
        })
        .returning('*');

    ctx.body = { data: { productOption } };

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
