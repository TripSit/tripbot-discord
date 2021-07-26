import { WordBlacklist } from '@tripsit/db';
import type { Channel } from 'discord.js';
import { Command, CommandArgsError } from '../../types';

const wordBlacklistAdd: Command = {
  name: 'Add',
  description: 'Add a word to the word blacklist.',
  usage: {
    syntax: '~wordBlacklist add [channel] <word>',
    examples: [
      '~wordBlacklist add poop',
      '~wordBlacklist add #tripsit chakra',
    ],
  },

  async execute(message, deps, args) {
    let channel: Channel | undefined;
    let word: string;
    if (args.length === 1) [word] = args;
    else if (args.length === 2) {
      let channelName: string;
      [channelName, word] = args;
      channel = message.mentions.channels.first();
      if (!channel) throw new CommandArgsError(`Channel does not exist '${channelName}'.`);
    } else throw new CommandArgsError('Invalid number of parameters.');

    const wordBlacklist = new WordBlacklist();
    wordBlacklist.word = word;
    await wordBlacklist.save();
    await message.reply('Word added to blacklist.');
  },
};

export default wordBlacklistAdd;
