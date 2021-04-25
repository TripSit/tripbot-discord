import createDiscordClient from './discord-client';
import createLogger from './logger';

const logger = createLogger();

createDiscordClient({ logger })
  .then(() => {
    logger.info('Tripbot started...');
  })
  .catch((ex) => {
    logger.error(ex);
    process.exit(1);
  });
