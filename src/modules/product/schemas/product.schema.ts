import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @ApiProperty()
  @Prop()
  name: string;

    @ApiProperty()
    @Prop()
  description: string;

    @ApiProperty()
    @Prop()
  price: number;

    @ApiProperty()
    @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
