import { Client, User } from 'discord.js';
import parseUserTag from '../parse-user-tag';

test('if no user is returned return null', () => {
  const client = new Client();
  const getUserSpy = jest.spyOn(client.users.cache, 'get');
  expect(parseUserTag(client, 'ayyo')).toBeNull();
  expect(getUserSpy).toHaveBeenCalledWith('ayyo');
});

test('returns a user if found', () => {
  const client = new Client();
  const user = new User(client, {});
  const getUserSpy = jest.spyOn(client.users.cache, 'get').mockReturnValue(user);
  expect(parseUserTag(client, '<@ayyo>')).toBe(user);
  expect(getUserSpy).toHaveBeenCalledWith('ayyo');
});
