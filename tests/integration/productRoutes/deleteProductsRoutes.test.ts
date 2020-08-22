import request from 'supertest';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { app } from '../../../src/app';
import { knex } from '../../../src/util/knex';
import {
  invalidGUID,
  nonExistentGUID,
  productOne,
  productTwo,
  productOneOptionOne,
  productOneOptionTwo,
  productTwoOptionOne,
} from '../../fixtures/productFixtures';

describe('deleteProductsRoutes', () => {
  beforeEach(async () => {
    await knex('products').delete();
    await knex('productOptions').delete();

    await knex('products').insert(productOne);
    await knex('products').insert(productTwo);
    await knex('productOptions').insert(productOneOptionOne);
    await knex('productOptions').insert(productOneOptionTwo);
    await knex('productOptions').insert(productTwoOptionOne);
  });

  describe('deleteSingleProductRoute - /products/:id', () => {
    it('should delete a single product and all relative product options', async () => {
      const response = await request(app.callback())
        .delete(`/products/${productOne.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const product = await knex('products').where({ id: productOne.id }).first('*');
      expect(product).toEqual(undefined);

      const productOptionOne = await knex('productOptions').where({ id: productOneOptionOne.id }).first('*');
      expect(productOptionOne).toEqual(undefined);

      const productOptionTwo = await knex('productOptions').where({ id: productOneOptionTwo.id }).first('*');
      expect(productOptionTwo).toEqual(undefined);

      const productOptionOneTwo = await knex('productOptions').where({ id: productTwoOptionOne.id }).first('*');
      expect(productOptionOneTwo).toMatchObject(productTwoOptionOne);

      expect(response.body.data.message).toEqual('Product successfully deleted.');
    });

    it('should still return HTTP Status 200 if product id does not exist', async () => {
      const response = await request(app.callback())
        .delete(`/products/${nonExistentGUID}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.message).toEqual('Product not found.');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is an invalid GUID', async () => {
      const response = await request(app.callback())
        .delete(`/products/${invalidGUID}`)
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productId" must be a valid GUID' },
      ]);
    });
  });

  describe('deleteSingleProductOptionRoute - /products/:id/options/:optionId', () => {
    it('should delete a single product option', async () => {
      const response = await request(app.callback())
        .delete(`/products/${productOne.id}/options/${productOneOptionOne.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

        const product = await knex('products').where({ id: productOne.id }).first('*');
        expect(product).toMatchObject(productOne);

        const productOptionOne = await knex('productOptions').where({ id: productOneOptionOne.id }).first('*');
        expect(productOptionOne).toEqual(undefined);

        const productOptionTwo = await knex('productOptions').where({ id: productOneOptionTwo.id }).first('*');
        expect(productOptionTwo).toMatchObject(productOneOptionTwo);

        const productOptionOneTwo = await knex('productOptions').where({ id: productTwoOptionOne.id }).first('*');
        expect(productOptionOneTwo).toMatchObject(productTwoOptionOne);

        expect(response.body.data.message).toEqual('Product Option successfully deleted.');
    });

    it('should still return HTTP Status 200 if product does not exist', async () => {
      const response = await request(app.callback())
        .delete(`/products/${nonExistentGUID}/options/${productOneOptionOne.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.message).toEqual('Product Option not found.');
    });

    it('should still return HTTP Status 200 if product option does not exist', async () => {
      const response = await request(app.callback())
        .delete(`/products/${productOne.id}/options/${nonExistentGUID}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.message).toEqual('Product Option not found.');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', async () => {
      const response = await request(app.callback())
        .delete(`/products/${invalidGUID}/options/${productOneOptionOne.id}`)
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productId" must be a valid GUID' },
      ]);
    });

    it('should throw HTTP Status 422 if `optionId` URL parameter is not passed', async () => {
      const response = await request(app.callback())
        .delete(`/products/${productOne.id}/options/${invalidGUID}`)
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const products = await knex('products').select('*');
      expect(products).toHaveLength(2);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productOptionId" must be a valid GUID' },
      ]);
    });
  });
});
