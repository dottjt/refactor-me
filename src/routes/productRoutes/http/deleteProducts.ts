import { Context, Next } from "koa";
import { Products } from "../../../types/productTypes";
import knex from "../../../db/knex";

// /products/{id}
// deletes a product and its options.
export const deleteSingleProduct = async (ctx: Context, next: Next) => {
  const productId = ctx.params.id;

  // TODO
  // if (!productId) {
  // return 422
  //   ctx.body = { }
  // }

  await knex<Products>('products').where('id', productId).delete();

  ctx.body = { data: { message: 'product deleted' } };
}


// /products/{id}/options/{optionId}
// deletes the specified product option.
export const deleteSingleProductOption = async (ctx: Context, next: Next) => {
  const body = ctx.request.body;

  // validate whether

  // Joi validation

  await knex<Products>('products').where('id', productId).delete();

  ctx.body = { data: { message: `Product ${productId} deleted.` } };
}
