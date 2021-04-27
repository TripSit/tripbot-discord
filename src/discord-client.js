'use strict';

const { Client } = require('discord.js');
const commandMiddleware = require('./middleware/command');
const { DISCORD_BOT_TOKEN } = require('./env');

module.exports = async function createDiscordClient(deps) {
  const client = new Client();
  client.on('message', commandMiddleware({ client, ...deps }));
  await client.login(DISCORD_BOT_TOKEN);
  return client;
};
