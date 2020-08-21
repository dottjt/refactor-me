import { Context, Next } from "koa";
import { Products } from "../../../types/productTypes";
import knex from "../../../util/knex";

// /products/{id}
// deletes a product and its options.
const deleteSingleProduct = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    await knex<Products>('products')
      .where('id', productId)
      .delete();

    ctx.body = { data: { message: `product ${productId} deleted.` } };
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

    ctx.body = { data: { message: `Product ${productOptionId} deleted.` } };
  } catch(error) {
    throw new Error(error);
  }
}

export const deleteProductRoutes = (router) => {
  router.delete('/products/:id', deleteSingleProduct);
  router.delete('/products/:id/options/:optionId', deleteSingleProductOption);

  return router;
}
