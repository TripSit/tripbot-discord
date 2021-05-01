'use strict';

const { Client } = require('discord.js');
const events = require('./events');
const { DISCORD_BOT_TOKEN } = require('./env');

module.exports = async function createDiscordClient(deps) {
  const client = new Client();
  await client.login(DISCORD_BOT_TOKEN);
  await Promise.all(Object.values(events).map((applyEvent) => applyEvent({ client, ...deps })));
  return client;
};
