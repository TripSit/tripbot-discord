import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('word_blacklist', (table) => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();
    table.specificType('channel_id', 'CHAR(18)');
    table.specificType('added_by', 'CHAR(18)').notNullable();
    table.text('word').notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
  await knex.schema.dropTableIfExists('word_blacklist');
}
