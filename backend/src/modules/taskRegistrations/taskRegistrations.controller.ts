import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskRegistrationsService } from './taskRegistrations.service';
import { Tasks } from './schemas/tasks.schema';
import { TaskRegistrationsDto } from './dto/taskRegistrations.dto';

@Controller('tasks')
export class TaskRegistrationsController {
  constructor(
    private readonly taskRegistrationsService: TaskRegistrationsService,
  ) {}

  @Post()
  async create(@Body() taskDto: TaskRegistrationsDto): Promise<Tasks> {
    return this.taskRegistrationsService.create(taskDto);
  }

  @Get()
  async findAll(): Promise<Tasks[]> {
    return this.taskRegistrationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tasks> {
    return this.taskRegistrationsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() taskDto: TaskRegistrationsDto,
  ): Promise<Tasks> {
    return this.taskRegistrationsService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tasks> {
    return this.taskRegistrationsService.delete(id);
  }
}
