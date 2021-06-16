import { Knex } from 'knex';
import { Client } from 'discord.js';
import { MockMessage } from 'jest-discordjs-mocks';
import help from '../help';
import createLogger from '../../../logger';
import { CommandArgsError } from '../../types';

jest.mock('../bar-exam', () => ({
  name: 'Valid Command',
  description: 'A mock command',
  usage: {
    syntax: '~validCommand <valid argument>',
    examples: [
      '~validCommand foo',
      '~validCommand bar',
    ],
  },
}));

test('Does not allow more than one argument', async () => {
  const message = new MockMessage();
  message.reply = jest.fn();
  const result = help.execute(
    message,
    {
      db: {} as Knex,
      client: {} as Client,
      logger: createLogger(),
    },
    ['ay', 'yo', 'dawg'],
  );
  await expect(result).rejects.toThrow('Command can only take up to one argument. You provided 3.');
  await expect(result).rejects.toBeInstanceOf(CommandArgsError);
  expect(message.reply).not.toHaveBeenCalled();
});

test('Display generic message if no parameters are supplied', async () => {
  const message = new MockMessage();
  message.reply = jest.fn();
  await help.execute(
    message,
    {
      db: {} as Knex,
      client: {} as Client,
      logger: createLogger(),
    },
    [],
  );
  expect(message.reply).toHaveBeenCalledWith(`
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
  `.trim());
});

test('Command does not exist', async () => {
  const message = new MockMessage();
  message.reply = jest.fn();
  const result = help.execute(
    message,
    {
      db: {} as Knex,
      client: {} as Client,
      logger: createLogger(),
    },
    ['notacommand'],
  );
  await expect(result).rejects.toThrow('Command does not exist \'notacommand\'.');
  await expect(result).rejects.toBeInstanceOf(CommandArgsError);
  expect(message.reply).not.toBeCalled();
});

test('Prints the usage for e specific command', async () => {
  const message = new MockMessage();
  message.reply = jest.fn();
  await help.execute(
    message,
    {
      db: {} as Knex,
      client: {} as Client,
      logger: createLogger(),
    },
    ['barexam'],
  );
  expect(message.reply).toHaveBeenCalledWith(`
**Valid Command**
A mock command

Usage: \`~validCommand <valid argument>\`

*Examples:*
\`~validCommand foo\`
\`~validCommand bar\`
  `.trim());
});
