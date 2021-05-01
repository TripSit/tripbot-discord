'use strict';

exports.up = async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('discordId', 18).notNullable().primary();
    table.text('username').notNullable();
    table.text('avatar');
    table.text('locale');
    table.timestamp('createdAt').notNullable();
    table.timestamp('verifiedAt').notNullable().default(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
