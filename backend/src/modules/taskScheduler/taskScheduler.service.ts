import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks } from '../taskRegistrations/schemas/tasks.schema';
import { AppLoggerService } from '../logger/logger.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue, JobOptions } from 'bull';
import {
  CHUNK_SIZE,
  BULL_TASK_SCHEDULER_NAME,
  TaskType,
} from '../../constants/constants';
import { DateTime } from 'luxon';

@Injectable()
export class TaskSchedulerService implements OnModuleInit {
  constructor(
    @InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    private readonly logger: AppLoggerService,
    @InjectQueue(BULL_TASK_SCHEDULER_NAME) private taskQueue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.loadTasks();
  }

  async scheduleTask(task: Tasks): Promise<void> {
    const taskId = task._id;
    const taskName = task.name;
    if (task.type === TaskType.RECURRING && task.cron) {
      await this.taskQueue.add({ taskId, taskName }, {
        repeat: { cron: task.cron },
        jobId: taskId,
      } as JobOptions);
    } else if (task.type === TaskType.ONE_TIME && task.date) {
      const delay = this.getDelayTimeForOneTimeTask(task.date);
      if (delay >= 0) {
        await this.taskQueue.add({ taskId, taskName, isOneTime: true }, {
          delay: delay,
          removeOnComplete: true,
          jobId: taskId,
        } as JobOptions);
      }
    }
  }

  async removeJob(taskId: string): Promise<void> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new Error('Task not found');
    }

    if (task.type === TaskType.ONE_TIME) {
      const job = await this.taskQueue.getJob(taskId);
      if (job) {
        await job.remove();
      }
    } else {
      const repeatOptions: any = {
        cron: task.cron,
        jobId: taskId,
      };
      await this.taskQueue.removeRepeatable(repeatOptions);
    }
  }

  private async loadTasks(): Promise<void> {
    let skip = 0;
    let hasMore = true;

    while (hasMore) {
      const tasks = await this.taskModel
        .find({ isActive: true })
        .skip(skip)
        .limit(CHUNK_SIZE)
        .exec();

      if (tasks.length < CHUNK_SIZE) {
        hasMore = false;
      }

      await Promise.all(tasks.map((task) => this.scheduleTask(task)));
      skip += CHUNK_SIZE;
    }
  }

  private getDelayTimeForOneTimeTask(date: Date): number {
    const localDate = DateTime.fromJSDate(date);
    const now = DateTime.now();
    return localDate.diff(now).as('milliseconds');
  }
}
