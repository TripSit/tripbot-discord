'use strict';

const { Client } = require('discord.js');
const events = require('./events');
const { DISCORD_BOT_TOKEN } = require('./env');

module.exports = async function createDiscordClient(deps) {
  const client = new Client();
  Object.values(events).forEach((applyEvent) => applyEvent(client, deps));
  await client.login(DISCORD_BOT_TOKEN);
  return client;
};
