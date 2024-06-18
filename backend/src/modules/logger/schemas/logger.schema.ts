import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'logs' })
export class Log extends Document {
  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
