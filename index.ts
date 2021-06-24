import knex from 'knex';
import createBot from './bot';
import knexConfig from './knexfile';
import createLogger from './logger';
import Config from './config';

Config.create().then((config) => createBot({
  config,
  db: knex(knexConfig),
  logger: createLogger(),
}));
