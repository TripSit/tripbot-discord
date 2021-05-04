import { Client } from 'discord.js';
import * as events from './events';
import { DISCORD_BOT_TOKEN } from './env';
import { Deps } from './types';

export default async function createDiscordClient(deps: Deps): Promise<Client> {
  const client = new Client();
  await client.login(DISCORD_BOT_TOKEN);

  events.command(client, deps);
  events.rulesVerification(client, deps);

  return client;
}
