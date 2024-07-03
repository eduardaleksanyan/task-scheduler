import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { TaskType } from '../../../constants/constants';
import { CRON_REGEX } from '../../../utils/regex';
import { IsValidDate } from './customValidation';

export class TaskRegistrationsDto {
  @IsString()
  name: string;

  @IsEnum(TaskType)
  type: TaskType;

  @IsOptional()
  @IsString()
  @Matches(CRON_REGEX, {
    message: 'cron must be a valid cron expression',
  })
  // @IsCronRequired()
  cron?: string;

  @IsOptional()
  @IsValidDate()
  // @IsDateRequired()
  date?: string;

  @IsBoolean()
  isActive: boolean;
}
