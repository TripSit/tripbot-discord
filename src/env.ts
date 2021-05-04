import * as path from 'path';
import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV as 'development' | 'production' | 'test';

export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;

export const COMMAND_PREFIX = process.env.COMMAND_PREFIX as string;

export const LOG_PATH = path.resolve(process.env.LOG_PATH as string);
export const DB_PATH = path.resolve(process.env.DB_PATH as string);

export const TRIPSIT_GUILD_ID = process.env.TRIPSIT_GUILD_ID as string;
export const RULES_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID as string;
export const RULES_VERIFICATION_MESSAGE_ID = process.env.WELCOME_VERIFICATION_MESSAGE_ID as string;
export const RULES_VERIFICATION_EMOJI_ID = process.env.WELCOME_VERIFICATION_EMOJI_ID as string;
export const RULES_VERIFY_ROLE_ID = process.env.RULES_VERIFY_ROLE_ID as string;
