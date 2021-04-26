import { Client } from 'discord.js';
import commandMiddleware from './middleware/command';
import { DISCORD_BOT_TOKEN } from './env';
import { BaseDI } from './types';

export default async function createDiscordClient(deps: BaseDI): Promise<Client> {
  const client = new Client();
  client.on('message', commandMiddleware({ client, ...deps }));
  await client.login(DISCORD_BOT_TOKEN);
  return client;
}
