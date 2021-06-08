import { Knex } from 'knex';

declare module 'knex-stringcase' {
  export default function knexStringcase(config: Knex.Config): Knex.Config;
}
