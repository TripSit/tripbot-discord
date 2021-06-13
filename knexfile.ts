import { snakeCase } from 'snake-case';
import { camelCase } from 'camel-case';
import {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './env';

export default {
  client: 'pg',
  connection: {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  },

  postProcessResponse(result: string | string[]): string | string[] {
    return Array.isArray(result)
      ? result.map((a) => camelCase(a))
      : camelCase(result);
  },

  wrapIdentifier(value: string, fn: (a: string) => string): string {
    return fn(snakeCase(value));
  },
};
