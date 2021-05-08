import knex from 'knex';
import knexConfig from '../knexfile';
import discordClient from './discord-client';
import createLogger from './logger';

const logger = createLogger();

discordClient({
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
