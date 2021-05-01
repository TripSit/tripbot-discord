'use strict';

const { TRIPSIT_GUILD_ID, RULES_VERIFY_ROLE_ID, RULES_VERIFICATION_EMOJI_ID } = require('../env');

module.exports = async function rulesVerification({ client, db }) {
  client.on('messageReactAdd', async (reaction, user) => {
    // Reaction must be made on a specific message using a specific emoji. Bots are not permitted
    if (
      reaction.emoji.id === RULES_VERIFICATION_EMOJI_ID
      && !user.roles.cache.has(RULES_VERIFY_ROLE_ID)
      && !user.bot
    ) {
      await db.insert({
        discordId: user.id,
        username: user.username,
        avatar: user.avatarURL({ dynamic: true }),
        locale: user.locale,
        createdAt: user.createdAt,
      });

      const verifiedRole = await client.guilds
        .fetch(TRIPSIT_GUILD_ID)
        .then((tripsitGuild) => tripsitGuild.roles
          .fetch(RULES_VERIFY_ROLE_ID));

      verifiedRole.setPermissions(RULES_VERIFY_ROLE_ID);
    }
  });
};
