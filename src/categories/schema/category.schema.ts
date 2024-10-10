import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';

@Schema()
export class Category {
  @IsString()
  @Prop({ required: true })
  name: string;
  @IsString()
  @Prop({ required: true })
  description: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
