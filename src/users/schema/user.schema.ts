import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/roles/schema/role.schema';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;
  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Role | Types.ObjectId;
}
export type UserDocument = Document & User;
export const UserSchema = SchemaFactory.createForClass(User);
