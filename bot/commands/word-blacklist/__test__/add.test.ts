import addCommand from '../add';
import { createMockDeps, createMockMessage } from '../../../../tests/utils';
import { CommandArgsError } from '../../../types';

describe('execute', () => {
  test('Throws error for invalid number of args', async () => {
    const message = createMockMessage();
    const result = addCommand.execute(message, createMockDeps(), []);
    await expect(result).rejects.toThrow('Invalid number of parameters.');
    await expect(result).rejects.toBeInstanceOf(CommandArgsError);
    expect(message.reply).not.toHaveBeenCalled();
  });
});
