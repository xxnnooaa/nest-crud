import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type OrderDocument = Order & Document;

@Schema()
export class Order {  // สร้าง schema ของ Order model มี 3 ฟิล
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({required: true})
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);