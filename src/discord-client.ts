import { Client } from 'discord.js';
import * as events from './events';
import { DISCORD_BOT_TOKEN } from './env';
import { Deps } from './types';

export default async function createDiscordClient(deps: Omit<Deps, 'cilent'>): Promise<Client> {
  const { logger } = deps;

  const client = new Client();

  client.on('ready', () => {
    logger.info('Tripbot started');
  });

  events.command(client, deps);
  events.rulesVerification(client, deps);

  await client.login(DISCORD_BOT_TOKEN);
  return client;
}
