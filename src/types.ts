import { Message, Client } from 'discord.js';
import { Logger } from 'winston';

export interface BaseDI {
  logger: Logger;
}

export interface DI extends BaseDI {
  message: Message;
  client: Client;
}
