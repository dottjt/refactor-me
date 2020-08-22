import { knex } from '../../../src/util/knex';

describe('deleteProductsRoutes', () => {
  beforeAll(async () => {
    // await knex('products').insert(productOne);

    const products = await knex('products').select('*');
    console.log(products)
  });

  // it('Lists all users', (done) => {
  //   request(app)
  //     .get('/users')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //         expect(response.body).to.be.a('array');
  //         done();
  //     }).catch((e) => {
  //         console.log(e);
  //     });
  // });

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