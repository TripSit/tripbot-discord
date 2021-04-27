'use strict';

const createDiscordClient = require('./discord-client');
const createLogger = require('./logger');

const logger = createLogger();

createDiscordClient({ logger })
  .then(() => {
    logger.info('Tripbot started...');
  })
  .catch((ex) => {
    logger.error(ex);
    process.exit(1);
  });
