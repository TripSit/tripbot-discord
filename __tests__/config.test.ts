import * as fs from 'fs/promises';
import Config from '../config';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  copyFile: jest.fn(),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;

describe('Config.create', () => {
  test('Reads contents if file exists', async () => {
    mockedFs.readFile.mockResolvedValue('{"a":1}');
    await expect(Config.create()).resolves.toBeInstanceOf(Config);
    expect(mockedFs.readFile).toHaveBeenCalledTimes(1);
    expect(mockedFs.copyFile).not.toHaveBeenCalled();
  });

  test('If file does not exist it copies config.example.json', async () => {
    mockedFs.readFile.mockRejectedValueOnce(new Error('Error ENOENT: File not found'));
    mockedFs.readFile.mockResolvedValueOnce('{"a":1}');
    mockedFs.copyFile.mockResolvedValue();
    await expect(Config.create()).resolves.toBeInstanceOf(Config);
    expect(mockedFs.readFile).toHaveBeenCalledTimes(3); // fs.copyFile calls this
    expect(mockedFs.copyFile).toHaveBeenCalled();
  });
});

test('Command prefixes', async () => {
  mockedFs.readFile.mockResolvedValue(`
    {
      "commandPrefixes": ["~", ","],
      "wordBlackList": {
        "global": [],
        "channels": []
      }
    }
  `);
  const config = await Config.create();
  expect(config.commandPrefixes).toEqual(['~', ',']);
});

describe('wordBlacklist', () => {
  test('If no channel is given return global blacklist', () => {
    const config = new Config({
      commandPrefixes: ['~'],
      wordBlacklist: {
        global: ['ay', 'yo'],
        channels: [],
      },
    });
    expect(config.wordBlacklist()).toEqual(['ay', 'yo']);
  });

  test('If channel is provided return that channel\'s blacklist', () => {
    const config = new Config({
      commandPrefixes: ['~'],
      wordBlacklist: {
        global: ['ay', 'yo'],
        channels: [{
          id: 'mockId',
          words: ['foo', 'bar'],
        }],
      },
    });
    expect(config.wordBlacklist('mockId')).toEqual(['foo', 'bar']);
  });

  test('If channel ID is provided that doesn\'t exist throw an error', () => {
    const config = new Config({
      commandPrefixes: ['~'],
      wordBlacklist: {
        global: ['ay', 'yo'],
        channels: [{
          id: 'mockId',
          words: ['foo', 'bar'],
        }],
      },
    });
    expect(() => config.wordBlacklist('notAnId')).toThrow('Channel does not exist.');
  });
});
