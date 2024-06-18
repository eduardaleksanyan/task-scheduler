import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskRegistrationsService } from './taskRegistrations.service';
import { TaskRegistrationsController } from './taskRegistrations.controller';
import { Tasks, TaskSchema } from './schemas/tasks.schema';
import { TaskSchedulerModule } from '../taskScheduler/taskScheduler.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TaskSchema }]),
    TaskSchedulerModule,
  ],
  controllers: [TaskRegistrationsController],
  providers: [TaskRegistrationsService],
})
export class TaskRegistrationsModule {}
