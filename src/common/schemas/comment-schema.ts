import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';

@Schema()
export class Comment extends CommonSchema {
  @Prop({ default: '', required: true, maxlength: 55 })
	content: string;

  @Prop({ required: true, unique: true })
  created_by: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);