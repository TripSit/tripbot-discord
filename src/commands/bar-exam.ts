import { User } from 'discord.js';
import parseUserTag from '../utils/parse-user-tag';
import { Command } from '../types';

interface BarExamArgs {
  recipient: User;
}

const barExamCommand: Command<BarExamArgs> = {
  name: 'Bar Exam',
  description: 'A test to determine if a user is blacked out or not',
  usage: {
    syntax: '~barExam <user tag>',
    examples: ['~barExam @Example123'],
  },

  parseArgs(message, { client }, args) {
    if (args.length !== 1) return null;
    const recipient = parseUserTag(client, args[0]);
    return recipient && { recipient };
  },

  async execute(message, deps, { recipient }) {
    if (!recipient) await message.reply('ay');
  },
};

export default barExamCommand;

// export default async function barExamCommand(
//   message: Message,
//   { logger }: Deps,
//   args: string[],
// ): Promise<void> {
//   await recipient.send(`
//     ${message.author.tag} has initiated a check to see if you're potentially having memory
//     issues. Simply don't respond to this message if you don't wish to partake and if you do
//     respond with any text and follow the resulting instructions.
//   `);
//   logger.info(`[BAR EXAM]: ${message.author.tag} initiated for ${recipient.tag}`);
// }
