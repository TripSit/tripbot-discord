'use strict';

const commands = require('../commands');
const { COMMAND_PREFIX } = require('../env');

module.exports = function commandMiddleware({ client, logger }) {
  return async (message) => {
    // Only recognize messages starting with the command prefix
    if (message.content.trim().startsWith(COMMAND_PREFIX)) {
      // Break message up into arguments
      const [commandName, ...rawArgs] = message.content.trim().slice(1).split(/\s+/g);
      const command = commands[commandName];

      // Parse user tags into User objects
      const args = rawArgs.map((arg) => {
        if (!(arg.startsWith('<@') && arg.endsWith('>')) || !arg.startsWith('!')) {
          return arg;
        }
        const mention = arg.startsWith('!') ? arg.slice(1) : arg.slice(2, -1);
        return client.users.cache.get(mention) || arg;
      });

      try {
        if (!command) await message.channel.send('Command not found.');
        else await command({ message, client, logger }, ...args);
      } catch (ex) {
        logger.error(ex);
      }
    }
  };
};
