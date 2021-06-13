/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from 'path';
import { config } from 'dotenv';

config();

type NodeEnv = 'production' | 'development' | 'test';
export const NODE_ENV = process.env.NODE_ENV as NodeEnv;

export const DISCORD_CLIENT_SECRET: string = process.env.DISCORD_CLIENT_SECRET!;
export const DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN!;

export const LOG_PATH: string = path.resolve(process.env.LOG_PATH!);

export const POSTGRES_HOST: string = process.env.POSTGRES_HOST!;
export const POSTGRES_USER: string = process.env.POSTGRES_USER!;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD!;
export const POSTGRES_DB: string = process.env.POSTGRES_DB!;
