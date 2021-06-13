import { Client, Message } from 'discord.js';
import * as commandModules from '../commands';
import { Deps } from '../types';

const commands = Object.fromEntries(Object.entries(commandModules)
  .map(([k, v]) => [k.toLowerCase(), v]));

export default function applyCommandEvent(deps: Deps): void {
  deps.client.on('message', async (message: Message): Promise<void> => {
    if (['~', ','].includes(message.content.trim().charAt(0)) && !message.author.bot) {
      const [commandName, ...args] = message.content.trim().slice(1).split(/\s+/g);
      const command = commands[commandName.toLowerCase()];
      if (!command) await message.reply(`Command not found '${commandName}'.`);
      else await command.execute(message, deps, args);
    }
  });
}
