import help from '../help';
import { createMockDeps, createMockMessage } from '../../../tests/utils';
import { CommandArgsError } from '../../types';

jest.mock('../bar-exam', () => ({
  name: 'Valid Command',
  description: 'A mock command',
  usage: {
    syntax: '~validCommand <valid argument>',
    examples: [
      '~validCommand foo',
      '~validCommand bar',
    ],
  },
}));

test('Does not allow more than one argument', async () => {
  const message = createMockMessage();
  const result = help.execute(message, createMockDeps(), ['ay', 'yo', 'dawg'],);
  await expect(result).rejects.toThrow('Command can only take up to one argument. You provided 3.');
  await expect(result).rejects.toBeInstanceOf(CommandArgsError);
  expect(message.reply).not.toHaveBeenCalled();
});

test('Display generic message if no parameters are supplied', async () => {
  const message = createMockMessage();
  await help.execute(message, createMockDeps(), []);
  expect(message.reply).toHaveBeenCalledWith(`
Generic help message placeholder.

\`\`\`
Testing codeblocks too
\`\`\`
  `.trim());
});

test('Command does not exist', async () => {
  const message = createMockMessage();
  const result = help.execute(message, createMockDeps(), ['notacommand']);
  await expect(result).rejects.toThrow('Command does not exist \'notacommand\'.');
  await expect(result).rejects.toBeInstanceOf(CommandArgsError);
  expect(message.reply).not.toBeCalled();
});

test('Prints the usage for e specific command', async () => {
  const message = createMockMessage();
  await help.execute(message, createMockDeps(), ['barexam']);
  expect(message.reply).toHaveBeenCalledWith(`
**Valid Command**
A mock command

Usage: \`~validCommand <valid argument>\`

*Examples:*
\`~validCommand foo\`
\`~validCommand bar\`
  `.trim());
});
