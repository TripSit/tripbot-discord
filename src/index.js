'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');
const createDiscordClient = require('./discord-client');
const createLogger = require('./logger');

const logger = createLogger();

createDiscordClient({
  logger,
  db: knex(knexConfig),
})
  .then((client) => {
    logger.serviceMessage('bootstrap', 'Tripbot started');
    return client;
  })
  .catch((ex) => {
    logger.error(ex);
    process.exit(1);
  });
