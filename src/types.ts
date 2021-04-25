import { TextChannel, DMChannel, NewsChannel } from 'discord.js';
import { Logger } from 'winston';

export interface BaseDI {
  logger: Logger;
}

export interface DI extends BaseDI {
  channel: TextChannel | DMChannel | NewsChannel;
}
