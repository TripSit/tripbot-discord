import { Client } from 'discord.js';
import commandsEvent from './events/commands';
import { DISCORD_BOT_TOKEN } from '../env';
import { Deps } from './types';

export default async function createBot(baseDeps: Omit<Deps, 'client'>): Promise<Client> {
  const { logger } = baseDeps;
  const client = new Client();
  const deps: Deps = { ...baseDeps, client };

  client.on('ready', () => {
    logger.info('Tripbot started');
  });

  commandsEvent(deps);

  await client.login(DISCORD_BOT_TOKEN);
  return client;
}
