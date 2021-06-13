import { CommandArgsError, Command } from './types';
import barExam from './bar-exam';

const GENERIC_HELP_MESSAGE = `
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
`;

const commands: Record<string, Command> = {
  barexam: barExam,
};

function usageMessage(command: Command): string {
  return `
**${command.name}**
${command.description}

Usage: \`${command.usage.syntax}\`
${command.usage.examples.map((acc, example) => `\`${example}\``).join('\n')}
  `;
}

const helpCommand: Command = {
  name: 'Help',
  description: 'Provides usage information about the bot and it\'s various commands',
  usage: {
    syntax: '~help [command-name]',
    examples: [
      '~help',
      '~help barExam',
    ],
  },

  async execute(message, deps, [commandName, ...args]) {
    if (args.length > 1) throw new CommandArgsError(`Command can only take up to one argument. You provided ${args.length}.`);
    if (!commandName) await message.reply(GENERIC_HELP_MESSAGE);
    const command = commands[commandName];
    if (!command) throw new CommandArgsError(`Command does not exist '${commandName}'.`);

    await message.reply(
      `
**${command.name}**
${command.description}

Usage: \`${command.usage.syntax}\`

*Examples:*
${command.usage.examples.map((example) => `\`${example}\``).join('\n')}
      `,
    );
  },
};

export default helpCommand;
