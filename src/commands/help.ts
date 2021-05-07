import { Message } from 'discord.js';
import formatUsage from '../utils/format-usage';
import { Deps } from '../types';

const GENERIC_HELP_MESSAGE = `
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
`;

interface HelpArgs {
  command?: string;
}

const helpCommand = {
  usage: {
    syntax: '~help [command name]',
    examples: [
      '~help',
      '~help barExam',
    ],
  },

  async parseArgs(message: Message, deps: Deps, args: string[]): Promise<HelpArgs | null> {
    if (args.length > 1) return message.reply(formatUsage(this.usage)).then(() => null);
    if (!args[0]) return {};
    return { command: args[0] };
  },

  async execute(message: Message, deps: Deps, { command }: HelpArgs): Promise<void> {
    if (!command) await message.reply(GENERIC_HELP_MESSAGE);
  },
};

export default helpCommand;
