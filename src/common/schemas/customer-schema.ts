// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cart } from '@common/schemas/cart-schema';
import { CommonSchema } from '@common/schemas/common-schema';
import { Product } from '@common/schemas/product-schema';

@Schema()
export class Customer extends CommonSchema {
  @Prop({ required: true, unique: true })
  auth0_id: string;

  @Prop({ default: [], type: [ { type: Product }] })
  favorited_products: Product[];

  @Prop({ type: [Cart], default: [] })
  carts: Cart[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);