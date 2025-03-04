import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';

@Schema()
export class Blog extends CommonSchema {
  @Prop({ default: '', required: true, maxlength: 55 })
	title: string;

  @Prop({ default: '', required: true, maxlength: 1255 })
  content: string;

	@Prop({ default: '', required: true, maxlength: 55 })
	category: string;

  @Prop({ required: true, unique: true })
  created_by: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);