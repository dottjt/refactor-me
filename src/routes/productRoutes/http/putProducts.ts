import knex from "../../../util/knex"
import { Context } from "koa"
import { Products, ProductOptions } from "../../../types/productTypes"
import { putNewSingleProductValidation, putNewSingleProductOptionValidation } from "../validation/putProductsValidation";

// 5. `PUT /products/{id}` - updates a product.
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

export const putProductRoutes = (router) => {
  router.put('/products/:id', putNewSingleProductValidation, putUpdateSingleProduct);
  router.put('/products/:id/options/:optionId', putNewSingleProductOptionValidation, putUpdateSingleProductOption);

  return router;
}
