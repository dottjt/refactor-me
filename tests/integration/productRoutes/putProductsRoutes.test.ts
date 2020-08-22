import request from 'supertest';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { app } from '../../../src/app';
import { knex } from "../../../src/util/knex";
import {
  productOne,
  productOneOptionOne,
  invalidGUID
} from "../../fixtures/productFixtures";

describe('putProductRoutes', () => {
  beforeEach(async () => {
    await knex('productOptions').delete();
    await knex('products').delete();

    await knex('products').insert(productOne);
    await knex('productOptions').insert(productOneOptionOne);
  });

  describe('putUpdateSingleProductRoute - /products/:id', () => {
    it('should update product in the database', async () => {
      const response = await request(app.callback())
        .put(`/products/${productOne.id}`)
        .send({ name: 'hello there' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const product = await knex('products').where({ name: 'hello there' }).first('*');
      expect(product).toMatchObject({ ...productOne, name: 'hello there' });

      expect(response.body.data.item).toMatchObject({ ...productOne, name: 'hello there' });
    });

    it('should throw HTTP Status 422 if `id` URL parameter is an invalid GUID', async () => {
      const response = await request(app.callback())
        .put(`/products/${invalidGUID}`)
        .send({ name: 'hello there' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const product = await knex('products').where({ name: 'hello there' }).first('*');
      expect(product).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productId" must be a valid GUID' },
      ]);
    });

    it('should throw HTTP Status 422 if non-specified post body fields are passed', async () => {
      const response = await request(app.callback())
        .put(`/products/${productOne.id}`)
        .send({ cake: 'non-specified-post-body' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const product = await knex('products').where({ name: 'hello there' }).first('*');
      expect(product).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"cake" is not allowed' },
      ]);
    });
  });

  describe('putUpdateSingleProductOptionRoute - /products/:id/options/:optionId', () => {
    it('should insert a new product option into the database', async () => {
      const response = await request(app.callback())
        .put(`/products/${productOne.id}/options/${productOneOptionOne.id}`)
        .send({ name: 'hello there' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const productOption = await knex('productOptions').where({ name: 'hello there' }).first('*');
      expect(productOption).toMatchObject({ ...productOneOptionOne, name: 'hello there' });

      expect(response.body.data.item).toMatchObject({ ...productOneOptionOne, name: 'hello there' });
    });

    it('should throw HTTP Status 422 if non-specified post body fields are passed', async () => {
      const response = await request(app.callback())
        .put(`/products/${productOne.id}/options/${productOneOptionOne.id}`)
        .send({ cake: 'non-specified-post-body' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const productOption = await knex('productOptions').where({ name: 'hello there' }).first('*');
      expect(productOption).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"cake" is not allowed' },
      ]);
});

    it('should throw HTTP Status 422 if `id` URL parameter is not passed', async () => {
      const response = await request(app.callback())
        .put(`/products/${invalidGUID}/options/${productOneOptionOne.id}`)
        .send({ name: 'hello there' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const productOption = await knex('productOptions').where({ name: 'hello there' }).first('*');
      expect(productOption).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productId" must be a valid GUID' },
      ]);
    });

    it('should throw HTTP Status 422 if `optionId` URL parameter is not passed', async () => {
      const response = await request(app.callback())
        .put(`/products/${productOne.id}/options/${invalidGUID}`)
        .send({ name: 'hello there' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY);

      const productOption = await knex('productOptions').where({ name: 'hello there' }).first('*');
      expect(productOption).toEqual(undefined);

      expect(response.body.data.errors).toBeDefined();
      expect(response.body.data.errors).toMatchObject([
        { message: '"productOptionId" must be a valid GUID' },
      ]);
    });
  });
});