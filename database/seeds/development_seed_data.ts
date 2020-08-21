import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<any> {
  await knex('products').del();
  await knex('productOptions').del();

  const productOneId = '8659a37b-738d-489b-bc2b-a3b0d99bb517';
  await knex('products').insert({
    id: productOneId,
    name: 'Amazing Product Name One',
    description: 'Amazing Product Description One',
    price: 10.30,
    deliveryPrice: 20.30,
  });

  const productTwoId = '66f126af-bc02-4251-adfd-826e3ca759f9';
  await knex('products').insert({
    id: productTwoId,
    name: 'Amazing Product Name Two',
    description: 'Amazing Product Description One',
    price: 10,
    deliveryPrice: 20.30,
  });

  const productOneOptionOneId = '1ed606ed-6bfc-4198-92a5-a9577028da5a';
  await knex('productOptions').insert({
    id: productOneOptionOneId,
    productId: productOneId,
    name: 'Amazing Product One Option Name One',
    description: 'Amazing Product One Option Description One',
    isNew: true
  });

  const productOneOptionTwoId = '1ed606ed-6bfc-4198-92a5-a9577028da5a';
  await knex('productOptions').insert({
    id: productOneOptionTwoId,
    productId: productOneId,
    name: 'Amazing Product One Option Name Two',
    description: 'Amazing Product One Option Description Two',
    isNew: true
  });

  const productTwoOptionOneId = '29b27d19-e4bb-4c4e-8ef1-d163870815a2';
  await knex('productOptions').insert({
    id: productTwoOptionOneId,
    productId: productTwoId,
    name: 'Amazing Product Two Option Name One',
    description: 'Amazing Product Two Option Description One',
    isNew: true
  });
}