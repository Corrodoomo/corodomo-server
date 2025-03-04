// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';

@Schema()
export class Cart extends CommonSchema {
  @Prop({ required: true, unique: true })
  product_id: string;

  @Prop({ required: true })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);