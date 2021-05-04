import knexStringcase from 'knex-stringcase';
import { DB_PATH } from './src/env';

export default knexStringcase({
  client: 'sqlite3',
  connection: {
    filename: DB_PATH,
  },
});
