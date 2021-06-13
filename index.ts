import knex from 'knex';
import createBot from './bot';
import knexConfig from './knexfile';
import createLogger from './logger';

createBot({
  db: knex(knexConfig),
  logger: createLogger(),
});
