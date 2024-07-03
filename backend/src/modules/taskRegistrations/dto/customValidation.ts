import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TaskType } from '../../../constants/constants';

@ValidatorConstraint({ async: false })
class IsCronRequiredConstraint implements ValidatorConstraintInterface {
  validate(cron: any, args: ValidationArguments) {
    const { object } = args as any;
    if (object.type === TaskType.RECURRING) {
      return typeof cron === 'string' && cron.length > 0;
    }
    return true;
  }

  defaultMessage() {
    return 'cron must be a valid cron expression and is required when type is RECURRING';
  }
}

export function IsCronRequired(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCronRequiredConstraint,
    });
  };
}

@ValidatorConstraint({ async: false })
class IsDateRequiredConstraint implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    const { object } = args as any;
    if (object.type === TaskType.ONE_TIME) {
      return date instanceof Date && !isNaN(date.getTime());
    }
    return true;
  }

  defaultMessage() {
    return 'date is required when type is ONE_TIME';
  }
}

@ValidatorConstraint({ async: false })
class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: any, args: ValidationArguments) {
    // Check if dateString is a valid Date
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date must be a valid date string.';
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}

export function IsDateRequired(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateRequiredConstraint,
    });
  };
}
