import { Message } from 'discord.js';
import commands, { Command } from '../commands';
import { COMMAND_PREFIX } from '../env';
import { BaseDI } from '../types';

export default function commandMiddleware(
  { logger }: BaseDI,
): (message: Message) => void {
  return async ({ channel, content }) => {
    // Only recognize messages starting with the command prefix
    if (content.trim().charAt(0) === COMMAND_PREFIX) {
      // Break message up into arguments
      const [commandName, ...args] = content.trim().slice(1).split(/\s+/g);
      const command: Command = commands[commandName];
      try {
        if (!command) await channel.send('Command not found.');
        else await command({ channel, logger }, ...args);
      } catch (ex) {
        logger.error(ex);
      }
    }
  };
}
