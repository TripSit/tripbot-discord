'use strict';

jest.mock('../../logger');
jest.mock('../../commands', () => ({ mockCommand: jest.fn() }));

const command = require('../command');
const logger = require('../../logger');
const commands = require('../../commands');

const send = jest.fn();

test('only does anything when message contents starts with the command prefix', async () => {
  await command({ logger })({
    channel: { send },
    content: 'i took 18mg of dibazilam will i be ok?',
  });
  expect(send).not.toHaveBeenCalled();
  expect(commands.mockCommand).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
});

test('command not found', async () => {
  await command({ logger })({
    channel: { send },
    content: '~notacommand',
  });
  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith('Command not found.');
  expect(commands.mockCommand).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
});

test.skip('command errors', async () => {
  const error = new Error('it dun broke');
  commands.mockCommand.mockRejectedValue(error);

  const message = {
    channel: { send },
    content: '~mockCommand yo yo',
  };
  const client = { a: 'b' };

  await command({ logger, client })(message);

  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith('There was an error processing your request.');
  expect(commands.mockCommand).toHaveBeenCalledWith({ message, client, logger }, 'yo', 'yo');
  expect(commands.mockCommand).toThrow(error);
  expect(logger.error).toHaveBeenCalledWith(error);
});

test('success', async () => {
  commands.mockCommand.mockResolvedValue(undefined);

  const message = {
    channel: { send },
    content: '~mockCommand ay yo',
  };
  const client = { a: 'b' };

  await expect(command({ logger, client })(message)).resolves.toBeUndefined();
  expect(send).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
  expect(commands.mockCommand).toHaveBeenCalledTimes(1);
  expect(commands.mockCommand).toHaveBeenCalledWith({ message, client, logger }, 'ay', 'yo');
});
