import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, unique: true })
  code: string;
}
export type RoleDocument = Document & Role;
export const ROleSchema = SchemaFactory.createForClass(Role);
