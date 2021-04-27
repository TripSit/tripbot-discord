'use strict';

module.exports = async function helpCommand({ message }) {
  await message.channel.send('Help!');
};
