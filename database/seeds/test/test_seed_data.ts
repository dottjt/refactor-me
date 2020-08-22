import * as Knex from 'knex';
import {
  productOne,
  productTwo,
  productOneOptionOne,
  productOneOptionTwo,
  productTwoOptionOne,
} from '../../../tests/fixtures/productFixtures';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();
  await knex('productOptions').del();

  await knex('products').insert(productOne);
  await knex('products').insert(productTwo);
  await knex('products').insert(productOneOptionOne);
  await knex('products').insert(productOneOptionTwo);
  await knex('products').insert(productTwoOptionOne);
}
