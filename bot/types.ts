import { Client } from 'discord.js';
import { Knex } from 'knex';
import { Logger } from 'winston';

export interface Deps {
  db: Knex;
  logger: Logger;
  client: Client;
}
