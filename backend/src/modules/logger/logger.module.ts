import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppLoggerService } from './logger.service';
import { Log, LogSchema } from './schemas/logger.schema';
import { LoggerController } from './logger.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [AppLoggerService],
  controllers: [LoggerController],
  exports: [AppLoggerService],
})
export class LoggerModule {}
