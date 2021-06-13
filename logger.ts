import path from 'path';
import winston, { Logger } from 'winston';
import { NODE_ENV, LOG_PATH } from './env';

export default function createLogger(): Logger {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({ filename: path.join(LOG_PATH, 'combined.log') }),
      new winston.transports.File({
        level: 'error',
        filename: path.join(LOG_PATH, 'error.log'),
      }),
    ],
  });

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
  }

  return logger;
}
