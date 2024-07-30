import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskType } from '../../../constants/constants';


@Schema({ collection: 'tasks' })
export class Tasks extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: TaskType })
  type: string;

  @Prop()
  cron?: string;

  @Prop()
  date?: Date;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);
