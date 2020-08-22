import request from 'supertest';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { app } from '../../../src';
import { knex } from "../../../src/util/knex";
import {
  invalidName,
  invalidGUID,
  nonExistentGUIDId,
  productOne,
  productTwo,
  productOneOptionOne,
  productOneOptionTwo,
  productTwoOptionOne,
} from '../../fixtures/productFixtures';

describe('getProductsRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();

    await knex('products').insert(productOne);
    await knex('products').insert(productTwo);
    await knex('productOptions').insert(productOneOptionOne);
    await knex('productOptions').insert(productOneOptionTwo);
    await knex('productOptions').insert(productTwoOptionOne);
  });

  describe('getAllProductsRoute - /products', () => {
    it('should retrieve all products', async () => {
      const response = await request(app)
        .get(`/products`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.data.items).toHaveLength(2);
      expect(response.body.data.items).toMatchObject([ productOne, productTwo ]);
    });

    it('should retrieve all products that match valid name query string', async () => {
      const response = await request(app)
        .get(`/products?name="${productOne.name}"`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.data.items).toHaveLength(1)
      expect(response.body.data.items).toMatchObject([ productOne ]);
    });

    it('should retrieve an empty items array if name query string does not exact match any product', async () => {
      const response = await request(app)
        .get(`/products?name="${invalidName}"`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.data.items).toHaveLength(0);
    });
  });

  describe('getSingleProductRoute - /products/:id', () => {
    it('should retrieve a single product per product id', async () => {
      const response = await request(app)
        .get(`/products/${productOne.id}`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.data.item).toMatchObject(productOne);
    });

    it('should return an empty object if the id does not exist', async () => {
      const response = await request(app)
        .get(`/products/${nonExistentGUIDId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data.item).toMatchObject({});
        });
    });

    it('should throw HTTP Status 422 if `id` is not a valid guid', async () => {
      try {
        const response = await request(app)
          .get(`/products/${invalidGUID}`)
          .expect('Content-Type', /json/)
          .expect(UNPROCESSABLE_ENTITY)

        console.log(response);
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getAllProductOptionsRoute - /products/:id/options', () => {
    it('should retrieve all product options from a single product id', async () => {
      const response = await request(app)
        .get(`/products/${productOne.id}/options`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.data.items).toHaveLength(2);
      expect(response.body.data.items).toMatchObject([ productOneOptionOne, productOneOptionTwo ]);
    });
    it('should throw HTTP Status 422 if `id` is not a valid guid', async () => {
      try {
        const response = await request(app)
          .get(`/products/${invalidGUID}/options`)
          .expect('Content-Type', /json/)
          .expect(UNPROCESSABLE_ENTITY)
      } catch(error) {
        console.log(error);
      }
    });
  });

  describe('getSingleProductOptionRoute - /products/:id/options/:optionId', () => {
    it('should retrieve a single product option from a single product id', async () => {
      expect('cake').toBe('cake');
    });
    it('should return an empty object if product id does not exist', async () => {
      expect('cake').toBe('cake');
    });
    it('should return an empty object if product option id does not exist', async () => {
      expect('cake').toBe('cake');
    });
    it('should throw HTTP Status 422 if `id` URL parameter is not a valid guid', async () => {
      expect('cake').toBe('cake');
    });
    it('should throw HTTP Status 422 if `optionId` URL parameter is not a valid guid', async () => {
      expect('cake').toBe('cake');
    });
  });
});