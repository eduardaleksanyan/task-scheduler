import * as winston from 'winston';
import 'winston-mongodb';
import * as path from 'path';
import config from './schema';
export const winstonConfig = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'combined.log'),
    }),
    new winston.transports.MongoDB({
      level: 'info',
      db: config.get('mongo.uri'),
      collection: 'logs',
      options: { useUnifiedTopology: true },
    }),
  ],
};
