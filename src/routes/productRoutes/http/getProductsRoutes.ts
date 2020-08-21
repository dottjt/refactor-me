import Router from '@koa/router';
import { Context } from "koa";
import { knex } from "../../../util/knex";
import { Products, ProductOptions } from "../../../types/productTypes";
import {
  getAllProductsValidation,
  getSingleProductValidation,
  getAllProductOptionsValidation,
  getSingleProductOptionValidation
} from "../validation/getProductsValidation";

/**
 * Retrieve all Products, or finds all Products matching a specified name
 * @function getAllProducts
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.query.name - optional name query string
 */
export const getAllProducts = async (ctx: Context) => {
  try {
    const name = ctx.query.name;

    const products = name ? (
      await knex<Products>('products')
        .where({ name })
        .select('*')
    ) : (
      await knex<Products>('products')
        .select('*')
    );

    ctx.body = { data: { items: products } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Gets the Product that matches the specified Product ID
 * @function getSingleProduct
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
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

/**
 * Finds all options for a specified product ID
 * @function getAllProductOptions
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
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

/**
 * Finds the specified Product Option for the specified Product ID
 * @function getSingleProductOption
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 * @param {string} ctx.params.optionId - required - Product Option ID url parameter
 */
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

/**
 * GET Product Routes Collection
 * @function getProductRoutes
 */
export const getProductRoutes = () => {
  const router = new Router();

  router.get('/products', getAllProductsValidation, getAllProducts);
  router.get('/products/:id', getSingleProductValidation, getSingleProduct);
  router.get('/products/:id/options', getAllProductOptionsValidation, getAllProductOptions);
  router.get('/products/:id/options/:optionId', getSingleProductOptionValidation, getSingleProductOption);

  return router;
}
