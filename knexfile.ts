// @ts-ignore
import knexStringcase from 'knex-stringcase';
import { DB_PATH } from './src/env';

export default knexStringcase({ // eslint-disable-line
  client: 'sqlite3',
  connection: {
    filename: DB_PATH,
  },
});
