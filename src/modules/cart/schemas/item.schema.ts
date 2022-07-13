import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  quantity: number;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop()
  subTotalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
