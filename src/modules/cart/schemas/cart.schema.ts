import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';
import { Item } from './item.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @ApiProperty()
  @Prop()
  items: Item[];

  @ApiProperty()
  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
