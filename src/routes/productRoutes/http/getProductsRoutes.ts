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
 * @function getAllProductsRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.query.name - optional - name query string
 */
const getAllProductsRoute = async (ctx: Context): Promise<void> => {
  try {
    const name = ctx.query.name;

    const products = name ? (
      await knex<Products>('products')
        .where({ name: decodeURI(name).replace(/['"]+/g, '') })
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
 * @function getSingleProductRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
const getSingleProductRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;

    const product =
      await knex<Products>('products')
        .where({ id: productId })
        .first('*');

    ctx.body = { data: { item: product || {} } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Finds all options for a specified product ID
 * @function getAllProductOptionsRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 */
const getAllProductOptionsRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;

    const productOptions =
      await knex<ProductOptions>('productOptions')
        .where({ productId: productId })
        .select('*');

    ctx.body = { data: { items: productOptions } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * Finds the specified Product Option for the specified Product ID
 * @function getSingleProductOptionRoute
 * @param {Context} ctx - Koa context object
 * @param {string} ctx.params.id - required - Product ID url parameter
 * @param {string} ctx.params.optionId - required - Product Option ID url parameter
 */
const getSingleProductOptionRoute = async (ctx: Context): Promise<void> => {
  try {
    const productId = ctx.params.id;
    const productOptionId = ctx.params.optionId;

    const productOption =
      await knex<ProductOptions>('productOptions')
        .where({ id: productOptionId })
        .where({ productId: productId })
        .first('*');

    ctx.body = { data: { item: productOption || {} } };
  } catch(error) {
    throw new Error(error);
  }
}

/**
 * GET Product Routes Collection
 * @function getProductRoutes
 */
export const getProductRoutes = (): Router => {
  const router = new Router();

  router.get('/products', getAllProductsValidation, getAllProductsRoute);
  router.get('/products/:id', getSingleProductValidation, getSingleProductRoute);
  router.get('/products/:id/options', getAllProductOptionsValidation, getAllProductOptionsRoute);
  router.get('/products/:id/options/:optionId', getSingleProductOptionValidation, getSingleProductOptionRoute);

  return router;
}
