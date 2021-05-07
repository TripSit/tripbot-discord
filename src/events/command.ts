import { Client, Message } from 'discord.js';
import * as commands from '../commands';
import { COMMAND_PREFIX } from '../env';
import { Deps } from '../types';

type Command = (message: Message, deps: Deps, args: string[]) => Promise<void>;

export default function command(client: Client, deps: Deps): void {
  const { logger } = deps;

  client.on('message', async (message: Message) => {
    // Only recognize messages starting with the command prefix from non-bot users
    if (!message.content.trim().startsWith(COMMAND_PREFIX) || message.author.bot) return;

    // Parse the message contents to remove the command prefix, and seperate arguments by whitespace
    const [commandName, ...args]: string[] = message.content.trim().slice(1).split(/\s+/g);

    const cmd = (commands as Record<string, Command>)[commandName];
    if (!cmd) await message.reply(`Command not found: ${commandName}`);
    else { // Command exists
      await cmd(message, deps, args).catch((ex) => {
        logger.error(`Error when running command ${commandName}`, args, ex);
        return message.reply('There was an error running your command.');
      });
    }
  });
}
