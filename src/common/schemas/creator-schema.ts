import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@common/schemas/post-schema';
import { Blog } from '@common/schemas/blog-schema';
import { Course } from '@common/schemas/course-schema';
import { CommonSchema } from './common-schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Creator extends CommonSchema {
  @Prop({ unique: true })
  auth0_id: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }], default: [] })
  products: string[];

  @Prop({ type: [Post], default: [] })
  posts: Post[];

  @Prop({ type: [Blog], default: [] })
  blogs: Blog[];

  @Prop({ type: [Course], default: [] })
  courses: Course[];
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);