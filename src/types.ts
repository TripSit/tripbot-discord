import { Client, Message } from 'discord.js';
import { Knex } from 'knex';
import { Logger } from 'winston';

export interface Deps {
  client: Client;
  logger: Logger;
  db: Knex;
}

export interface Usage {
  syntax: string;
  examples: string[];
}

export interface Command<Args> {
  name: string;
  description: string;
  usage: Usage;
  parseArgs(message: Message, deps: Deps, args: string[]): Args | null;
  execute(message: Message, deps: Deps, args: Args): Promise<void>;
}
