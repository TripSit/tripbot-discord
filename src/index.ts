import knex from 'knex';
import knexConfig from '../knexfile';
import createDiscordClient from './discord-client';
import createLogger from './logger';

const logger = createLogger();

createDiscordClient({
  logger,
  db: knex(knexConfig),
})
  .then((client) => {
    logger.info('Tripbot started...');
    return client;
  })
  .catch((ex) => {
    logger.error(ex);
    process.exit(1);
  });
