import { connect } from '@tripsit/db';
import createDiscordClient from './discord-client';
import createLogger from './logger';

const logger = createLogger();

connect()
  .then((db) => createDiscordClient({
    db,
    logger,
  }))
  .catch((ex: Error) => {
    logger.error('Error on initialization.', ex);
    return Promise.reject(ex);
  });
