import knex, { Knex } from 'knex';
import mockKnex from 'mock-knex';

let db: Knex;

beforeAll(() => {
  db = knex({ client: 'sqlite3' });
});

beforeEach(() => {
  mockKnex.mock(db);
});

afterEach(() => {
  mockKnex.unmock(db);
  jest.clearAllMocks();
});

afterAll(async () => db.destroy());
