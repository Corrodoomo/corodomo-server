import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonSchema } from '@common/schemas/common-schema';

@Schema()
export class Order {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema()
export class Address {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  ward: string;

  @Prop({ required: true })
  streetName: string;

  @Prop({ required: true })
  streetCode: string;
}


@Schema()
export class Payment extends CommonSchema {
  @Prop({ required: true  })
  created_by: string;

  @Prop({ required: true  })
  orders: Order[];

  @Prop({ required: true  })
  address: Address
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);