import knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import createDiscordClient from './discord-client';
import createLogger from './logger';

const db = knex(knexConfig);
Model.knex(db);

createDiscordClient({
  db,
  logger: createLogger(),
});
