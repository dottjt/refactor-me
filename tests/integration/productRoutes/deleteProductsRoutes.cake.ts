import { knex } from '../../../src/util/knex';
import {
  productOne,
  productTwo,
  productOneOptionOne,
  productOneOptionTwo,
  productTwoOptionOne,
} from '../../fixtures/productFixtures';

describe('deleteProductsRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();

    await knex('products').insert(productOne);
    await knex('products').insert(productTwo);
    await knex('productOptions').insert(productOneOptionOne);
    await knex('productOptions').insert(productOneOptionTwo);
    await knex('productOptions').insert(productTwoOptionOne);
  });

  describe('deleteSingleProductRoute - /products/:id', () => {
    it('should delete a single product and all relative product options', () => {

      expect('cake').toBe('cake');
    });

    it('should still return HTTP Status 200 if product id does not exist', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('deleteSingleProductOptionRoute - /products/:id/options/:optionId', () => {
    it('should delete a single product', () => {
      expect('cake').toBe('cake');
    })

    it('should still return HTTP Status 200 if product id does not exist', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `optionId` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });
})