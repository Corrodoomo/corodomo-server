import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';
import { Types } from 'mongoose';

@Schema()
export class Favorite {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer_id: Types.ObjectId; // Tham chiếu đến ID của người dùng

  @Prop({ required: true })
  score: number;
}

@Schema()
export class Product extends CommonSchema {
  @Prop({ default: '', required: true, maxlength: 10 })
  code: string;

  @Prop({ default: '', required: true, maxlength: 55 })
  title: string;

  @Prop({ default: '', maxlength: 255 })
  description: string;

  @Prop({ default: 0, required: true, max: 10000000 })
  price: number;

  @Prop({ default: 0, max: 100 })
  discount: number;

  @Prop({ default: '', required: true, maxlength: 55 })
  category: string;

  @Prop({ type: [Favorite], default: [] })
  favorites: Favorite[];

  @Prop({ default: 0 })
  favorite_score: number;

  @Prop({ default: [], required: true })
  pictures: string[];

  @Prop({ default: '', required: true })
  created_by: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);