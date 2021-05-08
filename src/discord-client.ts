import { Client } from 'discord.js';
import * as events from './events';
import { DISCORD_BOT_TOKEN } from './env';
import { Deps } from './types';

export default async function createDiscordClient(partialDeps: Omit<Deps, 'client'>): Promise<Client> {
  const { logger } = partialDeps;

  const client = new Client();
  const deps: Deps = { ...partialDeps, client };

  client.on('ready', () => {
    logger.info('Tripbot started');
  });

  events.command(client, deps);
  events.rulesVerification(client, deps);

  await client.login(DISCORD_BOT_TOKEN);
  return client;
}
