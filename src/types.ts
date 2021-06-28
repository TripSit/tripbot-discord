import { Client, Message } from 'discord.js';
import makeError from 'make-error';
import { Knex } from 'knex';
import { Logger } from 'winston';

export const CommandArgsError = makeError('CommandArgsError');
export const ModelValidationError = makeError('ModelValidationError');

export interface Deps {
  db: Knex;
  logger: Logger;
  client: Client;
}

export interface Command {
  name: string;
  description: string;
  usage: {
    syntax: string;
    examples: string[];
  };
  execute(message: Message, deps: Deps, args: string[]): Promise<void>;
}

export interface ParentCommand {
  name: string;
  description: string;
  commands: {
    [name: string]: Command;
  };
}
