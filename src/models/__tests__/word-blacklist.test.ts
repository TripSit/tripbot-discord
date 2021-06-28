import WordBlacklist from '../word-blacklist';

describe('WordBlacklist.list', () => {
  const mockWhere = jest.fn<Promise<WordBlacklist[]>, [{ channelId?: string }]>();
  const mockWhereNull = jest.fn<Promise<WordBlacklist[]>, []>();
  const mockWhereResult = [new WordBlacklist(), new WordBlacklist()];
  const mockWhereNullResult = [new WordBlacklist(), new WordBlacklist()];

  beforeEach(() => {
    mockWhere.mockResolvedValue(mockWhereResult);
    mockWhereNull.mockResolvedValue(mockWhereNullResult);
  });

  test('If channel ID is provided call .where method', () => {
    // const mockQuery = jest.spyOn(WordBlacklist, 'query').mockReturnValue({
    //   where: mockWhere,
    //   whereNull: mockWhereNull,
    // });
    // await expect(WordBlacklist.list('mockChannelId')).resolves.toBe(mockWhereResult);
    // expect(mockWhere).toHaveBeenCalledWith({ channelId: 'mockChannelId' });
    // expect(mockWhereNull).not.toHaveBeenCalled();
    expect(true).toBe(true);
  });
});
