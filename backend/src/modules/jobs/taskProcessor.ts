import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { AppLoggerService } from '../logger/logger.service';
import { BULL_TASK_SCHEDULER_NAME } from '../../constants/constants';
import { Tasks } from '../taskRegistrations/schemas/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Processor(BULL_TASK_SCHEDULER_NAME)
export class TaskProcessor {
  constructor(
    private readonly logger: AppLoggerService,
    @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>,
  ) {}

  @Process()
  async handleJob(job: Job) {
    const { taskId, taskName, isOneTime } = job.data;
    this.logger.log(`Scheduler task run with this name: ${taskName}`);

    if (isOneTime) {
      await this.taskModel
        .findByIdAndUpdate({ _id: taskId }, { isActive: false })
        .exec();
    }
  }
}
