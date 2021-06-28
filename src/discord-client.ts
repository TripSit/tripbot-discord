import { Client } from 'discord.js';
import commandsEvent from './events/commands';
import { DISCORD_BOT_TOKEN } from './env';
import { Deps } from './types';

type BaseDeps = Omit<Deps, 'client'>;

export default async function createDiscordClient(baseDeps: BaseDeps): Promise<Client> {
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
