import Router from '@koa/router';
import { Context } from 'koa';

import knex from '../../../util/knex';
import { Products } from '../../../types/productTypes';

// /products/{id}
// deletes a product and its options.
const deleteSingleProduct = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    await knex<Products>('products')
      .where('id', productId)
      .delete();

    ctx.body = { data: { productId: `product ${productId} deleted.` } };
  } catch(error) {
    throw new Error(error);
  }
}

// /products/{id}/options/{optionId}
// deletes the specified product option.
const deleteSingleProductOption = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    await knex<Products>('products')
      .where('id', productId)
      .delete();

    ctx.body = { data: { productOptionId: `Product ${productOptionId} deleted.` } };
  } catch(error) {
    throw new Error(error);
  }
}

export const deleteProductRoutes = (): Router => {
  const router = new Router();

  router.delete('/products/:id', deleteSingleProduct);
  router.delete('/products/:id/options/:optionId', deleteSingleProductOption);

  return router;
}
