import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { winstonConfig } from '../../config/winston.config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './schemas/logger.schema';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(@InjectModel(Log.name) private loggerModel: Model<Log>) {
    this.logger = winston.createLogger(winstonConfig);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  async findAll(): Promise<Log[]> {
    return this.loggerModel.find().sort({ timestamp: -1 }).exec();
  }
}
