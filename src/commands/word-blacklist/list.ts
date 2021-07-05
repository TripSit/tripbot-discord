import { WordBlacklist } from '@tripsit/db';
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

  async execute(message, deps, [channelName, ...remainingArgs]) {
    if (remainingArgs.length) {
      throw new CommandArgsError(
        `Command can only take up to one argument. You provided ${remainingArgs.length + 1}.`,
      );
    }
    if (!message.guild) {
      throw new CommandArgsError('Message must be made in the associated server.');
    }

    const words = await WordBlacklist.find()
      .then((blacklist) => blacklist
        .map(({ word }, i) => `${i + 1}. ${word}`)
        .join('\n'));

    await message.reply(`
**Word Blacklist: _${channelName || 'Global'}_**
\`\`\`
${words || 'There are no words blacklisted in this scope.'}
\`\`\`
    `.trim());
  },
};

export default wordBlacklistList;
