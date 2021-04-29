'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');
const createTsapiClient = require('./tsapi-client');
const createDiscordClient = require('./discord-client');
const createLogger = require('./logger');

const logger = createLogger();

createDiscordClient({
  logger,
  db: knex(knexConfig),
  tsapi: createTsapiClient(),
})
  .then(() => {
    logger.info('Tripbot started...');
  })
  .catch((ex) => {
    logger.error(ex);
    process.exit(1);
  });
