import { Context, Next } from "koa"
import knex from "../../../util/knex"
import { Products, ProductOptions } from "../../../types/productTypes"

// 4. `POST /products` - creates a new product.
export const postNewSingleProduct = async (ctx: Context) => {
  try {
    const {
      id,
      name,
      description,
      price,
      deliveryPrice,
    } = ctx.body;

    const product =
      await knex<Products>('products')
        .update({
          id,
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
      id,
      name,
      description,
      isNew,
    } = ctx.body;

    const productOption =
      await knex<ProductOptions>('product_options')
        .insert({
          id,
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

export const postProductRoutes = (router) => {
  router.post('/products', postNewSingleProductValidation, postNewSingleProduct);
  router.post('/products/:id/options', postNewSingleProductOptionValidation, postNewSingleProductOption);

  return router;
}
