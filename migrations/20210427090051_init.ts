import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('users', (table) => {
    table.string('discordId', 18).notNullable().primary();
    table.timestamp('createdAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTableIfExists('users');
}
