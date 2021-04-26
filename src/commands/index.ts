import { User } from 'discord.js';
import help from './help';
import barExam from './bar-exam';
import { DI } from '../types';

export type Command = (deps: DI, ...args: Array<string | User>) => Promise<void>;

export default {
  help,
  barExam,
} as Record<string, Command>;
