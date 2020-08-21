import Router from '@koa/router';
import { Context } from "koa"
import { v4 as uuidv4 } from 'uuid';

import knex from "../../../util/knex"
import { Products, ProductOptions } from "../../../types/productTypes"
import { postNewSingleProductValidation, postNewSingleProductOptionValidation } from "../validation/postProductsValidation";

// 4. `POST /products` - creates a new product.
export const postNewSingleProduct = async (ctx: Context) => {
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

// 9. `POST /products/{id}/options` - adds a new product option to the specified product.
export const postNewSingleProductOption = async (ctx: Context) => {
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

export const postProductRoutes = (router): Router => {
  const router = new Router();

  router.post('/products', postNewSingleProductValidation, postNewSingleProduct);
  router.post('/products/:id/options', postNewSingleProductOptionValidation, postNewSingleProductOption);

  return router;
}
