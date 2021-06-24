import { Client, Message } from 'discord.js';
import makeError from 'make-error';
import { Knex } from 'knex';
import { Logger } from 'winston';
import Config from '../config';

export const CommandArgsError = makeError('CommandArgsError');

export interface Deps {
  db: Knex;
  logger: Logger;
  client: Client;
  config: Config;
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
    [commandName: string]: Command;
  };
}
