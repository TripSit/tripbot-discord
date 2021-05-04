import { Knex } from 'knex';
import { Logger } from 'winston';

export interface Deps {
  logger: Logger;
  db: Knex;
}
