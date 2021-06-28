import * as commandModules from '../commands';
import { COMMAND_PREFIXES } from '../env';
import {
  Deps,
  Command,
  ParentCommand,
  CommandArgsError,
  ModelValidationError,
} from '../types';

const commands = Object.fromEntries(Object.entries(commandModules)
  .map(([k, v]) => [k.toLowerCase(), v]));

export default function applyCommandEvent(deps: Deps): void {
  const { client, logger } = deps;

  client.on('message', async (message) => {
    async function execute(command: Command, args: string[]): Promise<void> {
      await command.execute(message, deps, args).catch((ex: Error) => {
        const shouldDisplayError = ex instanceof CommandArgsError
          || ex instanceof ModelValidationError;
        if (!shouldDisplayError) logger.error(ex);
        message.reply(shouldDisplayError ? ex.message : 'An unknown error has occured.');
      });
    }

    if (COMMAND_PREFIXES.includes(message.content.trim().charAt(0)) && !message.author.bot) {
      const [commandName, ...args] = message.content.trim().slice(1).split(/\s+/g);
      const command = commands[commandName.toLowerCase()];

      if (!command) await message.reply(`Command not found '${commandName}'.`);
      else if ((command as Command).execute) execute(command as Command, args);
      else {
        const [subCommandName, ...subArgs] = args;
        const subCommand = (command as ParentCommand).commands[subCommandName];
        if (!subCommand) await message.reply(`Subcommand doesn't exist '${subCommandName}'.`);
        else await execute(subCommand, subArgs);
      }
    }
  });
}
