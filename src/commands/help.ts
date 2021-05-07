import { Command } from '../types';

const GENERIC_HELP_MESSAGE = `
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
`;

interface HelpArgs {
  command?: string;
}

const helpCommand: Command<HelpArgs> = {
  name: 'Help',
  description: 'Supplies user with helpful information about the usage of this bot.',
  usage: {
    syntax: '~help [command name]',
    examples: [
      '~help',
      '~help barExam',
    ],
  },

  parseArgs(message, deps, args) {
    if (args.length > 1) return null;
    if (!args[0]) return {};
    return { command: args[0] };
  },

  async execute(message, deps, { command }) {
    if (!command) await message.reply(GENERIC_HELP_MESSAGE);
  },
};

export default helpCommand;
