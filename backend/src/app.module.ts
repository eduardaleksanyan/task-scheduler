import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskRegistrationsModule } from './modules/taskRegistrations/taskRegistrations.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/schema';
import { TaskSchedulerModule } from './modules/taskScheduler/taskScheduler.module';
import { LoggerModule } from './modules/logger/logger.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = config.get('mongo.uri');
        return {
          uri,
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: config.get('redis.host'),
        port: config.get('redis.port'),
      },
    }),
    LoggerModule,
    TaskRegistrationsModule,
    TaskSchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
