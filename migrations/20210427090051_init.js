'use strict';

exports.up = async function up(knex) {
  return knex.schema.createTable('users', (table) => {

  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
