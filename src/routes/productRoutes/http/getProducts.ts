import { Context, Next } from "koa";
import knex from "../../../util/knex";
import { Products, ProductOptions } from "../../../types/productTypes";
import {
  getAllProductsValidation,
  getSingleProductValidation,
  getAllProductOptionsValidation,
  getSingleProductOptionValidation
} from "../validation/getProductsValidation";

// 1. `GET /products` - gets all products.
// 2. `GET /products?name={name}` - finds all products matching the specified name.
const getAllProducts = async (ctx: Context) => {
  try {
    const name = ctx.query;
    // Rate limiting node.js API
    // Add limitation to the number of products you can retrieve

    console.log(ctx.query);

    const products = await knex<Products>('products').select('*');

    ctx.body = { data: { items: products } };
  } catch(error) {
    throw new Error(error);
  }
}

// 3. `GET /products/{id}` - gets the project that matches the specified ID - ID is a
const getSingleProduct = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    const product =
      await knex<Products>('products')
        .where({ id: productId })
        .first('*');

    ctx.body = { data: { items: [ product ] } };
  } catch(error) {
    throw new Error(error);
  }
}

// 7. `GET /products/{id}/options` - finds all options for a specified product.
const getAllProductOptions = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;

    const productOptions =
      await knex<ProductOptions>('product_options')
        .where({ productId: productId })
        .select('*');

    ctx.body = { data: { items: productOptions } };
  } catch(error) {
    throw new Error(error);
  }
}

// 8. `GET /products/{id}/options/{optionId}`
const getSingleProductOption = async (ctx: Context) => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    const productOption =
      await knex<ProductOptions>('product_options')
        .where({ id: productOptionId })
        .where({ productId: productId })
        .first('*');

    ctx.body = { data: { items: [ productOption ] } };
  } catch(error) {
    throw new Error(error);
  }
}

export const getProductRoutes = (router) => {
  router.get('/products', getAllProductsValidation, getAllProducts);
  router.get('/products/:id', getSingleProductValidation, getSingleProduct);
  router.get('/products/:id/options', getAllProductOptionsValidation, getAllProductOptions);
  router.get('/products/:id/options/:optionId', getSingleProductOptionValidation, getSingleProductOption);

  return router;
}
