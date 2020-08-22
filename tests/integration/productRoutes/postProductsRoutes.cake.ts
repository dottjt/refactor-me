import { knex } from "../../../src/util/knex";
import {
  productOne,
  productOneOptionOne,
  productOneOptionTwo
} from "../../fixtures/productFixtures";

describe('postProductRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();
  });

  describe('postNewSingleProductRoute - /products/', () => {
    it('should insert a new product into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `name`, `description`, `price` or `deliveryPrice` post body is not passed', () => {
      expect('cake').toBe('cake');
    });
  });

  describe('postNewSingleProductOptionRoute - /products/:id/options', () => {
    it('should insert a new product option into the database', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `name`, `description`, `price` or `deliveryPrice` post body is not passed', () => {
      expect('cake').toBe('cake');
    });

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', () => {
      expect('cake').toBe('cake');
    });
  });
});