import { Message } from 'discord.js';
import commands, { Command } from '../commands';
import { COMMAND_PREFIX } from '../env';
import { BaseDI } from '../types';

export default function commandMiddleware(
  { logger }: BaseDI,
): (message: Message) => void {
  return ({ channel, content }) => {
    // Only recognize messages starting with the command prefix
    if (content.trim().charAt(0) === COMMAND_PREFIX) {
      // Break message up into arguments
      const [commandName, ...args] = content.trim().slice(1).split(/\s+/g);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const command: Command = commands[commandName];
      if (!command) {
        channel.send('Command not found.').catch((ex) => {
          logger.error(ex);
        });
      } else {
        command({ channel, logger }, ...args).catch((error) => {
          logger.error(error);
        });
      }
    }
  };
}
