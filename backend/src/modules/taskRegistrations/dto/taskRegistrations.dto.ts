import {
  IsString,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { TaskType } from '../../../constants/constants';
import { CRON_REGEX } from '../../../utils/regex';

export class TaskRegistrationsDto {
  @IsString()
  name: string;

  @IsEnum(TaskType)
  type: string;

  @IsOptional()
  @IsString()
  @Matches(CRON_REGEX, {
    message: 'cron must be a valid cron expression',
  })
  cron?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
