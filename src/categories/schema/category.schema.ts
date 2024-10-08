import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
