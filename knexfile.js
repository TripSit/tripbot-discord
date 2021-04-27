'use strict';

const knexStringcase = require('knex-stringcase');
const { DB_PATH } = require('./src/env');

module.exports = knexStringcase({
  client: 'sqlite3',
  connection: {
    filename: DB_PATH,
  },
});
