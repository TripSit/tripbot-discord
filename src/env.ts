import * as path from 'path';
import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV as 'production' | 'development' | 'test';

export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;

export const COMMAND_PREFIX = process.env.COMMAND_PREFIX as string;

export const LOG_PATH = path.resolve(process.env.LOG_PATH as string);
