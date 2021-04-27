'use strict';

const commands = require('../commands');
const { COMMAND_PREFIX } = require('../env');

module.exports = function command({ client, logger }) {
  return async (message) => {
    // Only recognize messages starting with the command prefix
    if (message.content.trim().startsWith(COMMAND_PREFIX)) {
      // Break message up into arguments
      const [commandName, ...rawArgs] = message.content.trim().slice(1).split(/\s+/g);
      const cmd = commands[commandName];

      try {
        if (!cmd) await message.channel.send('Command not found.');
        else {
          // Parses @mentions from arguments
          const args = rawArgs.map((arg) => {
            if (/^<@.+>$/.test(arg)) {
              const mention = client.users.cache.get(arg.replace(/(^<@!?|>$)/g, ''));
              if (mention) return mention;
            }
            return arg;
          });

          await cmd({ message, client, logger }, ...args);
        }
      } catch (ex) {
        logger.error(ex);
        message.channel.send('There was an error processing your request.');
      }
    }
  };
};
