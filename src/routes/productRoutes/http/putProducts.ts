import knex from "../../../util/knex"
import { Context, Next } from "koa"
import { Products, ProductOptions } from "../../../types/productTypes"

// 5. `PUT /products/{id}` - updates a product.
export const putUpdateSingleProduct = async (ctx: Context) => {
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
  } catch(error) {
    throw new Error(error);
  }
}

// 10. `PUT /products/{id}/options/{optionId}` - updates the specified product option.
export const putUpdateSingleProductOption = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;
    const {
      id,
      name,
      description,
      isNew,
    } = ctx.body;

    const productOption =
      await knex<ProductOptions>('product_options')
        .update({
          id,
          name,
          description,
          isNew,
          productId,
        })
        .returning('*');

    ctx.body = { data: { productOption } };

  } catch(error) {
    throw new Error(error);
  }
}

export const putProductRoutes = (router) => {
  router.put('/products/:id', putUpdateSingleProduct);
  router.put('/products/:id/options/:optionId', putUpdateSingleProductOption);

  return router;
}
