import { Context, Next } from "koa";
import knex from "../../../db/knex";
import { Products, ProductOptions } from "../../../types/productTypes";


// 1. `GET /products` - gets all products.
// 2. `GET /products?name={name}` - finds all products matching the specified name.
export const getAllProducts = async (ctx: Context, next: Next) => {
  try {
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
export const getSingleProduct = async (ctx: Context, next: Next) => {
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
export const getAllProductOptions = async (ctx: Context, next: Next) => {
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

// 8. `GET /products/{id}/options/{optionId}` - finds the specified product option for
export const getSingleProductOption = async (ctx: Context, next: Next) => {
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

