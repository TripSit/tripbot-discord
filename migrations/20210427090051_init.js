'use strict';

exports.up = async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table
      .text('discordId')
      .notNullable()
      .unique();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
