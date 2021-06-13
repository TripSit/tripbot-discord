import { Client, Message } from 'discord.js';
import makeError from 'make-error';
import { Deps as BaseDeps } from '../types';

export const CommandArgsError = makeError('CommandArgsError');

export interface Deps extends BaseDeps {
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
