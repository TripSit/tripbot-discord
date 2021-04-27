'use strict';

const { Client } = require('discord.js');
const events = require('./events');
const { DISCORD_BOT_TOKEN } = require('./env');

module.exports = async function createDiscordClient(baseDeps) {
  const client = new Client();
  const deps = { ...baseDeps, client };

  client.on('message', events.command(deps));
  client.on('messageReactionAdd', events.welcomeVerification(deps));

  await client.login(DISCORD_BOT_TOKEN);
  return client;
};
