'use strict';

module.exports = async function barExamCommand({ logger, message }, recipient) {
  await recipient.send(`
    ${message.author.tag} has initiated a check to see if you're potentially having memory
    issues. Simply don't respond to this message if you don't wish to partake and if you do
    respond with any text and follow the resulting instructions.
  `);
  logger.info(`[BAR EXAM]: ${message.author.tag} initiated for ${recipient.tag}`);
};
