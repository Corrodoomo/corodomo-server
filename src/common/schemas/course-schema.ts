import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';

@Schema()
export class Course extends CommonSchema {
  @Prop({ default: '', required: true, maxlength: 55 })
	title: string;

  @Prop({ default: '', required: true, maxlength: 1255 })
  content: string;

	@Prop({ default: '', required: true, maxlength: 55 })
	category: string;

  @Prop({ default: [], required: true })
	pictures: string[];

  @Prop({ required: true, unique: true })
  created_by: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
