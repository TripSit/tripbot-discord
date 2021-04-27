'use strict';

module.exports = async function helpCommand({ message }) {
  return message.channel.send('Help!');
};
