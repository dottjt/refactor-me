import request from 'supertest';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { app } from '../../../src/app';
import { knex } from "../../../src/util/knex";
import {
  productOne,
  productOnePostBody,
  productOneOptionOnePostBody,
  invalidGUID,
} from "../../fixtures/productFixtures";

describe('postProductRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();
  });

  describe('postNewSingleProductRoute - /products/:id', () => {
    it('should insert a new product into the database', async () => {
      const response = await request(app.callback())
        .post(`/products`)
        .send(productOnePostBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(1);

      const product = await knex('products').where({ name: productOnePostBody.name }).first('*');
      expect(product).toMatchObject(productOnePostBody);

      expect(response.body.data.item).toMatchObject(productOnePostBody);
    });

    it('should throw HTTP Status 422 if `name`, `description`, `price` or `deliveryPrice` post body is not passed', async () => {
      const response = await request(app.callback())
        .post(`/products`)
        .send({ name: productOnePostBody.name })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(0);

      const product = await knex('products').where({ name: productOnePostBody.name }).first('*');
      expect(product).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"description" is required' },
        { message: '"price" is required' },
        { message: '"deliveryPrice" is required' },
      ]);
    });
  });

  describe('postNewSingleProductOptionRoute - /products/:id/options', () => {
    beforeEach(async () => {
      await knex('products').insert(productOne);
    });

    it('should insert a new product option into the database', async () => {
      const response = await request(app.callback())
        .post(`/products/${productOne.id}/options`)
        .send(productOneOptionOnePostBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const productOptions = await knex('productOptions').select('*');
      expect(productOptions).toHaveLength(1);

      const productOption = await knex('productOptions').where({ name: productOneOptionOnePostBody.name }).first('*');
      expect(productOption).toMatchObject(productOneOptionOnePostBody);

      expect(response.body.data.item).toMatchObject(productOneOptionOnePostBody);
    });

    it('should throw HTTP Status 422 if `name` or `description` post body is not passed', async () => {
      const response = await request(app.callback())
        .post(`/products/${productOne.id}/options`)
        .send({ name: productOneOptionOnePostBody.name })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const productOptions = await knex('productOptions').select('*');
      expect(productOptions).toHaveLength(0);

      const productOption = await knex('productOptions').where({ name: productOneOptionOnePostBody.name }).first('*');
      expect(productOption).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"description" is required' },
      ]);
    });

    it('should throw HTTP Status 422 if `id` URL parameter is an invalid GUID', async () => {
      const response = await request(app.callback())
        .post(`/products/${invalidGUID}/options`)
        .send(productOneOptionOnePostBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const productOptions = await knex('productOptions').select('*');
      expect(productOptions).toHaveLength(0);

      const productOption = await knex('productOptions').where({ name: productOneOptionOnePostBody.name }).first('*');
      expect(productOption).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productId" must be a valid GUID' },
      ]);
    });
  });
});