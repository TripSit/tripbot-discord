import { CommandArgsError, Command } from '../types';
import barExam from './bar-exam';

const GENERIC_HELP_MESSAGE = `
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
`.trim();

const commands: Record<string, Command> = {
  barexam: barExam,
};

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

  async execute(message, deps, [commandName, ...remainingArgs]) {
    if (remainingArgs.length) {
      throw new CommandArgsError(
        `Command can only take up to one argument. You provided ${remainingArgs.length + 1}.`,
      );
    }
    if (!commandName) await message.reply(GENERIC_HELP_MESSAGE);
    else {
      const command = commands[commandName];
      if (!command) throw new CommandArgsError(`Command does not exist '${commandName}'.`);

      const examples = command.usage.examples
        .map((example) => `\`${example}\``)
        .join('\n');

      await message.reply(
        `
**${command.name}**
${command.description}

Usage: \`${command.usage.syntax}\`

*Examples:*
${examples}
        `.trim(),
      );
    }
  },
};

export default helpCommand;
