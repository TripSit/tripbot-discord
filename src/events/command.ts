import { Client, Message } from 'discord.js';
import * as commands from '../commands';
import { COMMAND_PREFIX } from '../env';
import { Deps, Usage } from '../types';

function formatUsage({ syntax, examples }: Usage): string {
  if (!examples.length) throw new Error('Usage must contain examples.');

  return `
Invalid command.

USAGE: ${syntax}

*Examples:*
\`\`\`
${examples.join('\n')}
\`\`\`
  `.trim();
}

export default function command(client: Client, deps: Deps): void {
  const { logger } = deps;

  client.on('message', async (message: Message) => {
    // Only recognize messages starting with the command prefix from non-bot users
    if (!message.content.trim().startsWith(COMMAND_PREFIX) || message.author.bot) return;

    // Parse the message contents to remove the command prefix, and seperate arguments by whitespace
    const [commandName, ...rawArgs]: string[] = message.content.trim().slice(1).split(/\s+/g);

    // Find any matching command case insensitively
    const [, cmd] = Object.entries(commands)
      .find(([k]) => k.toLowerCase() === commandName.toLowerCase()) || [];

    // Notify user if command does not exist
    if (!cmd) await message.reply(`Command not found: ${commandName}`);
    else { // Command exists
      const args = cmd.parseArgs(message, deps, rawArgs);
      if (!args) await message.reply(formatUsage(cmd.usage));
      else {
        type Args = typeof args;
        type Execute = (message: Message, deps: Deps, args: Args) => Promise<void>;
        await (cmd.execute as Execute)(message, deps, args).catch((ex) => {
          logger.error(`Error when running command ${cmd.name}`, args, ex);
          return message.reply('There was an error running your command.');
        });
      }
    }
  });
}
