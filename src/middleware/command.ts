import { Client, Message } from 'discord.js';
import commands, { Command } from '../commands';
import { COMMAND_PREFIX } from '../env';
import { BaseDI } from '../types';

interface BaseDIWithClient extends BaseDI {
  client: Client;
}

export default function commandMiddleware(
  { client, logger }: BaseDIWithClient,
): (message: Message) => void {
  return async (message) => {
    // Only recognize messages starting with the command prefix
    if (message.content.trim().startsWith(COMMAND_PREFIX)) {
      // Break message up into arguments
      const [commandName, ...rawArgs]: string[] = message.content.trim().slice(1).split(/\s+/g);
      const command: Command = commands[commandName];

      // Parse user tags into User objects
      const args = rawArgs.map((arg) => {
        if (!(arg.startsWith('<@') && arg.endsWith('>')) || !arg.startsWith('!')) {
          return arg;
        }
        const mention = arg.startsWith('!') ? arg.slice(1) : arg.slice(2, -1);
        return client.users.cache.get(mention) || arg;
      });

      try {
        if (!command) await message.channel.send('Command not found.');
        else await command({ message, client, logger }, ...args);
      } catch (ex) {
        logger.error(ex);
      }
    }
  };
}
