import { MessageReaction, GuildMember, Client } from 'discord.js';
import { RULES_VERIFY_ROLE_ID, RULES_VERIFICATION_EMOJI_ID } from '../env';
import { Deps } from '../types';

export default function rulesVerification(client: Client, { logger, db }: Deps): void {
  client.on('messageReactAdd', (reaction: MessageReaction, member: GuildMember): void => {
    // Reaction must be made on a specific message using a specific emoji
    if (
      reaction.emoji.id === RULES_VERIFICATION_EMOJI_ID
      && !member.roles.cache.has(RULES_VERIFY_ROLE_ID)
    ) {
      db.transaction((trx) => trx.insert({
        discordId: member.user.id,
        verifiedAt: member.user.createdAt,
      }))
        .catch((ex) => {
          logger.error('Could not add user to database', ex);
          return member.createDM().then((dm) => dm
            .send('We were unable to verify your account for TripSit. Staff have been notified.'));
        });
    }
  });
}
