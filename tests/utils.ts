import knex, { Knex } from 'knex';
import mockKnex from 'mock-knex';
import { Client, Message } from 'discord.js';
import { MockMessage } from 'jest-discordjs-mocks';
import knexConfig from '../src/knexfile';
import createLogger from '../src/logger';
import { Deps } from '../src/types';

export function createMockDb(): Knex {
  const db = knex(knexConfig);
  mockKnex.mock(db);
  return db;
}

export function createMockMessage(): Message {
  const message = new MockMessage();
  message.reply = jest.fn();
  return message;
}

export function createMockDeps(db: Knex = createMockDb()): Deps {
  return {
    db,
    client: new Client(),
    logger: createLogger(),
  };
}
