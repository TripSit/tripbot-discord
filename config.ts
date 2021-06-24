import * as fs from 'fs/promises';
import * as path from 'path';
import { CONFIG_PATH } from './env';

interface WordBlacklistChannel {
  id: string;
  words: string[];
}

interface WordBlacklist {
  global: string[];
  channels: WordBlacklistChannel[];
}

interface IConfig {
  commandPrefixes: string[];
  wordBlacklist: WordBlacklist;
}

export default class Config {
  static create(): Promise<Config> {
    return fs.readFile(CONFIG_PATH, 'utf-8')
      .catch((ex: Error) => {
        if (!ex.message.includes('ENOENT')) return Promise.reject(ex);
        return fs.copyFile(path.resolve('config.example.json'), CONFIG_PATH)
          .then(() => fs.readFile(CONFIG_PATH, 'utf-8'));
      })
      .then(JSON.parse)
      .then((config: IConfig) => new Config(config));
  }

  commandPrefixes: string[];

  #wordBlacklist: WordBlacklist;

  constructor(config: IConfig) {
    this.commandPrefixes = config.commandPrefixes;
    this.#wordBlacklist = config.wordBlacklist;
  }

  async #write(): Promise<void> {
    const config: IConfig = {
      commandPrefixes: this.commandPrefixes,
      wordBlacklist: this.#wordBlacklist,
    };
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
  }

  wordBlacklist(channelId?: string): string[] {
    if (!channelId) return this.#wordBlacklist.global;
    const channelBlacklist = this.#wordBlacklist.channels
      .find((channel) => channel.id === channelId);
    if (!channelBlacklist) throw new Error('Channel does not exist.');
    return channelBlacklist.words;
  }

  async addWordBlacklist(word: string, channelId?: string): Promise<void> {
    const words = this.wordBlacklist(channelId);
    if (words.includes(word)) throw new Error('Word already exists.');
    this.#wordBlacklist = channelId ? {
      ...this.#wordBlacklist,
      channels: this.#wordBlacklist.channels
        .map((channel) => (channel.id !== channelId ? channel : {
          ...channel,
          words: channel.words.concat(word),
        })),
    } : {
      ...this.#wordBlacklist,
      global: words.concat(word),
    };
    await this.#write();
  }
}
