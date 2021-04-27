'use strict';

const { GUILD_ID } = require('./env');

// Only fetches once then uses cached value
exports.getTripsitGuild = async function getTripsitGuild(client) {
  return client.guilds.cache.get(GUILD_ID) || client.guilds.fetch(GUILD_ID);
};
