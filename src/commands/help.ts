import { DI } from '../types';

export default async function helpCommand({ message }: DI): Promise<void> {
  await message.channel.send('Help!');
}
