// src/schemas/user.schema.ts
import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class CommonSchema extends Document {
  @Prop({ default: Date.now, required: true, type: Date })
  updated_on: Date;

  @Prop({ default: Date.now, required: true, type: Date})
  created_on: Date;
}
