import { Message } from 'discord.js';

export default async function helpCommand(message: Message): Promise<void> {
  await message.channel.send('Help!');
}
