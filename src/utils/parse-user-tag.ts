import { Client, User } from 'discord.js';

export default function parseUserTag(client: Client, tag: string): User | null {
  return client.users.cache.get(tag.replace(/(^<@!?|>$)/g, '')) || null;
}
