import {
  Client,
  Guild,
  TextChannel,
} from 'discord.js';
import { MockMessage } from 'jest-discordjs-mocks';
import { createLogger } from 'winston';
import knex from 'knex';
import knexConfig from '../../../knexfile-testing';
import command from '../command';

test('notifies user if command does not exist', async () => {
  const client = new Client();
  const logger = createLogger();
  const clientOnSpy = jest.spyOn(client, 'on');
  command(client, {
    client,
    logger,
    db: knex(knexConfig),
  });
  const message = new MockMessage();
  message.content = '~doesNotExist';
  const eventHandler = clientOnSpy.mock.calls[0][1] as (() => Promise<void>);
  await eventHandler();
  await expect(message.reply).resolves.toHaveBeenCalledWith('Command not found: doesNotExist');
});
