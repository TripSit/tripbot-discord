import { Model, snakeCaseMappers, QueryBuilder } from 'objection';
import { ModelValidationError } from '../types';

export default class WordBlacklist extends Model {
  static tableName = 'word_blacklist';
  static columnNameMappers = snakeCaseMappers();

  id!: string;
  channelId?: string;
  addedBy!: string;
  word!: string;
  createdAt!: Date;

  static async list(channelId?: string): Promise<WordBlacklist[]> {
    const query = WordBlacklist.query();
    return channelId ? query.where({ channelId }) : query.whereNull('channelId');
  }

  static async create(
    word: string,
    addedBy: string,
    channelId?: string,
  ): Promise<QueryBuilder<WordBlacklist, WordBlacklist>> {
    const exists = await WordBlacklist.query()
      .select('id')
      .findOne({ word, channelId })
      .then(Boolean);
    if (exists) throw new ModelValidationError('Word already exists in this scope.');
    return WordBlacklist.query().insert({ word, addedBy, channelId });
  }
}
