import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks } from './schemas/tasks.schema';
import { TaskRegistrationsDto } from './dto/taskRegistrations.dto';
import { TaskSchedulerService } from '../taskScheduler/taskScheduler.service';

@Injectable()
export class TaskRegistrationsService {
  constructor(
    @InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    private taskScheduler: TaskSchedulerService,
  ) {}

  async findAll(): Promise<Tasks[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Tasks> {
    return this.taskModel.findById(id).exec();
  }

  async create(taskDto: TaskRegistrationsDto): Promise<Tasks> {
    const createdTask = new this.taskModel(taskDto);
    const task = await createdTask.save();
    if (taskDto.isActive) {
      await this.taskScheduler.scheduleTask(task);
    }

    return task;
  }

  async update(id: string, taskDto: any): Promise<Tasks> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, taskDto, { new: true })
      .exec();
    if (taskDto.isActive) {
      await this.taskScheduler.scheduleTask(task);
    } else {
      await this.taskScheduler.removeJob(id);
    }

    return task;
  }

  async delete(id: string): Promise<Tasks> {
    await this.taskScheduler.removeJob(id);
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
