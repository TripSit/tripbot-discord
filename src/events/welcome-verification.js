'use strict';

const { wrapError, UniqueViolationError } = require('db-errors');
const { WELCOME_VERIFY_MESSAGE_ID, WELCOME_VERIFY_EMOJI_ID } = require('../env');

module.exports = function welcomeVerification({ db, logger }) {
  return async (reaction, user) => {
    if (
      reaction.message.id === WELCOME_VERIFY_MESSAGE_ID
      && reaction.emoji.id === WELCOME_VERIFY_EMOJI_ID
    ) {
      await db.transacting((trx) => trx('users').insert({
        discordId: user.id,
        createdAt: user.createdAt,
      })
        .then(() => {
          logger.info(`[WELCOME VERIFICATION]: User added ${user.username}`);
          return
        })
        .catch((ex) => (!(wrapError(ex) instanceof UniqueViolationError)
          ? Promise.reject(ex)
          : user.createDM().then((dm) => {
            logger.info(`[WELCOME VERIFICATION]: Account already verified with TripSit ${user.username}`);
            dm.send('Your account has already been verified with TripSit.');
            trx.rollback();
          }))));
    }
  };
};
