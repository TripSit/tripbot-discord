import { Message } from 'discord.js';
import { DI } from '../types';

export default async function createHelpCommand({ channel }: DI): Promise<Message> {
  return channel.send('Help!');
}
