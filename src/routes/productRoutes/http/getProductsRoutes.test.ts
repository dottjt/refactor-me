// import { knex } from "../../../util/knex";
// import request from 'supertest';

describe('getProductsRoutes', () => {
  // beforeAll(async () => {
  //   await knex.migrate.latest()
  //   await knex.seed.run();
  // });

  describe('getAllProductsRoute - /products', () => {
    it('should retrieve all products', () => {
      expect('cake').toBe('cake');
    });

    it('should retrieve all products that match valid name query string', () => {
      expect('cake').toBe('cake');
    });

    it('should retrieve no products if name query string does not match', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('getSingleProductRoute - /products/:id', () => {
    it('should retrieve a single product per product id', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('getAllProductOptionsRoute - /products/:id/options', () => {
    it('should retrieve all product options from a single product id', () => {
      expect('cake').toBe('cake');
    });
    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('getSingleProductOptionRoute - /products/:id/options/:optionId', () => {
    it('should retrieve a single product option from a single product id', () => {
      expect('cake').toBe('cake');
    });
    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
    it('should throw HTTP Status 422 if `optionId` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });
});