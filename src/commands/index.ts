import { Message } from 'discord.js';
import help from './help';
import { DI } from '../types';

export type Command = (deps: DI, ...args: unknown[]) => Promise<Message>;

export default {
  help: async (message: DI): Promise<Message> => help(message),
} as Record<string, Command>;
