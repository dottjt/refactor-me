import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('productOptions', function(table) {
    table.uuid('id').notNullable().unique().primary();
    table.uuid('productId').references('products.id').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('productOptions');
}
