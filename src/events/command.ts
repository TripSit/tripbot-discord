import { Client, Message } from 'discord.js';
import * as commands from '../commands';
import { COMMAND_PREFIX } from '../env';
import { Deps } from '../types';

export default function command(client: Client, deps: Deps): void {
  const { logger } = deps;

  client.on('message', (message: Message) => {
    // Only recognize messages starting with the command prefix
    if (message.content.trim().startsWith(COMMAND_PREFIX)) {
      // Break message up into arguments
      const [commandName, ...rawArgs] = message.content.trim().slice(1).split(/\s+/g);

      switch (commandName) {
        case 'help':
          commands.help(message);
          break;
        case 'barExam':
          commands.barExam(message, deps);
          break;
        default:
          throw new Error();
      }
      const cmd = commands[commandName];

      try {
        if (!cmd) await message.channel.send('Command not found.');
        else {
        //   // Parses @mentions from arguments
          const args = rawArgs.map((arg) => {
            if (/^<@.+>$/.test(arg)) {
              const mention = client.users.cache.get(arg.replace(/(^<@!?|>$)/g, ''));
              if (mention) return mention;
            }
            return arg;
          });

          await cmd({ message, client, logger }, ...args);
        }
      // } catch (ex) {
        // logger.error(ex);
        // await message.channel.send('There was an error processing your request.');
      }
    }
  });
}
