'use strict';

jest.mock('../env', () => ({ GUILD_ID: 'mockGuildId' }));

const { getTripsitGuild } = require('../utils');

describe('getTripsitGuild', () => {
  const client = {
    guilds: {
      fetch: jest.fn(),
      cache: { get: jest.fn() },
    },
  };

  afterEach(() => {
    client.guilds.fetch.mockReset();
    client.guilds.cache.get.mockReset();
  });

  test('uses cached value if exists', async () => {
    client.guilds.cache.get.mockResolvedValue({ id: 'IAMAGUILD' });
    await expect(getTripsitGuild(client)).resolves.toEqual({ id: 'IAMAGUILD' });
    expect(client.guilds.cache.get).toHaveBeenCalledWith('mockGuildId');
    expect(client.guilds.fetch).not.toHaveBeenCalled();
  });

  test('fetches value if cached value does not exist', async () => {
    client.guilds.fetch.mockResolvedValue({ id: 'I HAVE BEEN FETCHED' });
    await expect(getTripsitGuild(client)).resolves.toEqual({ id: 'I HAVE BEEN FETCHED' });
    expect(client.guilds.cache.get).toHaveBeenCalledWith('mockGuildId');
    expect(client.guilds.fetch).toHaveBeenCalledWith('mockGuildId');
  });
});
