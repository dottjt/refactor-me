import Router from '@koa/router';
import { Context } from "koa"

import { knex } from "../../../util/knex"
import { Products, ProductOptions } from "../../../types/productTypes"
import { putNewSingleProductValidation, putNewSingleProductOptionValidation } from "../validation/putProductsValidation";

/**
 * Updates a Product
 * @function putUpdateSingleProduct
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product Option ID url parameter
 * @param {string} ctx.body.name - optional - name body parameter
 * @param {string} ctx.body.description - optional - description body parameter
 * @param {float} ctx.body.price - optional - price body parameter
 * @param {float} ctx.body.deliveryPrice - optional - deliveryPrice body parameter
 */
export const putUpdateSingleProduct = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const {
      name,
      description,
      price,
      deliveryPrice,
    } = ctx.body;

    const product =
      await knex<Products>('products')
        .where({ id: productId })
        .update({
          name,
          description,
          price,
          deliveryPrice,
        })
        .returning('*');

    ctx.body = { data: { product } };
  } catch(error) {
    throw new Error(error);
  }
}

// 10. `PUT /products/{id}/options/{optionId}` - updates the specified product option.
/**
 * Updates the specified Product Option
 * @function postNewSingleProductOption
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product Option ID url parameter
 * @param {string} ctx.params.optionId - required - name body parameter
 * @param {string} ctx.body.name - optional - name body parameter
 * @param {string} ctx.body.description - optional - description body parameter
 * @param {boolean} ctx.body.isNew - optional - isNew body parameter
 */
export const putUpdateSingleProductOption = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const {
      name,
      description,
      isNew,
    } = ctx.body;

    const productOption =
      await knex<ProductOptions>('product_options')
        .where({
          id: productOptionId,
          productId: productId,
        })
        .update({
          name,
          description,
          isNew,
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

  router.put('/products/:id', putNewSingleProductValidation, putUpdateSingleProduct);
  router.put('/products/:id/options/:optionId', putNewSingleProductOptionValidation, putUpdateSingleProductOption);

  return router;
}
