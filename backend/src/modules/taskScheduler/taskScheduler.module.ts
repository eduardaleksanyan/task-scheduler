import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchedulerService } from './taskScheduler.service';
import { Tasks, TaskSchema } from '../taskRegistrations/schemas/tasks.schema';
import { LoggerModule } from '../logger/logger.module';
import { TaskProcessor } from '../jobs/taskProcessor';
import { BullModule } from '@nestjs/bull';
import { BULL_TASK_SCHEDULER_NAME } from '../../constants/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TaskSchema }]),
    BullModule.registerQueue({
      name: BULL_TASK_SCHEDULER_NAME,
    }),
    LoggerModule,
  ],
  providers: [TaskSchedulerService, TaskProcessor],
  exports: [TaskSchedulerService],
})
export class TaskSchedulerModule {}
