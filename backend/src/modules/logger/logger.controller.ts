import { Controller, Get } from '@nestjs/common';
import { AppLoggerService } from './logger.service';
import { Log } from './schemas/logger.schema';

@Controller('logs')
export class LoggerController {
  constructor(private readonly loggerService: AppLoggerService) {}

  @Get()
  async findAll(): Promise<Log[]> {
    return this.loggerService.findAll();
  }
}
