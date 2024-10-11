import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  stock_quantity: number;
  @Prop({ default: true })
  active: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: string;
}
export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
