import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';
import { Comment } from '@common/schemas/comment-schema';

@Schema()
export class Post extends CommonSchema {
  @Prop({ default: '', required: true, maxlength: 255 })
  content: string;

  @Prop({ required: true, unique: true })
  created_by: string;

  @Prop({ default: [], required: true, unique: true })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);