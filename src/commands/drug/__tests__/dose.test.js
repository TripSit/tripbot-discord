'use strict';

const dose = require('../dose');

const message = { reply: jest.fn() };
const tsapi = { query: jest.fn() };

afterEach(() => {
  message.reply.mockReset();
  tsapi.query.mockReset();
});

test('no results found', async () => {
  tsapi.query.mockResolvedValue(null);
  await dose({ message, tsapi }, 'notarealdrug');
  expect(message.reply).toHaveBeenCalledWith('No results for notarealdrug.');
});
