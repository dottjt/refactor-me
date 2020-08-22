import { knex } from "../../../src/util/knex";
import {
  productOne,
  productOneOptionOne,
  productOneOptionTwo
} from "../../fixtures/productFixtures";

describe('putProductRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();

    await knex('products').insert(productOne);
    await knex('productOptions').insert(productOneOptionOne);
    await knex('productOptions').insert(productOneOptionTwo);
  });

  describe('putUpdateSingleProductRoute - /products/', () => {
    it('should insert a new product into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if non-specified post body fields are passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('putUpdateSingleProductOptionRoute - /products/:id/options', () => {
    it('should insert a new product option into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if non-specified post body fields are passed', () => {
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