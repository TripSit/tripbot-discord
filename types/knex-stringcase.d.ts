import { Knex } from 'knex';

declare module 'knex-stringcase' {
  export default function (config: Knex.Config): Knex.Config;
}
