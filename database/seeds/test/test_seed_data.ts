import * as Knex from 'knex';
import {
  productOne,
  productTwo,
  productOneOptionOne,
  productOneOptionTwo,
  productTwoOptionOne,
} from '../../../tests/fixtures/productFixtures';

export async function seed(knex: Knex): Promise<void> {
  await knex('productOptions').del();
  await knex('products').del();

  await knex('products').insert(productOne);
  await knex('products').insert(productTwo);
  await knex('productOptions').insert(productOneOptionOne);
  await knex('productOptions').insert(productOneOptionTwo);
  await knex('productOptions').insert(productTwoOptionOne);
}
