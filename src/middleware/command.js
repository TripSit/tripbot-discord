'use strict';

const commands = require('../commands');
const { COMMAND_PREFIX } = require('../env');

module.exports = function commandMiddleware({ client, logger }) {
  return async (message) => {
    // Only recognize messages starting with the command prefix
    if (message.content.trim().startsWith(COMMAND_PREFIX)) {
      // Break message up into arguments
      const [commandName, ...args] = message.content.trim().slice(1).split(/\s+/g);
      const command = commands[commandName];

      try {
        if (!command) await message.channel.send('Command not found.');
        else await command({ message, client, logger }, ...args);
      } catch (ex) {
        logger.error(ex);
        message.channel.send('There was an error processing your request.');
      }
    }
  };
};
