import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('products', function(table) {
    table.uuid('id').notNullable().unique().primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('price').notNullable();
    table.float('deliveryPrice').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('products');
}
