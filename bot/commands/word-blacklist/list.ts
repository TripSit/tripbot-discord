import { Command, CommandArgsError } from '../../types';

const wordBlacklistList: Command = {
  name: 'List',
  description: 'Displays the word blacklist',
  usage: {
    syntax: '~wordBlacklist list [channel name]',
    examples: [
      '~wordBlacklist list',
      '~wordBlacklist list #tripsit',
    ],
  },

  async execute(message, { config }, [channelName, ...remainingArgs]) {
    if (remainingArgs.length) {
      throw new CommandArgsError(
        `Command can only take up to one argument. You provided ${remainingArgs.length + 1}.`,
      );
    }
    if (!message.guild) {
      throw new CommandArgsError('Message must be made in the associated server.');
    }

    let words: string[];
    if (!channelName) words = config.wordBlacklist();
    else {
      const channel = message.mentions.channels.first();
      if (!channel) throw new CommandArgsError(`Channel does not exist '${channelName}'.`);
      words = config.wordBlacklist(channel.id);
    }

    const wordList = words
      .map((word, i) => `${i}. ${word}`)
      .join('\n');

    await message.reply(`
**Word Blacklist: _${channelName || 'Global'}_**
\`\`\`
${wordList}
\`\`\`
    `.trim());
  },
};

export default wordBlacklistList;
